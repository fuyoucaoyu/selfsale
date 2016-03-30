/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = false;
Vue.use(window.tap);

var Display = require('../../../components/displays/display.js');

var app = new Vue({
    el: '#app',
    data: {
        displayUrls: [__uri('../../../static/images/app/displays/1-2.jpg'),
                    __uri('../../../static/images/app/displays/2-2.jpg'),
                    __uri('../../../static/images/app/displays/3-2.jpg'),
                    __uri('../../../static/images/app/displays/4-2.jpg'),
                    __uri('../../../static/images/app/displays/5-2.jpg')]
    },
    methods: {
    },
    components: {
        'display': Display
    },
    ready: function (argument) {
        // 添加微信二次分享设置
        util.supportAppShare(window.location.href, 'http://' + window.location.host + __uri('../../../static/images/app/app_header.jpg'));
    }
});