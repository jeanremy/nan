var bigwheel = require('bigwheel');

    var BezierEasing = require('bezier-easing');

// create our framework instance
framework = bigwheel( function(done) {
    var routes = require('./routes.js');
    return {
    	overlap: false,
      	routes: routes
    }
});


framework.init();
