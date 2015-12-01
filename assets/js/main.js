var bigwheel = require('bigwheel');

// create our framework instance
var framework = bigwheel( function(done) {
    var routes = require('./routes.js');
    console.log(routes);
    return {
      routes: routes
    }
});


// this will start bigwheel and it will start resolving routes
framework.init();
