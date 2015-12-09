var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel'),
    animsvg = require('../drawsvg'),
    model = require('../models.js');

module.exports = Number;

function Number() {}

Number.prototype = {

    el: {},

    init: function(req, done) {

        // On importe le template et les styles
        this.el = require('./../../partials/number.html');
        require('./../../sass/main.scss');
        require('./../../sass/partials/number.scss');


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
        window.addEventListener("mousewheel", function() {console.log('wheeeeel');}, false);
        app.onclick = function() {
            var mod = model[ req.route ];
            console.log(req);   
          window.framework.go(mod.next);
        }
        done();
    },

    resize: function(width, height) {
    },

    animateIn: function(req, done) {

        // TODO:
        // -gérer les transitions en fonction de req
        // -Gérer le mousewheel
        // -Gérer les chemins next/prev
        // -Faire un rAF au lieu de animate pour svg > fait en css, à vpoir, amélioration
        // -Faire toutes mes routes

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

        var paths = halfRight.querySelectorAll('path');
        animsvg.hideSVGPaths();

        var tweens = new Array();  

        tweens.push(Tween.fromTo(pager, 0.5, {opacity: 0}, {opacity: 1}));
        tweens.push(Tween.fromTo(title, 0.5, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        tweens.push(Tween.fromTo(text, 0.5, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        //tweens.push(Tween.to(paths, 1, {drawSVG: "0%"}, {drawSVG: "100%"}));

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
        this.tl.add(animsvg.drawSVGPaths);
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