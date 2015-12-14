var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel'),
    model = require('../models.js');

module.exports = Number;

function Number() {

    var _this = this;
   

    this.MouseWheelListener = function(e) {
        var e = window.event || e; // old IE support
        this.delta = e.wheelDelta || -e.detail;
        // scroll down
        if(this.delta < 0) {
            console.log('down');
            window.framework.go(model[_this.req.route].next);
        }
        //scrollUp
        else {
            console.log('up');
            window.framework.go(model[_this.req.route].prev);
        }
        window.removeEventListener("mousewheel", _this.MouseWheelListener, false);
        window.removeEventListener("DOMMouseScroll", _this.MouseWheelListener, false);

        return false;
    };

    this.KeyPressListener = function(e) {
        console.log(e.keyCode);
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

}

Number.prototype = {

    el: {},

    addListeners: function() {
        window.addEventListener("keydown", this.KeyPressListener, false);
        window.addEventListener("mousewheel", this.MouseWheelListener, false);
        window.addEventListener("DOMMouseScroll", this.MouseWheelListener, false);
    },

    removeListeners: function() {
        window.addEventListener("keydown", this.KeyPressListener, false);
        window.removeEventListener("mousewheel", this.MouseWheelListener, false);
        window.removeEventListener("DOMMouseScroll", this.MouseWheelListener, false);
    },

    init: function(req, done) {

        // On importe le template et les styles
        this.el = require('./../../partials/number.html');
        require('./../../sass/main.scss');
        require('./../../sass/partials/number.scss');
        this.req = req;

        var app = document.getElementById('app'),
            bar = document.createElement('div');
        bar.id = "bar--transition";

        // On ajoute la barre de transition et son animation qu'on lancera ensuite
        var height = window.outerHeight;
        this.tl = new TimelineMax({paused: true});
        this.tl.add(Tween.to(bar, 0.6, {
            height: height,
            ease: Power3.easeIn
        }));
        document.body.insertBefore(bar, app);
        
        app.onclick = function() {
            window.framework.go(model[ req.route ].next);
        }
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
        // -Prévoir une anim différente pour chaque svg

        // on insère le contenu après la fin du animateOut 
        // de la section précédente (overlap false dans framework)
        var app = document.getElementById('app');
        app.innerHTML = this.el(model[ req.route ]); 

        var pager = document.querySelector('.pager');
        var title = document.querySelector('.title');
        var text = document.querySelector('.desc');
        var illu = require('../../svg/'+model[ req.route ].illu);
        var halfRight = document.querySelector('.right');
        halfRight.innerHTML = illu();
        var anims = model[ req.route ].anim;


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
        this.tl.add(anims);
        this.tl.add(tweens);
        //this.tl.add(animsvg.drawSVGPaths);
        this.tl.add(this.addListeners);
        this.tl.add(done);

        this.tl.play();
    },
    animateOut: function(req, done) {
        console.log(req);
        this.tl.eventCallback('onReverseComplete', done);
        this.tl.reverse();
    },

    destroy: function(req, done) {
        //  el.parentNode.removeChild(el);
        done();
    }
}