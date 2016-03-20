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
    },
    components: {
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


// requestWxPay("wxfedb3e844917b2a5","1456799000143","umecx1df202zmamib990goudz4ztz76t","prepay_id=wx20160301102320a9c0cdd7060022557687","MD5","43DB4744D6278CC2692ABD8DE8C425B2","http://shop.orimuse.com/wechatpay/wxpayOver.shtml?order_no=10201603010020947","http://www.orimuse.com/orimuse2/wechatpay/show_qr_codes?total_fee=7800&orderNo=10201603010020947&body=orimuse  &detail=orimuse  &attach=orimuse","orimuse  ","orimuse  ","orimuse","10201603010020947");

function onBridgeReady(appId, timeStamp, nonceStr, packageStr, signType, paySign, requesturl, codeurl, body, detail, attachl, orderNo) {
	WeixinJSBridge.invoke(
		'getBrandWCPayRequest', {
		"appId": appId,
		"timeStamp": timeStamp,
		"nonceStr": nonceStr,
		"package": packageStr,
		"signType": signType,
		"paySign": paySign
	},
	function(res) {
		if (requesturl.indexOf("?") > -1) {
			requesturl = requesturl + "&returnCode="
		} else {
			requesturl = requesturl + "?returnCode="
		}
		// 判断返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
		if (res.err_msg == "get_brand_wcpay_request:ok") {
			requesturl = requesturl + "ok";
		} 
		if (res.err_msg == "get_brand_wcpay_request:cancel") {
			requesturl = requesturl + "cancel";
		}
		if (res.err_msg == "get_brand_wcpay_request:fail") {
			requesturl = requesturl + "fail";
		}
		window.location.href = requesturl;
	});
}

function requestWxPay(appId, timeStamp, nonceStr, packageStr, signType, paySign, requesturl, codeurl, body, detail, attach, orderNo) {
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener) {
			document.addEventListener('WeixinJSBridgeReady', function() {
				onBridgeReady(appId, timeStamp, nonceStr, packageStr, signType, paySign, requesturl, codeurl, body, detail, attach, orderNo);
			}, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', function() {
				onBridgeReady(appId, timeStamp, nonceStr, packageStr, signType, paySign, requesturl, codeurl, body, detail, attach, orderNo);
			});
			document.attachEvent('onWeixinJSBridgeReady', function() {
				onBridgeReady(appId, timeStamp, nonceStr, packageStr, signType, paySign, requesturl, codeurl, body, detail, attach, orderNo);
			});
		}
	} else {
		onBridgeReady(appId, timeStamp, nonceStr, packageStr, signType, paySign, requesturl);
	}
}

// 路由控制
function router(e) {
    if (e) {
        e.preventDefault();
    }

    var params = getUrlParams(window.location.href.split('?')[1]);

    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data) {
            return;
        }

        var requesturl = window.location.href.split('?')[0].replace('zzzspay', 'completeOrder');
        requestWxPay(params.appId, params.timeStamp, params.nonceStr, params.package, params.signType, params.paySign, requesturl);
    });
}

router();
window.addEventListener('hashchange', router);
