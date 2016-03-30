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

module.exports = {
    template: __inline('./buyPopup.html'),
    props: ['options', 'defaultOptions', 'displayImgs', 'touchCloseCallback'],
    data: function () {
        return {
            showingColor: {},
            selectModel: this.defaultOptions.moldId,
            selectSex: this.defaultOptions.sex,
            selectType: this.defaultOptions.type,
            selectColor: this.defaultOptions.ccolor,
            selectSize: this.defaultOptions.size,
            price: this.getPrice(),
            selectNum: 1
        }
    },
    computed: {
        showingColor: function () {
            return (3 == this.$data.selectModel && 0 == this.$data.selectType) ? this.options.experienceColor : this.options.ccolor;
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
                produceid: undefined === this.displayImgs.produceId ? '' : this.displayImgs.produceId,
                pictrueurl: undefined === this.displayImgs.pictureUrl ? '' : this.displayImgs.pictureUrl,
                pictrueurlback: undefined === this.displayImgs.pictureUrlBack ? '' : this.displayImgs.pictureUrlBack
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
            this.updatePrice();
        },
        clickTypeItem: function (item) {
            this.$data.selectType = item.key;
            this.updateWorkDisplay();
            this.updatePrice();
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

            // T恤体验款颜色只有黑色白色灰色
            if (3 == this.$data.selectModel && 0 == this.$data.selectType) {
                this.validateSelectedOption(this.options.experienceColor, 'selectColor');
            } else {
                this.validateSelectedOption(this.options.ccolor, 'selectColor');
            }

            this.validateSelectedOption(this.options.size, 'selectSize');

            this.displayImgs.frontbgUrl = util.getClothes(curData.selectModel, curData.selectColor, curData.selectSex, 'front');
            this.displayImgs.backbgUrl = util.getClothes(curData.selectModel, curData.selectColor, curData.selectSex, 'back');
        },
        getPrice: function () {
            var otherprice = 0;
            if (this.defaultOptions.pictureUrlBack && '' !== this.defaultOptions.pictureUrlBack.replace(/ /g, '')){
                otherprice = 20;
            }

            var type = undefined === this.$data.selectType ? this.defaultOptions.type : this.$data.selectType;
            var module = undefined === this.$data.selectModel ? this.defaultOptions.moldId : this.$data.selectModel;
            var baseprice = pricedic[type][module];
            var resultPrice = baseprice * (1 + this.defaultOptions.percent / 100.0)+ otherprice + this.defaultOptions.matsPrice;
            return resultPrice;
        },
        updatePrice: function () {
            this.$data.price = this.getPrice();
        }
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function (argument) {
    }
};