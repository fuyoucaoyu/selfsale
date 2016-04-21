/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = false;
Vue.use(window.tap);

var BuyPopup = require('../../../components/buyPopup/buyPopup.js');
var WorkDisplay = require('../../../components/workDisplay/workDisplay.js');

var generateUrl = function (pos, index) {
    return 'url(../../../static/images/productdetail/' + pos + '/tab_btn_' + index + '.png)';
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
        instructionUrl: 'url(../../../static/images/productdetail/size.png)',
        selectTabIndex: 1
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
                this.$data.instructionUrl = 'url(../../../static/images/productdetail/contactus.jpg)';
            } else if (2 === selectedIndex) {
                this.$data.isFemaleInstr = true;
                this.$data.instructionUrl ='url(../../../static/images/productdetail/materialdetaile.jpg)';
            } else {
                this.$data.isMaleInstr = true;
                this.$data.instructionUrl = 'url(../../../static/images/productdetail/size.png)';
            }
        }
    },
    components: {
        'buy-popup': BuyPopup,
        'work-display': WorkDisplay
    }
});
