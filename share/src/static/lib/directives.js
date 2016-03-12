/**
 * @file
 */

var touch = {};
var singleTapDelay = 250;
var doubleTapDelay = 250;
var touchTimeout;
var longTapDelay = 750;
var longTapTimeout;
var now;
var delta;
var swapDelta = 30;

function addTouchEventHandler (target) {
    removeTouchEventHandler(target);
    target.el.addEventListener('touchstart', touchStartHandler);
    target.el.addEventListener('touchmove', touchMoveHandler);
    target.el.addEventListener('touchend', touchEndHandler);
    target.el.addEventListener('touchcancel', touchCancelHandler);
}

function removeTouchEventHandler (target) {
    target.el.removeEventListener('touchstart', touchStartHandler);
    target.el.removeEventListener('touchmove', touchMoveHandler);
    target.el.removeEventListener('touchend', touchEndHandler);
    target.el.removeEventListener('touchcancel', touchCancelHandler);
}

function touchStartHandler (e) {
    touch = {};
    now = Date.now();
    delta = now - (touch.last || now);

    var point = e.touches[0];
    touch.x1 = point.pageX;
    touch.y1 = point.pageY;

    if (delta > 0 && delta <= doubleTapDelay) {
        touch.isDoubleTap = true;
    }

    touch.last = now;
    longTapTimeout = setTimeout(longTap, longTapDelay);
}

function touchMoveHandler (e) {
    cancelLongTap();
    var point = e.touches[0];
    touch.x2 = point.pageX;
    touch.y2 = point.pageY;
}

function touchEndHandler (e) {
    var self = this;

    cancelLongTap();

    if (touch.isDoubleTap) {
        this._doubleTapCallback && this._doubleTapCallback(e);
        touch = {};
    } else if (isSwipe()) {
        if ('swipeLeft' === swipeDirection()) {
            this._swipeLeftCallback && this._swipeLeftCallback(e);
        } else if ('swipeRight' === swipeDirection()) {
            this._swipeRightCallback && this._swipeRightCallback(e);
        }
        touch = {};
    } else if ('last' in touch) {
        this._tapCallback && this._tapCallback(e);
        touchTimeout = setTimeout(function(){
            touchTimeout = null
            touch = {};
            self._singleTapCallback && self._singleTapCallback(e);
        }, singleTapDelay);
    } else if (true === touch.longTap) {
        this._longTapCallback && this._longTapCallback(e);
        touch = {};
    }

    touch = {};
}

function touchCancelHandler (e) {
    if (touchTimeout) {
        clearTimeout(touchTimeout);
    }
    if (longTapTimeout) {
        clearTimeout(longTapTimeout);
    }
    longTapTimeout = touchTimeout = null;
    touch = {};
}

function longTap () {
    longTapTimeout = null;
    if (touch.last) {
        touch.longTap = true;
    }
}

function cancelLongTap (){
    if (longTapTimeout) {
        clearTimeout(longTapTimeout);
        longTapTimeout = null;
    }
}

function isSwipe() {
    return ((touch.x2 && Math.abs(touch.x1 - touch.x2) > swapDelta) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > swapDelta));
}

function swipeDirection(){
    var xDelta = Math.abs(touch.x1 - touch.x2), yDelta = Math.abs(touch.y1 - touch.y2);
    var dir = xDelta >= yDelta ? (touch.x1 - touch.x2 > 0 ? 'Left' : 'Right') : (touch.y1 - touch.y2 > 0 ? 'Up' : 'Down');
    return 'swipe' + dir;
}

var tap = {
    isFn: true,
    acceptStatement: true,
    bind: function () {
        addTouchEventHandler(this);
    },
    update: function (callback) {
        var self = this;
        this.el._tapCallback = function (e) {
            callback.call(self, e)
        };
    },
    unbind: function () {
        if (this && this.el) {
            removeTouchEventHandler(this);
        }
    }
};

var singleTap = {
    isFn: true,
    acceptStatement: true,
    bind: function () {
        addTouchEventHandler(this);
    },
    update: function (callback) {
        var self = this;
        this.el._singleTapCallback = function (e) {
            callback.call(self, e)
        };
    },
    unbind: function () {
        if (this && this.el) {
            removeTouchEventHandler(this);
        }
    }
};

var doubleTap = {
    isFn: true,
    acceptStatement: true,
    bind: function () {
        addTouchEventHandler(this);
    },
    update: function (callback) {
        var self = this;
        this.el._doubleTapCallback = function (e) {
            callback.call(self, e)
        };
    },
    unbind: function () {
        if (this && this.el) {
            removeTouchEventHandler(this);
        }
    }
};

var longTap = {
    isFn: true,
    acceptStatement: true,
    bind: function () {
        addTouchEventHandler(this);
    },
    update: function (callback) {
        var self = this;
        this.el._longTapCallback = function (e) {
            callback.call(self, e)
        };
    },
    unbind: function () {
        if (this && this.el) {
            removeTouchEventHandler(this);
        }
    }
};

var swipeLeft = {
    isFn: true,
    acceptStatement: true,
    bind: function () {
        addTouchEventHandler(this);
    },
    update: function (callback) {
        var self = this;
        this.el._swipeLeftCallback = function (e) {
            callback.call(self, e)
        };
    },
    unbind: function () {
        if (this && this.el) {
            removeTouchEventHandler(this);
        }
    }
};

var swipeRight = {
    isFn: true,
    acceptStatement: true,
    bind: function () {
        addTouchEventHandler(this);
    },
    update: function (callback) {
        var self = this;
        this.el._swipeRightCallback = function (e) {
            callback.call(self, e)
        };
    },
    unbind: function () {
        if (this && this.el) {
            removeTouchEventHandler(this);
        }
    }
};

module.exports = {
    install: function (Vue, options) {
        Vue.directive('tap', tap);
        Vue.directive('single-tap', singleTap);
        Vue.directive('double-tap', doubleTap);
        Vue.directive('long-tap', longTap);
        Vue.directive('swipe-left', swipeLeft);
        Vue.directive('swipe-right', swipeRight);
    }
}
