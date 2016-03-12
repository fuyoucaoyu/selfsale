/**
 * @file
 */
var tap = {
    install: function (Vue, options) {
        Vue.directive('tap', {
            isFn: true,
            acceptStatement: true,
            addEvent: function () {
                this.el.addEventListener('touchstart', this.startHandle);
                this.el.addEventListener('touchend', this.endHandle);
            },
            startHandle: function (e) {
                var touchPoint = e.touches[0];
                var startInfo = {
                    startX: touchPoint.pageX,
                    startY: touchPoint.pageY,
                    startTime: new Date().getTime()
                };
                this.startInfo = startInfo;
            },
            endHandle: function (e) {
                var touchPoint = e.changedTouches[0];
                var endInfo = {
                    endX: touchPoint.pageX,
                    endY: touchPoint.pageY,
                    endTime: new Date().getTime()
                }
                if (Math.abs(this.startInfo.startX - endInfo.endX) < 3 &&
                    Math.abs(this.startInfo.startY - endInfo.endY) < 3) {
                    this._tapCallback(e);
                }
            },
            update: function (callback) {
                this.addEvent();
                var self = this;
                this.el._tapCallback = function (e) {
                    callback.call(self, e)
                };
            },
            bind: function () {
            },
            unbind: function () {
            }

        })
    }
}
