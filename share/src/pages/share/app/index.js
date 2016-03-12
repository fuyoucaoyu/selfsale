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
        onTouchDownloadHandler: function (event) {
            alert('click download');
        }
    },
    components: {
    }
});