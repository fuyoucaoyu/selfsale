/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var Works = require('../../../components/works/works.js');

var app = new Vue({
    el: '#app',
    data: {
        front: true,
        title: '石头家的小饭桶',
        male: false,
        avatarUrl: '../../../static/images/test_avatar.png',
        follow: 19,
        fans: 28,
        signature: '我不喜欢散步，但是偶尔吃饱了会飞一会儿',
        workItems: [{title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'},
                    {title: 'Fan的设计', herf: '../classic/index.html', imgUrl: '../../../static/images/test_back.png'}]
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
        'works': Works
    }
});