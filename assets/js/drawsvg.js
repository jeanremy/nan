module.exports = {

	hideSVGPaths: function() {
		var paths = document.querySelectorAll('path');

	    Array.prototype.forEach.call(paths, function(el, i) {	        
	    	//get the total length
	        var totalLength = el.getTotalLength();

	        //set PATHs to invisible
	        el.style.strokeDashoffset = totalLength;
	        el.style.strokeDasharray = totalLength + ' ' + totalLength;
	    });
	},

	drawSVGPaths: function() {

		var paths = document.querySelectorAll('path'),
			animID = null;
		var _timeMin 	= 500,
			_timeMax 	= 1000,
			_timeDelay 	= 50;
		
		 Array.prototype.forEach.call(paths, function(el, i) {
	        var length = el.getTotalLength;

	        el.style.transition = el.style.WebkitTransition =
			  'none';
			// Set up the starting positions
			el.style.strokeDasharray = length + ' ' + length;
			el.style.strokeDashoffset = length;
			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			el.getBoundingClientRect();
			// Define our transition
			el.style.transition = el.style.WebkitTransition =
			  'stroke-dashoffset 2s ease-in-out';
			// Go!
			el.style.strokeDashoffset = '0';

	        // function animStroke() {
	        // 	var offset = parseInt(el.style.strokeDashoffset, 10);
	        // 	console.log(offset);
	        // 	if(offset <= 0) {
	        // 		cancelAnimationFrame(animID);
	        // 	}
	        // 	else {
	        // 		// faire des maths pour calcluer le temps que prend l'anim selon la longueur
	        // 		el.style.strokeDashoffset = (offset - 1000)+'px';
	        // 		animID = requestAnimationFrame(animStroke);
	        // 	}
	        // }
	        // animStroke();
		 	
		 });

	    //for each PATH..
	    // $(paths).each(function(i) {

	    //     // setInterval(function() {
	        	
	    //     // }, _timeDelay*i);
	    //     $(this).delay(_timeDelay*i).animate({
	    //         'stroke-dashoffset': 0
	    //     }, {
	    //         duration: Math.floor(Math.random() * _timeMax) + _timeMin
	            
	    //     });
	    // });
	}

}
