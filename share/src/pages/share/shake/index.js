/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var app = new Vue({
    el: '#app',
    data: {
       
    },
    methods: {
    },
    components: {
    },
    ready: function (argument) {
        // 添加微信二次分享设置
        util.supportShakeShare(window.location.href, 'http://' + window.location.host + __uri('../../../static/images/app/app_header.jpg'));
    }
});


