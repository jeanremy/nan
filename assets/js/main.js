var bigwheel = require('bigwheel');

// create our framework instance
framework = bigwheel( function(done) {
    var routes = require('./routes.js');
    return {
    	overlap: false,
      	routes: routes
    }
});


framework.init();
