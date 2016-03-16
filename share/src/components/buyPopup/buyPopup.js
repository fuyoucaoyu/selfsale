/**
 * @file
 */

 var WorkdDisplay = require('../workDisplay/workDisplay.js');

module.exports = {
    template: __inline('./buyPopup.html'),
    props: ['options', 'displayImgs', 'touchCloseCallback'],
    data: function () {
        return {
            selectModel: 3,
            selectSex: 0,
            selectType: 1,
            selectColor: 'white',
            selectSize: 'M',
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
        },
        clickModelItem: function (item) {
            this.$data.selectModel = item.key;
        },
        clickTypeItem: function (item) {
            this.$data.selectType = item.key;
        },
        clickColorItem: function (item) {
            this.$data.selectColor = item.key;
        },
        clickSizeItem: function (item) {
            this.$data.selectSize = item.key;
        },
        clickPlusHander: function (event) {
            this.$data.selectNum += 1;
        },
        clickSubHander: function (event) {
            this.$data.selectNum -= 1;
        }
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function (argument) {
    }
};