var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel');

module.exports = Number;

function Number() {}

Number.prototype = {

    el: {},
    section: {                    
        title: {
            number: '1560',
            desc: 'kilometres'
        },
        desc: 'Entre mon domicile et la gare puis entre la gare et le centre de formation, à vélo, et par tous les temps.',
        illu : 'faire require(du svg)'
    },

    init: function(req, done) {

        this.el = require('./../../partials/number.html');
        require('./../../sass/main.scss');
        app.innerHTML = this.el(this.section);
        app.onclick = function() {
          framework.go('/');
        }
        done();
    },

    resize: function(width, height) {
    },

    animateIn: function(req, done) {
   
        done();
    },

    animateOut: function(req, done) {
      
        done();       
    },

    destroy: function(req, done) {
        el.parentNode.removeChild(el);
        done();
    }
}