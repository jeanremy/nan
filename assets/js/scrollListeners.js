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
            if(model[req.route].next) {
                window.framework.go(model[req.route].next);
            }
            else {
                return false;
            }
        }
        //scrollUp
        else {
            if(model[req.route].prev) {
                window.framework.go(model[req.route].prev);
            }
            else {
                return false;
            }
        }
        _this.removeListeners();

        return false;
    };

    this.KeyPressListener = function(e) {
        // scroll down
        if(e.keyCode == '40') {
            if(model[req.route].next) {
                window.framework.go(model[req.route].next);
            }
            else {
                return false;
            }
        }
        //scrollUp
        else if(e.keyCode == '38') {
            if(model[req.route].prev) {
                window.framework.go(model[req.route].prev);
            }
            else {
                return false;
            }
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
