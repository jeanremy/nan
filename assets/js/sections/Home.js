module.exports = Home;

function Home() {}

var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel');

Home.prototype = {

    el: {},

    section: {                    
        title: {
            label: 'NaN',
            abbr: 'Nantes - Angers - Nantes'
        },
        desc: '[nän]: Nantes - Angers - Nantes a été mon trajet quotidien une semaine par mois durant deux ans, période à laquelle je passais le titre de Concepteur développeur Informatique suivi à l\'IMIE d\'Angers.'
    },

    init: function(req, done) {

        // get model
        this.el = require('./../../partials/home.html');
        require('./../../sass/main.scss');
        require('./../../sass/partials/home.scss');

        var app = document.getElementById('app');
        app.innerHTML = this.el(this.section);

        this.bars = document.querySelectorAll('.bar');
        this.text = document.querySelectorAll('.text');
        this.tweens = new Array();
        this.texts = new Array();
        this.tl = new TimelineMax({paused: true});

        this.tweens.push(Tween.fromTo(this.bars[0], 0.5, {transform: 'scale(0,1)'}, {transform: 'scale(1,1)'}));
        this.tweens.push(Tween.fromTo(this.bars[1], 0.5, {transform: 'scale(1,0)'}, {transform: 'scale(1,1)'}));
        this.tweens.push(Tween.fromTo(this.bars[2], 0.5, {transform: 'scale(0,1)'}, {transform: 'scale(1,1)'}));
        this.tweens.push(Tween.fromTo(this.bars[3], 0.5, {transform: 'scale(1,0)'}, {transform: 'scale(1,1)'}));
        
        this.texts.push(Tween.fromTo(this.text[0], 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));
        this.texts.push(Tween.fromTo(this.text[1], 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));

        this.tl
            .add(this.tweens, '+=0', 'sequence')
            .add(this.texts, '+=0', 'start', 0.2);

        app.onclick = function() {
          framework.go('contact');
        }

        $('#app').one('mousewheel', function() {
            framework.go('/1560')
        });
        done();
    },

    // the resize function will be called imediately after init
    // here you can apply "responsive" calculations on your view
    resize: function(width, height) {
    },

    // in animateIn you'll animate in your hidden content that
    // was created in init
    animateIn: function(req, done) {
        this.tl.play();
        done();
    },

    // in animateOut you'll animate out your content that
    // was created in init
    animateOut: function(req, done) {
        this.tl.reverse();
        done();       
    },

    // in destroy you'll clean up the content which was
    // created in init
    destroy: function(req, done) {
        this.el.parentNode.removeChild(Home.el);
        done();
    }
};