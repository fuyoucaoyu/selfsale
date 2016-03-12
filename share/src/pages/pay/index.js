/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var app = new Vue({
    el: '#app',
    data: {
        view: '/editer',
        info: {
            msg: 'loading ...'
        }
    },
    events: {
        'showshoplist': function () {
            location.href = location.origin + '/selfsale/pages/make/#/shoplist';
        }
    },
    components: {
        '/editer': require('./views/editer/editer.js')
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
    var path = location.href.split('#')[1];
    if (!path) {
        path = '/editer';
    }
    var view = path.split('?')[0];
    var data = getUrlParams(path.split('?')[1]);
    app.viewdata = data;
    app.view = view;
    if (e) {
        e.preventDefault();
    }
}
router();
window.addEventListener('hashchange', router);