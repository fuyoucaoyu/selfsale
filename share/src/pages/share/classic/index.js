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
        title: '石头家的小饭桶',
        detail: '每个人都带着一个标签。<br/>80或者90后，颓废的遗嘱。<br/>testing',
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