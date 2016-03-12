/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var app = new Vue({
    el: '#app',
    data: {
        front: true,
        avatarUrl: '../../../static/images/test_avatar.png',
        frontUrl: '../../../static/images/test_front.png',
        backUrl: '../../../static/images/test_back.png'
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
    }
});