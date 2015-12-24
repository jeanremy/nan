var model = require('./models.js');

module.exports = scrollListeners;

function scrollListeners(req) {

	var req = req;
    var _this = this;
   

    this.MouseWheelListener = function(e) {
        var e = window.event || e; // old IE support
        this.delta = e.wheelDelta || -e.detail;
        // scroll down
        if(this.delta < 0) { 
            window.framework.go(model[req.route].next);
        }
        //scrollUp
        else {
            window.framework.go(model[req.route].prev);
        }
        _this.removeListeners();

        return false;
    };

    this.KeyPressListener = function(e) {
    	console.log('top');
        // scroll down
        if(e.keyCode == '40') {
            window.framework.go(model[req.route].next);
        }
        //scrollUp
        else if(e.keyCode == '38') {
            window.framework.go(model[req.route].prev);
        }
        else {return false;}
        _this.removeListeners();
    };

    this.addListeners = function() {
        window.addEventListener("keydown", _this.KeyPressListener, false);
        window.addEventListener("mousewheel", _this.MouseWheelListener, false);
        window.addEventListener("DOMMouseScroll", _this.MouseWheelListener, false);
    };

    this.removeListeners = function() {
        window.addEventListener("keydown", _this.KeyPressListener, false);
        window.removeEventListener("mousewheel", _this.MouseWheelListener, false);
        window.removeEventListener("DOMMouseScroll", _this.MouseWheelListener, false);
    };


}
