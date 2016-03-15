/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

function isWeiXin() { //判断是否为微信浏览器
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

var app = new Vue({
    el: '#app',
    data: {
    },
    methods: {
    },
    components: {
    }
});


