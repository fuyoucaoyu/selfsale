/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var app = new Vue({
    el: '#app',
    data: {
    	showMsgPopup: true,
    	payResultMsg: ''
    },
    methods: {
    	hiddenMsgPopup: function () {
    		this.$data.showMsgPopup = false;
    	}
    },
    components: {
    }
});

// 参数解析
function getUrlParams(data) {
    if (!data) {
        return;
    }
    var paramsArray = data.split('&');
    var params = {};//[];
    var pa;
    var item;
    paramsArray.forEach(function (p) {
        pa = p.split('=');
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
    if ('ok' === params.returnCode) {
    	app.$data.payResultMsg = '您的订单已完成';
    } else if ('cancel' === params.returnCode) {
    	app.$data.payResultMsg = '您的订单未支付';
    } else {
    	app.$data.payResultMsg = '支付过程中出现问题';
    }
}

router();
window.addEventListener('hashchange', router);