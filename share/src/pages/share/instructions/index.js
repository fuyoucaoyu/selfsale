/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var generateUrl = function (pos, index) {
	return 'url(../../../static/images/materialsize/' + pos + '/tab_btn_' + index + '.jpg)';
}
var generateTabUrl = function (pos, index) {
    return 'url(../../../static/images/materialsize/' + pos + '/tab_ms_' + index + '.png)';
}
var app = new Vue({
    el: '#app',
    data: {
    	isSize: true,
        selectIndex: 1,
        selectTabIndex: 1,
        leftUrl: generateUrl(1, 1),
        midUrl: generateUrl(2, 1),
        rightUrl: generateUrl(3, 1),
        leftTabUrl: generateTabUrl(1, 1),
        rightTabUrl: generateTabUrl(2, 1)
    },
    methods: {
        updateTbabUrl: function () {
            this.$data.leftTabUrl = generateTabUrl(1, this.$data.selectTabIndex);
            this.$data.rightTabUrl = generateTabUrl(2, this.$data.selectTabIndex);
        },
        clickLeftTabItem: function (event) {
            this.$data.selectTabIndex = 1;
            this.updateTbabUrl();
        },
        clickRightTabItem: function (event) {
            this.$data.selectTabIndex = 2;
            this.updateTbabUrl();
        },
    	updateUrl: function () {
    		this.$data.leftUrl = generateUrl(1, this.$data.selectIndex);
    		this.$data.midUrl = generateUrl(2, this.$data.selectIndex);
    		this.$data.rightUrl = generateUrl(3, this.$data.selectIndex);
    	},
    	clickLeftItem: function (event) {
    		this.$data.selectIndex = 1;
    		this.updateUrl();
    	},
    	clickMidItem: function (event) {
    		this.$data.selectIndex = 2;
    		this.updateUrl();
    	},
    	clickRightItem: function (event) {
    		this.$data.selectIndex = 3;
    		this.updateUrl();
    	}
    },
    components: {
    }
});
