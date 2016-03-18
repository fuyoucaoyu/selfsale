/**
 * @file
 */

 var WorkdDisplay = require('../workDisplay/workDisplay.js');

module.exports = {
    template: __inline('./buyPopup.html'),
    props: ['options', 'defaultOptions', 'displayImgs', 'touchCloseCallback'],
    data: function () {
        return {
            selectModel: this.defaultOptions.moldId,
            selectSex: this.defaultOptions.sex,
            selectType: this.defaultOptions.type,
            selectColor: this.defaultOptions.ccolor,
            selectSize: this.defaultOptions.size,
            price: this.defaultOptions.price,
            selectNum: 1
        }
    },
    methods: {
        onTouchBuyHandler: function (event) {
            alert('buy click');
        },
        onTouchCloseHandler: function (event) {
            this.touchCloseCallback && this.touchCloseCallback(event);
        },
        onScrollHandler: function (event) {
            if (event) {
                event.preventDefault && event.preventDefault();
                event.stopPropagation &&  event.stopPropagation();
            }
        },
        clickSexItem: function (item) {
            this.$data.selectSex = item.key;
            this.updateWorkDisplay();
        },
        clickModelItem: function (item) {
            this.$data.selectModel = item.key;
            this.updateWorkDisplay();
        },
        clickTypeItem: function (item) {
            this.$data.selectType = item.key;
        },
        clickColorItem: function (item) {
            this.$data.selectColor = item.key;
            this.updateWorkDisplay();
        },
        clickSizeItem: function (item) {
            this.$data.selectSize = item.key;
        },
        clickPlusHander: function (event) {
            this.$data.selectNum += 1;
        },
        clickSubHander: function (event) {
            if (this.$data.selectNum > 1){
                this.$data.selectNum -= 1;
            }
        },
        updateWorkDisplay: function () {
            var curData = this.$data;
            this.displayImgs.frontbgUrl = util.getClothes(curData.selectModel, curData.selectColor, curData.selectSex, 'front');
            this.displayImgs.backbgUrl = util.getClothes(curData.selectModel, curData.selectColor, curData.selectSex, 'back');
        }
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function (argument) {
    }
};