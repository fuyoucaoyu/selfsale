/**
 * @file 公用方法
 */
var callback_number = 1;
var $$CB = [];
var jsonpcb = [];
var config = {
    // ROOTDOMAIN: 'http://mbcapi.baidu.com'
    // ROOTDOMAIN: 'http://cq02-map-sv-control04.cq02.baidu.com:8877'
    ROOTDOMAIN: location.origin
}
var util = {
    goto: function (page, data) {
        //app.transition = 'go';
        app.passdata = data;
        location.href = location.href.split('#')[0] + '#/' + page + '?uid='+app.viewdata.uid;
    },
    backto: function (page, data) {
        app.transition = 'back'
        location.href = location.href.split('#')[0] + '#/' + page;
    },
    jsonp: function (url, data, onload, fn) {
        var cbn = 'jsonpcb' + (callback_number++);
        fn = fn || 'cb';
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
    // 获取地图版本号
    getMapVersion: function () {
        if (util.version) {
            return util.version;
        } else {
            // todo 获取地图版本号
            util.version = '9.0';
            return util.version;
        }
    },
    // todo 获取百度地图坐标
    getLocation: function () {
        var point = {
            lng: 123,
            lat: 123
        };
        return {
            x: point.lng,
            y: point.lat
        };
    },
    isInMap: function () {
        return (navigator.userAgent && /baidumap_ANDR|baidumap_IPHO/ig.test(navigator.userAgent.toLowerCase()));
    },
    getBDUSS: function () {
        var bduss;
        var cookie = document.cookie;
        var matches = cookie.match(/BDUSS=(.*?)(;|$)/);
        if (matches && 2 <= matches.length) {
            var item = matches[1];
            item = item ? item.replace(/ /gi, '') : item;
            if (item) {
                bduss = matches[1];
            }
        }

        return bduss;
    },
    gotologin: function(uid){
        location.href = 'http://wappass.baidu.com/?forcebind=1&action=bindmobile&realnameswitch=1&&u='
            + encodeURIComponent(location.origin + '/mbc/diancan/orderfood/#/confirmorder?uid='+uid+'&sync=1')
    },

    syncLoginStatus: function () {
        var referrer = document.referrer;
        if ((referrer.indexOf('wappass.baidu.com') !== -1
            || referrer.indexOf('passport.baidu.com') !== -1)
            && (navigator.userAgent.indexOf('baidumap_ANDR') !== -1
            || navigator.userAgent.indexOf('baidumap_IPHO') !== -1
            || navigator.userAgent.indexOf('baidumap_IPAD') !== -1)) {
            try {
                location.replace('bdapi://wappass_login.sync');
            } catch (e) {
                // 同步登录状态至地图NA端出错
            }
        }
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