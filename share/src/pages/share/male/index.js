/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var BuyPopup = require('../../../components/buyPopup/buyPopup.js');
var WorkDisplay = require('../../../components/workDisplay/workDisplay.js');

var clothesdic = {
    cstyle:{
        '7':'cardigan',
        '6':'hatshirts',
        '4':'sweater',
        '8':'tshirt',
        '3':'tshirt'
    },
    sex:{
        '1':'male',
        '0':'female'
    },
    ccolor: {
        'white':'white',
        'gray':'gray',
        'black':'black',
        'yellow':'yellow',
        'blue':'darkblue',
        'cyan':'skyblue',
        'green':'green',
        'pink':'pink',
        'red':'red'
    },
    direction:{
        'front':'front.png',
        'back':'back.png'
    }
}

var getClothes = function (moldId, color, gender, direction) {
    var url = '../../../static/images/clothes',
    url = url + '/' + clothesdic.cstyle[moldId];
    url = url + '/' + clothesdic.sex[gender];
    url = url + '/' + clothesdic.ccolor[color];
    url = url + clothesdic.direction[direction];
    return url;
}

var testGoodsOptions = {
    sex: [  {key: 0, name: '男款'}, 
            {key: 1, name: '女款'}, 
            {key: 2, name: '无'}
         ],
    type: [  {key: 0, name: '经典款'}, 
             {key: 1, name: '基本款'}
          ],
    ccolor: [ {key: 'white', name: '#ffffff'}, 
              {key: 'gray', name: '#99989e'}, 
              {key: 'black', name: '#000000'}, 
              {key: 'yellow', name: '#f8f12a'}, 
              {key: 'pink', name: '#ffb8d0'}, 
              {key: 'green', name: '#149150'}, 
              {key: 'blue', name: '#37b0ca'}, 
              {key: 'cyan', name: 'skyblue'},
              {key: 'red', name: '#ee2e1f'}
        ],
    size: [  {key: 0, name: 'M'}, 
             {key: 1, name: 'L'}
          ]
};

var app = new Vue({
    el: '#app',
    data: {
        buying: false,
        goodsOptions: testGoodsOptions,
        front: true,
        title: '',
        nick: '',
        detail: '',
        avatarUrl: '../../../static/images/test_avatar.png',
        workDisplayImgs: {
            frontUrl: '',
            backUrl: '',
            frontbgUrl: getClothes(4, 'yellow', 0, 'front'),
            backbgUrl: getClothes(4, 'yellow', 0, 'back')
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

        app.$data.workDisplayImgs.frontUrl = config.getImgUrl + result.pictureUrl;
        app.$data.workDisplayImgs.backUrl = config.getImgUrl + result.pictureUrlBack;
        app.$data.workDisplayImgs.frontbgUrl = getClothes(result.moldId, result.color, result.gender, 'front'),
        app.$data.workDisplayImgs.backbgUrl = getClothes(result.moldId, result.color, result.gender, 'back')
    });
}

router();
window.addEventListener('hashchange', router);
