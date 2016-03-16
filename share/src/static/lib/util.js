/**
 * @file 公用方法
 */
var callback_number = 1;
var $$CB = [];
var jsonpcb = [];
var config = {
    getProduceUrl: 'http://www.zizuozishou.com:8080/SSH/shareInteface',
    getProduceFn: 'getProduceById',
    getStudioFn: 'personCenter',
    getStudioProduceListFn: 'getDesinerProduceByState',
    getOrderByBuyerId: 'getOrderByBuyerIdState',
    getImgUrl: 'http://www.zizuozishou.com:8080/SSH/FileDownload.action?filename='
}
var util = {
    jsonp: function (url, data, onload, fn) {
        var cbn = 'jsonpcb' + (callback_number++);
        fn = fn || 'callback';
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + fn + '=window.jsonpcb.' + cbn;
        for (var key in data) {
            if (typeof data[key] === 'object') {
                url += '&' + key + '=' + JSON.stringify(data[key]);
            } else {
                url += '&' + key + '=' + data[key];
            }
        }
        var s = document.createElement('script');
        window.jsonpcb[cbn] = function (response) {
            s.parentNode.removeChild(s);
            delete window.$$CB[cbn];
            onload && onload(null, response);
        }
        s.onerror = function () {
            s.parentNode.removeChild(s);
            delete window.$$CB[cbn];
            onload && onload('error');
        }
        s.src = url;
        s.type = 'text/javascript';
        document.body.appendChild(s);
    },
    post: function (url, data, callback, type) {
        var xhr = (function () {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                return new ActiveXObject('Microsoft.XMLHttp');
            }
        })();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    callback(data);
                } else {
                    // alert('请求失败！');
                }
            }
        };
        xhr.open('post', url);
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    },
    isInMap: function () {
        return (navigator.userAgent && /baidumap_ANDR|baidumap_IPHO/ig.test(navigator.userAgent.toLowerCase()));
    },
    // 滚动条在Y轴上的滚动距离
    getScrollTop: function () {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if(document.body){
            bodyScrollTop = document.body.scrollTop;
        }
        if(document.documentElement){
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    // 获取文档高度
    getScrollHeight: function () {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if(document.body){
            bodyScrollHeight = document.body.scrollHeight;
        }
        if(document.documentElement){
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    // 视口高度
    getWindowHeight: function () {
        var windowHeight = 0;
        if(document.compatMode == "CSS1Compat"){
            windowHeight = document.documentElement.clientHeight;
        }else{
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    }
};