/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);


var MultiSelect = require('../../../components/multiSelect/multiSelect.js');

function hasParent(e, p) {
    if (!e) return false;
    var el = e.target||e.srcElement||e||false;
    while (el && el != p) {
        el = el.parentNode||false;
    }
    return (el!==false);
};


var app = new Vue({
    el: '#app',
    data: {
        isInWeixin: util.ua.isWeiXin,
        openInWeixin: '请在微信中打开并支付！',
        multiSelectId: 'addrMultiSelect',
        payType: util.ua.isWeiXin ? 0 : 1,
        errMsg: null,
        showPopup: false,
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
        validateAndPost: function (event) {
            var self = this;
            if (!this.isOpen()) {
                event.preventDefault();
                event.stopPropagation();
            }

            if (!util.ua.isWeiXin) {
                this.showMessagePopup(this.$data.openInWeixin);
                return;
            }

            this.$data.errMsg = null;
            var curOrderInfo = this.$data.orderInfo;
            if (!this.validateStr(curOrderInfo.username)) {
                this.showMessagePopup('请输入收件人');
                return;
            }

            if (!this.validateStr(curOrderInfo.phone)) {
                this.showMessagePopup('请输入联系方式');
                return;
            } else {
                var phoneReg = !!curOrderInfo.phone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
                var telReg = !!curOrderInfo.phone.match(/^\d{3}-\d{8}|\d{4}-\d{7}$/);
                if (telReg === false && phoneReg === false) {
                    this.showMessagePopup('请输入正确的手机号或固话号！');
                    return;
                }
            }
            if (!this.validateStr(curOrderInfo.address)) {
                this.showMessagePopup('请选择省市区');
                return;
            }
            if (!this.validateStr(curOrderInfo.detail_address)) {
                this.showMessagePopup('请输入详细地址');
                return;
            }

            var orderInfo = this.$data.orderInfo;
            var params = {
                // function: config.addOrderFn,
                payType: curOrderInfo.payType,
                name: orderInfo.username,
                phone: orderInfo.phone,
                address: orderInfo.address + ' ' + orderInfo.detail_address,
                c: []
            };

            var workOptions = this.$data.workOptions;
            var len = workOptions.num;
            for (var i = 0; i < len; i++) {
                params.c.push(workOptions);
            }

            var data = {
                function: config.addOrderFn,
                params: params
            }

            util.jsonp(config.getProduceUrl, data, function (error, data) {
                if ('error' === error || !data) {
                    return;
                }

                // 为了获取微信支付的code，需要重定向。重定向域名需要是微信用户信息系统认可的域名
                if (0 == self.$data.payType && util.ua.isWeiXin) {
                    var myurl = window.location.href.split('?')[0].replace('receiving', 'zzzspay');
                    var params = {
                        orderCde: data.orderNo,
                        userId: data.userId,
                        payType: self.$data.payType,
                        order_price: workOptions.num * workOptions.price
                    }
                    myurl += '?' + util.objToString(params);

                    var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + data.WXid + '&redirect_uri=' 
                        + encodeURIComponent(myurl) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
                    window.location.href = url;
                } 
                // 支付宝支付
                else if (1 == self.$data.payType) {
                    
                }
            });

            // $.post(config.getProduceUrl, data, function (result) {
            //     console.log(result);
            // });

            // var paramsStr = 'params=' +  JSON.stringify(params);
            // util.post (config.getProduceUrl + '?function=' + config.addOrderFn , paramsStr, function (error, data) {
            //     console.log(error);
            //     console.log(data);
            // });
        },
        updateAddress: function (value) {
            this.$data.orderInfo.address = value;
        },
        isOpen: function() {
            return this.$data.showPopup === true;
        },
        showMessagePopup: function (value) {
            this.$data.errMsg = value;
            this.$data.showPopup = true;
        },
        hideMessagePopup: function () {
            this.$data.showPopup = false;
        }
    },
    components: {
        'multi-select': MultiSelect
    },
    ready: function () {
        var self = this;
        var container = document.getElementById('msgPopup');
        var docClickHandler = function (event) {
            var target = event.target;
            if(self.isOpen() && target !== container && !hasParent(target, container)) {
                self.hideMessagePopup();
            }
        };
        // document.addEventListener('click', docClickHandler);
        document.addEventListener('touchend', docClickHandler);
    }
});

// 参数解析
function getUrlParams(data) {
    if (!data) {
        return;
    }
    var paramsArray = data.split('&');
    var params = {};//[];
    var pa;
    var item;
    paramsArray.forEach(function (p) {
        pa = p.split('=');
        params[pa[0]] = (pa[1] === undefined ? '' : pa[1]);
        // item = {};
        // item.key = pa[0];
        // item.value = (pa[1] === undefined ? '' : pa[1]);
        // params.push(item);
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



