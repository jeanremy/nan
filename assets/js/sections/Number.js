var Tween = require('gsap'),
    $ = require("jquery"),
    mousewheel = require('jquery-mousewheel');

module.exports = Number;

function Number() {}

Number.prototype = {

    init: function(req, done) {

        // get model
        var el = require('./../../partials/contact.html');
        require('./../../sass/main.scss');
        
        app.innerHTML = el;
        app.onclick = function() {
          framework.go('/');
        }
        done();
    },

    // the resize function will be called imediately after init
    // here you can apply "responsive" calculations on your view
    resize: function(width, height) {
    },

  // in animateIn you'll animate in your hidden content that
  // was created in init
    animateIn: function(req, done) {
   
        done();
    },

    // in animateOut you'll animate out your content that
    // was created in init
    animateOut: function(req, done) {
      
        done();       
    },

  // in destroy you'll clean up the content which was
  // created in init
    destroy: function(req, done) {
        el.parentNode.removeChild(el);
        done();
    }
}