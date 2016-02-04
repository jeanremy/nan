var Tween = require('gsap'),
    animsvg = require('../drawsvg'),
    model = require('../models.js'),
    scrollListeners = require('../scrollListeners');

module.exports = Number;

function Number() {}

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
        this.menu = document.getElementById('nav');

        this.anims = model[ req.route ].anim();

        var tweens = new Array();  
        tweens.push(Tween.fromTo(this.pager, 0.2, {opacity: 0}, {opacity: 1}));
        tweens.push(Tween.fromTo(this.title, 0.2, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        tweens.push(Tween.fromTo(this.text, 0.2, {opacity: 0, transform: 'translateY(-20px)'}, {opacity:1, transform: 'translateY(0)'}));
        if(this.anims) {
            tweens.push(this.anims.play());
        }
        tweens.push(Tween.to(this.menu, 0.3, {opacity: 1, visibility: 'visible'}));

        // set menu active
        var menu = document.querySelectorAll('#nav li a');
        Array.prototype.forEach.call(menu, function(el, i) {
            console.log(el.getAttribute('href').slice(2));
            if(el.getAttribute('href').slice(2) === req.route) {
                console.log('ok');
                el.setAttribute('class', 'active');
            }
            else {
                el.setAttribute('class', '');
            }
        });

        

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
        var scroll = new scrollListeners(req);
        var inTl = this.tl;
        tlIn = new TimelineMax({paused: true});
        tlIn.add(Tween.to(this.barTransition, 0.6, {height: window.outerHeight, ease: Power3.easeIn}));
        tlIn.add(tweens, '+=0', 'sequence');
        tlIn.add(scroll.addListeners);
        tlIn.add(done);

        tlIn.play();
    },
    animateOut: function(req, done) {
        var tweens = new Array();  
        //this.anims.reverse();
        tweens.push(this.anims.reverse());
        tweens.push(Tween.to(this.pager, 0.2, {opacity: 0}));
        tweens.push(Tween.to(this.title, 0.2, {opacity:0, transform: 'translateY(-20px)'}));
        tweens.push(Tween.to(this.text, 0.2, {opacity:0, transform: 'translateY(-20px)'}));


        tlOut = new TimelineMax({paused: true});
        tlOut.add(tweens, '+=0', 'start');
        tlOut.add(done);
        tlOut.play();
    },

    destroy: function(req, done) {
        done();
    }

}