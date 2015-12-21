var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel'),
    animsvg = require('../drawsvg');
    model = require('../models.js');

module.exports = Number;

function Number() {

    var _this = this;
   

    this.MouseWheelListener = function(e) {
        var e = window.event || e; // old IE support
        this.delta = e.wheelDelta || -e.detail;
        // scroll down
        if(this.delta < 0) { 
            window.framework.go(model[_this.req.route].next);
        }
        //scrollUp
        else {
            window.framework.go(model[_this.req.route].prev);
        }
        window.removeEventListener("mousewheel", _this.MouseWheelListener, false);
        window.removeEventListener("DOMMouseScroll", _this.MouseWheelListener, false);

        return false;
    };

    this.KeyPressListener = function(e) {
        // scroll down
        if(e.keyCode == '40') {
            window.framework.go(model[_this.req.route].next);
        }
        //scrollUp
        else if(e.keyCode == '38') {
            window.framework.go(model[_this.req.route].prev);
        }
        else {return false;}
        window.removeEventListener("mkeydown", _this.KeyPressListener, false);
    };

    this.addListeners = function() {
        window.addEventListener("keydown", _this.KeyPressListener, false);
        window.addEventListener("mousewheel", _this.MouseWheelListener, false);
        window.addEventListener("DOMMouseScroll", _this.MouseWheelListener, false);
    };

    this.removeListeners = function() {
        window.addEventListener("keydown", _this.KeyPressListener, false);
        window.removeEventListener("mousewheel", _this.MouseWheelListener, false);
        window.removeEventListener("DOMMouseScroll", _this.MouseWheelListener, false);
    };

}

Number.prototype = {

    el: {},


    init: function(req, done) {

        // On importe le template et les styles
        var raw = require('./../../templates/number.html');
        this.el = raw(model[ req.route ]);

        this.req = req;

        require('./../../sass/main.scss');
        require('./../../sass/partials/number.scss');
        
        done();
    },

    resize: function(width, height) {
    },

    animateIn: function(req, done) {

        // TODO:
        // -gérer les transitions en fonction de req
        // -Faire un rAF au lieu de animate pour svg > fait en css, à voir, amélioration
        // -Faire menu , donc faire une section number avec le menu, puis des sous sections?
        // -Voir pour mutualiser les listeners sur les différenst objets
        // -mettre un curseur différents sur partie haut/basse et click

        // on insère le contenu après la fin du animateOut 
        // de la section précédente (overlap false dans framework)
        this.app = document.getElementById('app');
        this.app.innerHTML = this.el; 

        this.pager = document.querySelector('.pager');
        this.title = document.querySelector('.title');
        this.text = document.querySelector('.desc');
        this.illu = require('../../svg/'+model[ req.route ].illu);
        this.svg = this.illu();
        this.halfRight = document.querySelector('.right');
        this.halfRight.innerHTML = this.svg;
        this.barTransition = document.getElementById('bar--transition');

        this.anims = model[ req.route ].anim;

        animsvg.hideSVG();

        var tweens = new Array();  
        tweens.push(Tween.fromTo(this.pager, 0.5, {opacity: 0}, {opacity: 1}));
        tweens.push(Tween.fromTo(this.title, 0.5, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        tweens.push(Tween.fromTo(this.text, 0.5, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        if(this.anims) {
            tweens.push(this.anims);
        }
        

         // for(var x = 0; x<paths.length;x++){
         //    var path = paths[x];
         //    var pathDimensions = path.getTotalLength();
         //    var strokeWidth = path.getAttribute("stroke-width");
         //    path.style.strokeDasharray = (pathDimensions)+" "+(pathDimensions);
         //    path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? pathDimensions/strokeWidth : pathDimensions;
         //    this.tl.add(TweenMax.to(path.style,1,{
         //        strokeDashoffset:0,
         //        onUpdate:function(){
         //            var n = document.createTextNode(' ');
         //            document.body.appendChild(n);
         //            document.body.removeChild(n);
         //        }
         //    }), (x>0)?"-=0.8":""
         //    );
         // }
        // On lance la timeline avec son callback
        tlIn = new TimelineMax({paused: true});
        tlIn.add(Tween.to(this.barTransition, 0.6, {height: window.outerHeight, ease: Power3.easeIn}));
        tlIn.add(tweens);
        var inTl = this.tl;
        tlIn.add(done);
        tlIn.add(this.addListeners);

        tlIn.play();
    },
    animateOut: function(req, done) {
        var tweens = new Array();  
        tweens.push(Tween.to(this.pager, 0.5, {opacity: 0}));
        tweens.push(Tween.to(this.title, 0.5, {opacity:0, transform: 'translateY(-20px)'}));
        tweens.push(Tween.to(this.text, 0.5, {opacity:0, transform: 'translateY(-20px)'}));
        
        tlOut = new TimelineMax({paused: true});

        tlOut.add(tweens);
        tlOut.add(this.addListeners);
        if(this.anims) {
            tlOut.add(this.anims);
        }
        tlOut.add(done);
        tlOut.play();
    },

    destroy: function(req, done) {
        //  el.parentNode.removeChild(el);
        done();
    }

}