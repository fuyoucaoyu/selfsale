/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var BuyPopup = require('../../../components/buyPopup/buyPopup.js');
var WorkDisplay = require('../../../components/workDisplay/workDisplay.js');

var app = new Vue({
    el: '#app',
    data: {
        buying: false,
        goodsOptions: {},
        defultSelectedOptions: {},
        front: true,
        title: '',
        nick: '',
        detail: '',
        avatarUrl: '../../../static/images/test_avatar.png',
        workDisplayImgs: {
            frontUrl: '',
            backUrl: '',
            frontbgUrl: '', // util.getClothes(6, 'gray', 1, 'front'),
            backbgUrl: ''//util.getClothes(6, 'gray', 1, 'back')
        },
        popupDisplayImgs: {
            frontUrl: '',
            backUrl: '',
            frontbgUrl: '', 
            backbgUrl: ''
        }
    },
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        },
        onTouchBuyHandler: function (event) {
            this.$data.buying = true;
        },
        onTouchWorkHandler: function (event) {
            this.$data.front = !this.$data.front;
        },
        closeBuyPopup: function (event) {
            this.$data.buying = false;
        }
    },
    components: {
        'buy-popup': BuyPopup,
        'work-display': WorkDisplay
    }
});

// 参数解析
function getUrlParams(data) {
    if (!data) {
        return;
    }
    var paramsArray = data.split('&');
    var params = {};
    paramsArray.forEach(function (p) {
        var pa = p.split('=');
        params[pa[0]] = (pa[1] === undefined ? '' : pa[1]);
    });
    return params;
}

// 路由控制
function router(e) {
    if (e) {
        e.preventDefault();
    }

    var params = getUrlParams(window.location.href.split('?')[1]);
    params.function = config.getProduceFn;
    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data || !data.data || 0 != data.success) {
            alert('show error page');
        }

        var result = data.data;
        app.$data.nick = result.nick;
        app.$data.title = result.title;
        app.$data.detail = result.content;
        if (result.headurl && '' !== result.headurl) {
          app.$data.avatarUrl = config.getImgUrl + result.headurl;
        }

        var displayImgs = app.$data.workDisplayImgs;
        var popupDisplayImgs = app.$data.popupDisplayImgs;
        if (result.pictureUrl && '' !== result.pictureUrl.replace(/ /g, '')) {
            displayImgs.frontUrl = popupDisplayImgs.frontUrl = config.getImgUrl + result.pictureUrl;
            popupDisplayImgs.pictureUrl = result.pictureUrl;
        }
        if (result.pictureUrlBack && '' !== result.pictureUrlBack.replace(/ /g, '')) {
            displayImgs.backUrl = popupDisplayImgs.backUrl = config.getImgUrl + result.pictureUrlBack;
            popupDisplayImgs.pictureUrlBack = result.pictureUrlBack;
        }
        displayImgs.frontbgUrl = popupDisplayImgs.frontbgUrl = util.getClothes(result.moldId, result.color, result.gender, 'front');
        displayImgs.backbgUrl = popupDisplayImgs.backbgUrl = util.getClothes(result.moldId, result.color, result.gender, 'back');
        popupDisplayImgs.produceId = params.produceId;

        var infoId = result.moldId + '_' + result.gender;
        app.$data.goodsOptions = util.clothesData[infoId];

        var defaultOptions = {};
        defaultOptions.moldId = result.moldId;
        defaultOptions.sex = result.gender;
        defaultOptions.type = 1;
        defaultOptions.ccolor = result.color;
        defaultOptions.size = result.size;
        defaultOptions.price = result.price;
        defaultOptions.matsPrice = result.matsPrice;
        defaultOptions.pictureUrl = result.pictureUrl;
        defaultOptions.pictureUrlBack = result.pictureUrlBack;
        defaultOptions.percent = result.percent;
        app.$data.defultSelectedOptions = defaultOptions;
    });
}

router();
window.addEventListener('hashchange', router);

