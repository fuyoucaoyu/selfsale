/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = false;
Vue.use(window.tap);


var UserWorkDisplay = require('../../../components/userWorkDisplay/userWorkDisplay.js');

// 测试用
// var baseUrl = '.';
// 上线时用，为了支持微信支付；同时SSH下也要同步更新，切config文件要改
var baseUrl = 'http://fx.zizuozishou.com/SSH/selfsaleshare';

var app = new Vue({
    el: '#app',
    data: {
        userWorkItems: [],
        isLoading: false,
        bannerList: [
            {url: baseUrl + '/static/images/recommend/bannerbg.jpg', targetUrl: 'http://www.zizuozishou.com/'},
            {url: baseUrl + '/static/images/recommend/bannerbg_1.jpg', targetUrl: undefined},
            {url: baseUrl + '/static/images/recommend/bannerbg_2.jpg', targetUrl: undefined}
        ]
    },
    methods: {
        showQueryPage: function (argument) {
            util.gotoPage(baseUrl + '/pages/activity/query/index.html');
        }
    },
    components: {
        'user-work-display': UserWorkDisplay
    },
    ready: function (argument) {
        // 添加微信二次分享设置
        util.supportAppShare(window.location.href, 'http://' + window.location.host + __uri('../../../static/images/share_logo.png'));

        var intervalId = setInterval(function (event) {
            if (document.querySelectorAll('.swiper-slide').length > 0) {
                clearInterval(intervalId);
                var mySwiper = new Swiper('.swiper-container', {
                    preventLinks: false,
                    paginationClickable: true,
                    slidesPerView: 1,
                    loop: true,
                    autoplay: 3500,
                    simulateTouch: false,
                    autoplayDisableOnInteraction: false
                })
            }
        }, 500);


        var itemContainer = document.getElementById('workItemsContainer');
        function isScrollBottom(dom) {
            var scrollTop = dom.scrollTop;
            var clientHeight = dom.clientHeight;
            var scrollHeight = dom.scrollHeight;
            if (scrollTop + clientHeight >= (scrollHeight - 2)) {
                return true;
            } else {
                return false;
            }
        }

        // 描 述：判断是滚动到页面底部
        function uiIsPageBottom() {
            var scrollTop = 0;
            var clientHeight = 0;
            var scrollHeight = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
            } else {
                clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight: document.documentElement.clientHeight;
            }
            // 知识点：Math.max 比较大小，取最大值返回
            scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            if (scrollTop + clientHeight >= (scrollHeight - 2)) {
                return true;
            } else {
                return false;
            }
        }

        itemContainer.onscroll = function (event) {
            event.preventDefault();
            if (isScrollBottom(itemContainer) && !isRequesting) {
                curPage += 1;
                if (curPage < totalPage) {
                    requestPagination();
                }
            }
        }
    }
});

var isRequesting = false;
var totalPage = 1;
var curPage = 0;
var pageSize = 6;
function requestPagination() {
    isRequesting = true;
    app.$data.isLoading = true;

    var params = {
        function: config.getWorkListFn,
        page: curPage,
        pageSize: pageSize
    };
    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data || !data.data || 0 != data.success) {
            // alert('show error page');
            util.gotoPage(baseUrl + '/pages/share/app/index.html');
            return;
        }

        totalPage = data.totalPage;

        var result = data.data;
        var len = result.length;
        var item;
        var userWorkItems = app.$data.userWorkItems;
        var userWorkItem;
        var workItem;
        var userItem;
        var workUrl;
        for (var i = 0; i < len; i++) {
            item = result[i];
            workItem = {};
            if (item.pictureUrl && '' !== item.pictureUrl.replace(/ /g, '')) {
                // workItem.frontUrl = config.getImgUrl + item.pictureUrl;
                workItem.frontUrl = util.getImageUrl(item.pictureUrl);
            }
            if (item.pictureUrlBack && '' !== item.pictureUrlBack.replace(/ /g, '')) {
                // workItem.backUrl = config.getImgUrl + item.pictureUrlBack;
                workItem.backUrl = util.getImageUrl(item.pictureUrlBack);
            }
            workItem.frontbgUrl = util.getClothes(item.moldId, item.color, item.gender, 'front');
            workItem.backbgUrl = util.getClothes(item.moldId, item.color, item.gender, 'back');
            workItem.price = item.price;

            userItem = {};
            userItem.praiseCount = item.praisecount;
            userItem.userId = item.desinerId;
            userItem.nick = item.nick;
            userItem.title = item.desc;
            if (item.headurl && '' !== item.headurl) {
              // userItem.avatarUrl = config.getImgUrl + item.headurl;
              userItem.avatarUrl = util.getImageUrl(item.headurl, 70);
            } else {
                userItem.avatarUrl = __uri('../../../static/images/test_avatar.png');
            }

            // workUrl = '../../share/classic/index.html?userId=' + userItem.userId + '&produceId=' + item.id;
            workUrl = baseUrl + '/pages/share/classic/index.html?userId=' + userItem.userId + '&produceId=' + item.id;
            userWorkItem = {workItem: workItem, userItem: userItem, workUrl: workUrl};
            userWorkItems.push(userWorkItem);
        }
        // app.$data.userWorkItems = userWorkItems;
        isRequesting = false;
        app.$data.isLoading = false;
    });
}


requestPagination();
