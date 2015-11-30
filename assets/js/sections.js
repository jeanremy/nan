var bigwheel = require('bigwheel'),
  // faire un require des partiales
  Tween = require('gsap');
  
var Section = function() {

  var el;

  return {

    // the init function creates the view and initializes it
    // after init finishes the view should not be visible
    init: function(req, done) {
      el = createEl(req);      
      el.onclick = function() {
        framework.go(getToSection(req));
      };
      done();
    },

    // the resize function will be called imediately after init
    // here you can apply "responsive" calculations on your view
    resize: function(width, height) {
      var fontSize = width / 500 * 30;
      el.style.fontSize = fontSize + 'px';
      el.style.top = Math.round(( height - fontSize ) * 0.5) + 'px';
    },

    // in animateIn you'll animate in your hidden content that
    // was created in init
    animateIn: function(req, done) {
      Tween.from(el, 1, {
        y: -100, 
        opacity: 0,
        ease: Back.easeOut, 
        onComplete: done
      });
    },

    // in animateOut you'll animate out your content that
    // was created in init
    animateOut: function(req, done) {
      Tween.to(el, 0.25, {
        y: 100, 
        opacity: 0, 
        ease: Back.easeIn, 
        onComplete: done
      });
    },

    // in destroy you'll clean up the content which was
    // created in init
    destroy: function(req, done) {
      el.parentNode.removeChild(el);
    }
  };
}

// this is just a utility function created for this example to create
// an element which will be added to the dom and initialized
function createEl(req) {
  var el = document.createElement('a');
  el.innerHTML = 'Click to go from "' + req.route + '" to "' + getToSection(req) + '"';
  el.style.position = 'absolute';
  el.style.cursor = 'pointer';
  return document.body.appendChild(el);
}

// this function acts as almost like a model for this example
// generally you'd either load your model from a server or
// have a static model object
function getToSection(req) {
  return {
    '/': '/about',
    '/about': '/contact',
    '/contact': '/'
  }[ req.route ];
}

module.exports.Section = Section;