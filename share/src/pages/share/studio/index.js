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
        avatarUrl: '../../../static/images/test_avatar.png',
        follow: 0,
        fans: 0,
        signature: '',
        workItems: [{title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'}]
    },
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        },
        onTouchBuyHandler: function (event) {
            alert('buy?');
        },
        onTouchWorkHandler: function (event) {
            this.$data.front = !this.$data.front;
        }
    },
    components: {
        'works': Works
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
            alert('show error page');
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
            alert('show error page');
            return;
        }

        var result = data.data;
        app.$data.workItems = result;
    });
}

router();
window.addEventListener('hashchange', router);
