/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var Works = require('../../../components/works/works.js');

var app = new Vue({
    el: '#app',
    data: {
        front: true,
        title: '',
        male: false,
        avatarUrl: __uri('../../../static/images/test_avatar.png'),
        follow: '',
        fans: '',
        signature: '',
        workItems: []
    },
    methods: {
        onTouchBuyHandler: function (event) {
            alert('buy?');
        },
        onTouchWorkHandler: function (event) {
            this.$data.front = !this.$data.front;
        }
    },
    components: {
        'works': Works
    },
    ready: function (argument) {
        // 添加微信二次分享设置
        util.supportAppShare(window.location.href, 'http://' + window.location.host + __uri('../../../static/images/app/app_header.jpg'));
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
    params.function = config.getStudioFn;
    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data) {
            // alert('show error page');
            util.gotoPage('../app/index.html');
            return;
        }

        var result = data;
        app.$data.title = result.nick;
        app.$data.male = result.sex === '1';
        app.$data.follow = result.zcount;
        app.$data.fans = result.dcount;
        app.$data.signature = result.desc;
        if (result.headurl && '' !== result.headurl) {
          app.$data.avatarUrl = config.getImgUrl + result.headurl;
        }
    });

    var params1 = {
        userId: params.userId,
        function: config.getStudioProduceListFn
    };
    util.jsonp(config.getProduceUrl, params1, function (error, data) {
        if ('error' === error || !data || !data.data || 0 != data.success) {
            // alert('show error page');
            util.gotoPage('../app/index.html');
            return;
        }

        var sex = app.$data.male ? 'male' : 'female';
        var workHref = '../' + sex + '/index.html?userId=' + params.userId + '&produceId=';
        var result = data.data;
        var len = result.length;
        var item;
        var workItems = [];
        var workItem;
        for (var i = 0; i < len; i++) {
            item = result[i];
            workItem = {};
            if (item.pictureUrl && '' !== item.pictureUrl.replace(/ /g, '')) {
                workItem.frontUrl = config.getImgUrl + item.pictureUrl;
            }
            if (item.pictureUrlBack && '' !== item.pictureUrlBack.replace(/ /g, '')) {
                workItem.backUrl = config.getImgUrl + item.pictureUrlBack;
            }
            workItem.frontbgUrl = util.getClothes(item.moldId, item.color, item.gender, 'front');
            workItem.backbgUrl = util.getClothes(item.moldId, item.color, item.gender, 'back');
            workItem.title = item.title;
            workItem.href = workHref + item.id;
            workItems.push(workItem);
        }
        app.$data.workItems = workItems;
    });
}

router();
window.addEventListener('hashchange', router);
