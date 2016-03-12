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
        nick: '名字',
        detail: '每个人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>tes人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>testi人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>testi人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>testiting',
        avatarUrl: '../../../static/images/test_avatar.png',
        frontUrl: '../../../static/images/myfront.png',
        backUrl: '../../../static/images/myback.png',
        frontbgUrl: '../../../static/images/myfront.png',
        backbgUrl: '../../../static/images/myback.png'
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