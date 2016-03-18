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
        front: true,
        title: '',
        nick: '',
        detail: '',
        avatarUrl: '../../../static/images/test_avatar.png',
        workDisplayImgs: {
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
        if (result.pictureUrl && '' !== result.pictureUrl.replace(/ /g, '')) {
            app.$data.workDisplayImgs.frontUrl = config.getImgUrl + result.pictureUrl;
        }
        if (result.pictureUrlBack && '' !== result.pictureUrlBack.replace(/ /g, '')) {
            app.$data.workDisplayImgs.backUrl = config.getImgUrl + result.pictureUrlBack;
        }
        app.$data.workDisplayImgs.frontbgUrl = util.getClothes(result.moldId, result.color, result.gender, 'front');
        app.$data.workDisplayImgs.backbgUrl = util.getClothes(result.moldId, result.color, result.gender, 'back');
        var infoId = result.moldId + '_' + result.gender;
        app.$data.goodsOptions = util.clothesData[infoId];
    });
}

router();
window.addEventListener('hashchange', router);
