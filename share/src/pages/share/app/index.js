/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
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
    }
});