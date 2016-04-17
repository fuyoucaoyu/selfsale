/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = false;
Vue.use(window.tap);

var app = new Vue({
    el: '#app',
    data: {
        queryId: ''
    },
    methods: {
        queryById: function() {
            alert(this.$data.queryId);
        }
    },
    components: {
    },
    ready: function (argument) {
        // 添加微信二次分享设置
        util.supportAppShare(window.location.href, 'http://' + window.location.host + __uri('../../../static/images/share_logo.png'));
    }
});