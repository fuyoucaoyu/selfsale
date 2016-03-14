/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
// Vue.use(window.tap);

var customDirectives = require('../../../static/lib/directives.js');
Vue.use(customDirectives);

var Display = require('../../../components/displays/display.js');

var app = new Vue({
    el: '#app',
    data: {
        displayUrls: ['../../../static/images/app/displays/1-2.jpg',
                    '../../../static/images/app/displays/2-2.jpg',
                    '../../../static/images/app/displays/3-2.jpg',
                    '../../../static/images/app/displays/4-2.jpg',
                    '../../../static/images/app/displays/5-2.jpg']
    },
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
            // http://tu.quhua.com/js/zzzs.apk
        }
    },
    components: {
        'display': Display
    }
});