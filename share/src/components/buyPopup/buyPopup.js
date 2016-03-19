/**
 * @file
 */

var WorkdDisplay = require('../workDisplay/workDisplay.js');

var pricedic = {
    '1':{
        '7':199,
        '6':199,
        '4':139,
        '8':99,
        '3':59
    },
    '0':{
        '3':99
    }
};

var getPrice = function(){
    var otherprice = 0;
    if ('' != this.defaultOptions.pictureUrlBack){
        otherprice = 20;
    }
    var resultPrice = baseprice *（1+this.defaultOptions.percent/100.0）+otherprice+this.defaultOptions.matsPrice;
    return resultPrice;
}

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
            price: getPrice(),
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
        updateWorkDisplay: function () {
            var curData = this.$data;
            this.displayImgs.frontbgUrl = util.getClothes(curData.selectModel, curData.selectColor, curData.selectSex, 'front');
            this.displayImgs.backbgUrl = util.getClothes(curData.selectModel, curData.selectColor, curData.selectSex, 'back');
            this.options = util.clothesData[this.$data.selectModel + '_' + this.$data.selectSex];
        }
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function (argument) {
    }
};