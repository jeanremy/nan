module.exports = Home;

function Home() {}

var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel'),
    model = require('../models.js');

Home.prototype = {

    el: {},

    init: function(req, done) {

        this.el = require('./../../templates/home.html');
        require('./../../sass/main.scss');
        require('./../../sass/partials/home.scss');

        var app = document.getElementById('app');
        app.innerHTML = this.el(model[ req.route ]);

        this.bars = document.querySelectorAll('.bar');
        this.text = document.querySelectorAll('.text');
        this.scroll = document.querySelector('.scroll');
        this.tweens = new Array();
        this.texts = new Array();
        this.tl = new TimelineMax({paused: true});

        this.tweens.push(Tween.fromTo(this.bars[0], 0.3, {transform: 'scale(0,1)'}, {transform: 'scale(1,1)'}));
        this.tweens.push(Tween.fromTo(this.bars[1], 0.3, {transform: 'scale(1,0)'}, {transform: 'scale(1,1)'}));
        this.tweens.push(Tween.fromTo(this.bars[2], 0.3, {transform: 'scale(0,1)'}, {transform: 'scale(1,1)'}));
        this.tweens.push(Tween.fromTo(this.bars[3], 0.3, {transform: 'scale(1,0)'}, {transform: 'scale(1,1)'}));
        //this.tweens.push();
        
        this.texts.push(Tween.fromTo(this.text[0], 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));
        this.texts.push(Tween.fromTo(this.text[1], 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));
        this.texts.push(Tween.fromTo(this.scroll, 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));

        this.tl
            .add(this.tweens, '+=0', 'sequence')
            .add(this.texts, '+=0', 'start', 0.2)
            .add(done)
            .add(callback);
        function callback() {
            var barTransition = document.getElementById('bar--transition');
            Tween.to(barTransition, 0.5, {height: "14px"})
        }

        this.tl.play();

    },

    // the resize function will be called imediately after init
    // here you can apply "responsive" calculations on your view
    resize: function(width, height) {
    },

    // in animateIn you'll animate in your hidden content that
    // was created in init
    animateIn: function(req, done) {
        this.tl.add(done);
        this.tl.play();
        app.onclick = function() {
            framework.go('/1560');
        }
        
    },

    // in animateOut you'll animate out your content that
    // was created in init
    animateOut: function(req, done) {
        this.tl.eventCallback('onReverseComplete', buildBar);
        function buildBar() {
            var bar = document.getElementById('bar--transition');
            var height = window.outerHeight;
            var tl = new TimelineMax();
            tl.add(Tween.to(bar, 0.6, {
                height: height,
                ease: Power3.easeIn
            }));
            tl.add(done);

        }
        this.tl.reverse();



    },

    // in destroy you'll clean up the content which was
    // created in init
    destroy: function(req, done) {
        // var app = document.getElementById('app');
        // app.removeChild(app.firstChild);
        done();
    }
};