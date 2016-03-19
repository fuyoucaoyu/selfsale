/**
 * @file
 */

 var WorkdDisplay = require('../workDisplay/workDisplay.js');

module.exports = {
    template: __inline('./works.html'),
    props: ['items'],
    data: function () {
    	return {
    		curIndex: 0,
    		maxLeft: 0,
    		minLeft: 0,
    		speed: 400
    	}
    },
    // watch: {
    //     'items': function () {
    //         var mySwiper = new Swiper('.swiper-container', {
    //             pagination: '.pagination',
    //             paginationClickable: true,
    //             slidesPerView: 2,
    //             loop: true
    //         })
    //     }
    // },
    methods: {
        onTouchItem: function () {
            var targetUrl = 'test-----------';
            console.log(targetUrl);
            // util.gotoPage(targetUrl);
        },
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
    	},
    	swipeLeftHandler: function (e) {
    		this.startswipeAnimation(-1);
    	},
    	swipeRightHandler: function (e) {
    		this.startswipeAnimation(1);
    	}
    },
    components: {
        'work-display': WorkdDisplay
    },
    ready: function () {
        var intervalId = setInterval(function (event) {
            if (document.querySelectorAll('.swiper-slide').length > 0) {
                clearInterval(intervalId);
                var mySwiper = new Swiper('.swiper-container', {
                    preventLinks: false,
                    pagination: '.pagination',
                    paginationClickable: true,
                    slidesPerView: 2,
                    loop: true
                })
            }
        }, 500);
    }
};