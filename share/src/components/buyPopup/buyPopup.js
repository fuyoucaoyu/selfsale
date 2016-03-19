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
            var params = {
                moldId: this.$data.selectModel,
                gender: this.$data.selectSex,
                corftype: this.$data.selectType,
                color: this.$data.selectColor,
                size: this.$data.selectSize,
                price: this.$data.price,
                num: this.$data.selectNum,
                produceid: this.displayImgs.produceId,
                pictrueurl: this.displayImgs.pictureUrl,
                pictrueurlback: this.displayImgs.pictureUrlBack
            };

            util.gotoPage('../receiving/index.html', params);
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
        validateSelectedOption: function (opts, name) {
            var curData = this.$data;
            var len = opts.length;
            var selectedIndex = -1;
            var i = 0;
            for (i = 0; i < len; i++) {
                if (opts[i].key == curData[name]) {
                    selectedIndex = i;
                    break;
                }
            }

            if (-1 >= selectedIndex) {
                curData[name] = opts[0].key;
            }
        },
        updateWorkDisplay: function () {
            var curData = this.$data;
            this.options = util.clothesData[this.$data.selectModel + '_' + this.$data.selectSex];
            
            this.validateSelectedOption(this.options.type, 'selectType');
            this.validateSelectedOption(this.options.ccolor, 'selectColor');
            this.validateSelectedOption(this.options.size, 'selectSize');

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