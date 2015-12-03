var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel'),
    model = require('../models.js');

module.exports = Number;

function Number() {}

Number.prototype = {

    el: {},


    init: function(req, done) {

        this.el = require('./../../partials/number.html');
        require('./../../sass/main.scss');
        require('./../../sass/partials/number.scss');
        var app = document.getElementById('app');
        var bar = document.createElement('div');
        bar.id = "bar--transition";
        app.appendChild(bar);

        app.onclick = function() {
          window.framework.go('/');
        }
        done();
    },

    resize: function(width, height) {
    },

    animateIn: function(req, done) {
        var barTransition = document.getElementById('bar--transition');
        var tl = new TimelineMax({paused: true});
        var height = window.outerHeight;

        tl.add(Tween.to(barTransition, 0.6, {height: height}));
        tl.add(done);

        tl.play();
    },

    animateOut: function(req, done) {
      
        done();       
    },

    destroy: function(req, done) {
        el.parentNode.removeChild(el);
        done();
    }
}