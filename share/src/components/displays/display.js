/**
 * @file
 */

module.exports = {
    template: __inline('./display.html'),
    props: ['items'],
    data: function () {
    	return {
    		curIndex: 0,
    		maxLeft: 0,
    		minLeft: 0,
    		speed: 400
    	}
    },
    methods: {
    	countDisplayStatus: function () {
    		var width = $('#displays').css('width');
    		var parentWidth = $('#displaysWrap').css('width');
    		width = parseInt(width);
    		this.$data.speed = width / 4;
    		this.$data.minLeft = parseInt(parentWidth) - width;
    	},
    	startswipeAnimation: function (dir) {
    		var left = $('#displays').css('left');

    		if ('auto' === left) {
    			left = 0;
    		} else {
    			left = parseInt(left);
    		}

    		var newLeft = left + this.$data.speed * dir;
    		if (newLeft > this.$data.maxLeft) {
    			newLeft = 0;
    		} else if (newLeft < this.$data.minLeft) {
    			newLeft = this.$data.minLeft;
    		}

    		$('#displays').animate({
    			left: newLeft + 'px'
    		}, 1000, 'ease-out');
    	}
    },
    ready: function (argument) {
    	var self = this;
    	$('#displays').on('resize', function (e) {
    		self.countDisplayStatus();
    	});
    	$('#displays').swipeLeft(function() {
    		self.startswipeAnimation(-1);
    	});
    	$('#displays').swipeRight(function() {
    		self.startswipeAnimation(1);
    	});
    	this.countDisplayStatus();
    }
};