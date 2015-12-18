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

    this.reverseAnims = function() {
        console.log(_this);
        _this.anims.reverse();
    };
}

Number.prototype = {

    el: {},


    init: function(req, done) {

        // On importe le template et les styles
        var raw = require('./../../templates/number.html');
        this.el = raw(model[ req.route ]);

        require('./../../sass/main.scss');
        require('./../../sass/partials/number.scss');

        this.req = req;

        // On ajoute la barre de transition et son animation qu'on lancera ensuite

        this.tl = new TimelineMax({paused: true});
        
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
        var app = document.getElementById('app');
        app.innerHTML = this.el; 

        var pager = document.querySelector('.pager');
        var title = document.querySelector('.title');
        var text = document.querySelector('.desc');
        var illu = require('../../svg/'+model[ req.route ].illu);
        var renderedSVG = illu();
        //animsvg.hideSVG(renderedSVG);
        var halfRight = document.querySelector('.right');
        halfRight.innerHTML = renderedSVG;

        this.anims = model[ req.route ].anim;

        animsvg.hideSVG();

        var tweens = new Array();  
        tweens.push(Tween.fromTo(pager, 0.5, {opacity: 0}, {opacity: 1}));
        tweens.push(Tween.fromTo(title, 0.5, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        tweens.push(Tween.fromTo(text, 0.5, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        

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
        this.tl.add(tweens);
        this.tl.add(this.addListeners);
        var inTl = this.tl;
        if(this.anims) {
            inTl.add(this.anims);
        }
        //inTl.add(animsvg.drawSVGPaths);
        inTl.add(done);

        inTl.play();
    },
    animateOut: function(req, done) {
        console.log(req);
        // doublement des tl
        outTl = new TimelineMax({paused: true});
        outTl.add(this.anims);
        outTl.reverse();
        //outTl.add(this.reverseAnims);
        this.tl
                .eventCallback('onReverseComplete', done);
        this.tl.reverse();
    },

    destroy: function(req, done) {
        //  el.parentNode.removeChild(el);
        done();
    }

}