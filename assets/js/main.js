var bigwheel = require('bigwheel'),
    Tween = require('gsap');

// create our framework instance
var framework = bigwheel( function(done) {
    return {
        routes: {
            '/': HomeSection,
            '/about': HomeSection,
            '/contact': HomeSection
        }
    };
});


// this will start bigwheel and it will start resolving routes
framework.init();

// This is the definition for the sections which bigwheel will run
// sections can define init, resize, animateIn, animateOut, destroy functions
// these will methods will be called by bigwheel
function HomeSection() {

    var el;

    return {

      init: function(req, done) {

        // get model
        var el = require('../partials/home.html');
        require('../sass/main.scss');
        require('../sass/partials/home.scss');

        var app = document.getElementById('app');
        app.innerHTML = el;
        done();
      },

      // the resize function will be called imediately after init
      // here you can apply "responsive" calculations on your view
      resize: function(width, height) {
        
      },

    // in animateIn you'll animate in your hidden content that
    // was created in init
      animateIn: function(req, done) {
        var bars = document.querySelectorAll('.bar'),
            text = document.querySelectorAll('.text'),
            tweens = new Array(),
            texts = new Array(),
            tl = new TimelineMax({paused: true});

        tweens.push(Tween.fromTo(bars[0], 0.5, {transform: 'scale(0,1)'}, {transform: 'scale(1,1)'}));
        tweens.push(Tween.fromTo(bars[1], 0.5, {transform: 'scale(1,0)'}, {transform: 'scale(1,1)'}));
        tweens.push(Tween.fromTo(bars[2], 0.5, {transform: 'scale(0,1)'}, {transform: 'scale(1,1)'}));
        tweens.push(Tween.fromTo(bars[3], 0.5, {transform: 'scale(1,0)'}, {transform: 'scale(1,1)'}));
        texts.push(Tween.fromTo(text[0], 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));
        texts.push(Tween.fromTo(text[1], 0.5, {opacity: '0', transform: 'translateY(-20px)'}, {opacity: '1', transform: 'translateY(0)'}));

        tl
            .add(tweens, '+=0', 'sequence')
            .add(texts, '+=0', 'start', 0.2)
            .play();
        done();
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