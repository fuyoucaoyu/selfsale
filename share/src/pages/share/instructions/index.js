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
        leftUrl: generateUrl(1, 1),
        midUrl: generateUrl(2, 1),
        rightUrl: generateUrl(3, 1),
        isMaleInstr: true,
        isFemaleInstr: false,
        isChildInstr: false,
        instructionUrl: 'url(../../../static/images/materialsize/size_male.png)',
        selectTabIndex: 1,
        leftTabUrl: generateTabUrl(1, 1),
        rightTabUrl: generateTabUrl(2, 1)
    },
    methods: {
    	updateUrl: function () {
    		this.$data.leftUrl = generateUrl(1, this.$data.selectIndex);
    		this.$data.midUrl = generateUrl(2, this.$data.selectIndex);
    		this.$data.rightUrl = generateUrl(3, this.$data.selectIndex);
    	},
    	clickLeftItem: function (event) {
    		this.$data.selectIndex = 1;
    		this.updateUrl();
            this.showInstr();
    	},
    	clickMidItem: function (event) {
    		this.$data.selectIndex = 2;
    		this.updateUrl();
            this.showInstr();
    	},
    	clickRightItem: function (event) {
    		this.$data.selectIndex = 3;
    		this.updateUrl();
            this.showInstr();
    	},
        showInstr: function () {
            var selectedIndex = this.$data.selectIndex;
            this.$data.isMaleInstr = false;
            this.$data.isFemaleInstr = false;
            this.$data.isChildInstr = false;
            if (3 === selectedIndex) {
                this.$data.isChildInstr = true;
                this.$data.instructionUrl = 'url(../../../static/images/materialsize/size_child.png)';
            } else if (2 === selectedIndex) {
                this.$data.isFemaleInstr = true;
                this.$data.instructionUrl ='url(../../../static/images/materialsize/size_female.png)';
            } else {
                this.$data.isMaleInstr = true;
                this.$data.instructionUrl = 'url(../../../static/images/materialsize/size_male.png)';
            }
        },
        updateTabUrl: function () {
            this.$data.leftTabUrl = generateTabUrl(1, this.$data.selectTabIndex);
            this.$data.rightTabUrl = generateTabUrl(2, this.$data.selectTabIndex);
        },
        clickLeftTabItem: function (event) {
            this.$data.isSize = true;
            this.$data.selectTabIndex = 1;
            this.updateTabUrl();
        },
        clickRightTabItem: function (event) {
            this.$data.isSize = false;
            this.$data.selectTabIndex = 2;
            this.updateTabUrl();
        }
    },
    components: {
    }
});
