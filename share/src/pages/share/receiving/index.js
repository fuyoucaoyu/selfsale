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
        workOptions: {},
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
    var params = [];
    var pa;
    var item;
    paramsArray.forEach(function (p) {
        pa = p.split('=');
        // params[pa[0]] = (pa[1] === undefined ? '' : pa[1]);
        item = {};
        item.key = pa[0];
        item.value = (pa[1] === undefined ? '' : pa[1]);
        params.push(item);
    });
    return params;
}

// 路由控制
function router(e) {
    if (e) {
        e.preventDefault();
    }

    app.$data.workOptions = getUrlParams(window.location.href.split('?')[1]);
}

router();
window.addEventListener('hashchange', router);



