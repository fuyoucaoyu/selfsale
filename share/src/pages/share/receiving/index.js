/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);


var MultiSelect = require('../../../components/multiSelect/multiSelect.js');

function isWeiXin() { //判断是否为微信浏览器
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

var app = new Vue({
    el: '#app',
    data: {
        multiSelectId: 'addrMultiSelect',
        payType: 0,
        errMsg: null,
        orderInfo: {
            username: '',
            phone: '',
            address: '',
            detail_address: '',
            remarks: ''
        }
    },
    methods: {
        selectPayType: function (value) {
            this.$data.payType = value;
        },
        validateStr: function (value) {
            return (value && '' !== value.replace(/ /g, ''));
        },
        validateAndPost: function (value) {
            this.$data.errMsg = null;
            var curOrderInfo = this.$data.orderInfo;
            if (!this.validateStr(curOrderInfo.username)) {
                this.$data.errMsg = '请输入用户名';
                return;
            }
            if (!this.validateStr(curOrderInfo.phone)) {
                this.$data.errMsg = '请输入用户名';
                return;
            }
            if (!this.validateStr(curOrderInfo.address)) {
                this.$data.errMsg = '请输入用户名';
                return;
            }
            if (!this.validateStr(curOrderInfo.detail_address)) {
                this.$data.errMsg = '请输入用户名';
                return;
            }

            //todo: post
        },
        updateAddress: function (value) {
            this.$data.orderInfo.address = value;
        }
    },
    components: {
        'multi-select': MultiSelect
    },
    ready: function () {
    }
});

// 参数解析
function getUrlParams(data) {
    if (!data) {
        return;
    }
    var paramsArray = data.split('&');
    var params = {};
    paramsArray.forEach(function (p) {
        var pa = p.split('=');
        // params[pa[0]] = (pa[1] === undefined ? '' : pa[1]);
        params.key = pa[0];
        params.value = (pa[1] === undefined ? '' : pa[1]);
    });
    return params;
}

// 路由控制
function router(e) {
    if (e) {
        e.preventDefault();
    }

    var params = getUrlParams(window.location.href.split('?')[1]);
    for (var p in params) {
        app.$data.orderInfo[p] = params[p];
    }
}

router();
window.addEventListener('hashchange', router);



