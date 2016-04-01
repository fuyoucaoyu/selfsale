/**
 * @file 公用方法
 */
var callback_number = 1;
var $$CB = [];
var jsonpcb = [];

var config = {
    // getProduceUrl: 'http://www.zizuozishou.com:8080/SSH/shareInteface',
    getProduceUrl: 'http://fx.zizuozishou.com/SSH/shareInteface',
    getProduceFn: 'getProduceById',
    getStudioFn: 'personCenter',
    getStudioProduceListFn: 'getDesinerProduceByState',
    addOrderFn: 'addOrder',
    getOrderByBuyerId: 'getOrderByBuyerIdState',
    payFn: 'payParameter',
    updateOrderFn: 'updateOrder',
    shareConfFn: 'configParameter',
    // getImgUrl: 'http://www.zizuozishou.com:8080/SSH/FileDownload.action?filename='
    getImgUrl: 'http://fx.zizuozishou.com/SSH/FileDownload.action?filename='
};

var clothesdic = {
    cstyle:{
        '7':'cardigan',
        '6':'hatshirts',
        '4':'sweater',
        '8':'tshirt',
        '3':'tshirt'
    },
    sex:{
        '1':'male',
        '0':'female'
    },
    ccolor: {
        'white':'white',
        'gray':'gray',
        'black':'black',
        'yellow':'yellow',
        'blue':'blue',
        'cyan':'skyblue',
        'green':'green',
        'pink':'pink',
        'red':'red'
    },
    direction:{
        'front':'front.png',
        'back':'back.png'
    }
};

var util = {
    defaultTitle: '遇到自己,邂逅你的特殊',
    defaultDetail: '每个人都带着一张判书：<br/>80后或者90后，颓废的一族，消沉的群体。<br/>不管你怎么发声，都摘不掉它。<br/>家长心目中的乖小孩，老师眼里的坏学生，<br/>像是挥之不去的噩梦，你打不破它。<br/>注定横平竖直的整齐，像是刚刚割过的嫩韭菜。<br/>其实只需要可能一夜，我们又都重新成长起来，<br/>想要突破，注定需要勇气，敢于尝试。<br/>当遇到自做自售，请扔掉你的面具，撕掉你的判书，<br/>在这里，勇敢做自己，做不一样的自己。',
    objToString: function (params) {
        var result = '';
        var data;
        var isFirst = true;
        for (var key in params) {
            data = params[key];

            if (isFirst) {
               result += key + '=';
            } else {
                result += '&' + key + '=';
            }

            if (typeof data === 'object') {
                result += JSON.stringify(data);
            } else {
                result += data;
            }

            isFirst = false;
        }

        return result;
    },
    jsonp: function (url, data, onload, fn) {
        var cbn = 'jsonpcb' + (callback_number++);
        fn = fn || 'callback';
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + fn + '=window.jsonpcb.' + cbn;
        url +=  '&' + this.objToString(data);
        // for (var key in data) {
        //     if (typeof data[key] === 'object') {
        //         url += '&' + key + '=' + JSON.stringify(data[key]);
        //     } else {
        //         url += '&' + key + '=' + data[key];
        //     }
        // }
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
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    var data = JSON.parse(xhr.responseText);
                    callback(null, data);
                } else {
                    callback('error');
                }
            }
        };
        xhr.open('post', url);
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        var dataStr = data;
        if (typeof data === 'object') {
            dataStr = JSON.stringify(data);
        }
        xhr.send(dataStr);
    },
    gotoPage: function (loc, params) {
        if (!params || undefined === params) {
            window.location.href = loc;
            return;
        }

        loc = loc + (-1 < loc.indexOf('?') ? '&': '?');
        loc += this.objToString(params);

        window.location.href = loc;
    },
    ua: (function () {
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf('android') > -1;
        var isIphone = ua.indexOf('iphone') > -1;
        var isIOS = ua.indexOf('iphone') > -1 || ua.indexOf('ipod') > -1 || ua.indexOf('ios') > -1;
        var isMobile = isAndroid || isIOS;
        var isWeiXin = ua.indexOf('micromessenger') > -1;
        var isChrome = ua.indexOf('chrome') > -1;
        return {
            isAndroid: isAndroid,
            isIOS: isIOS,
            isMobile: isMobile,
            isWeiXin: isWeiXin
        }
    })(),
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
    },
    clothesData: {
      '3_1':{ //T恤男
          model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}, 
                   {key: 0, name: '体验款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}, 
                    {key: 'yellow', name: '#f8f12a'}, 
                    {key: 'green', name: '#149150'}, 
                    {key: 'blue', name: '#000079'}, 
                    {key: 'cyan', name: '#00FFFF'},
                    {key: 'red', name: '#ee2e1f'}
              ],
          experienceColor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'},
                   {key: '3XL', name: '3XL'}
                ]
      },
      '3_0':{ //T恤女
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}, 
                   {key: 0, name: '体验款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}, 
                    {key: 'yellow', name: '#f8f12a'}, 
                    {key: 'pink', name: '#ffb8d0'}, 
                    {key: 'green', name: '#149150'}, 
                    {key: 'blue', name: '#000079'}, 
                    {key: 'cyan', name: '#00FFFF'},
                    {key: 'red', name: '#ee2e1f'}
              ],
          experienceColor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}
              ],
          size: [  {key: 'S', name: 'S'}, 
                   {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '4_1':{ //卫衣男
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}, 
                    {key: 'yellow', name: '#f8f12a'},  
                    {key: 'blue', name: '#000079'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'},
                   {key: '3XL', name: '3XL'}
                ]
      },
      '4_0':{ //卫衣女
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'yellow', name: '#f8f12a'},
                    {key: 'green', name: '#149150'}, 
                    {key: 'blue', name: '#000079'}, 
                    {key: 'cyan', name: '#00FFFF'},
                    {key: 'red', name: '#ee2e1f'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '6_1':{ //帽衫男
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '6_0':{ //帽衫女
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '7_1':{ //开衫男
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '7_0':{ //开衫女
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}
              ],
          size: [  {key: 'M', name: 'M'}, 
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '8_1':{ //童装男
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}, 
                    {key: 'yellow', name: '#f8f12a'}, 
                    {key: 'green', name: '#149150'}, 
                    {key: 'blue', name: '#000079'}, 
                    {key: 'cyan', name: '#00FFFF'},
                    {key: 'red', name: '#ee2e1f'}
              ],
          size: [  {key: 'S', name: 'S'}, 
                   {key: 'M', name: 'M'},
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      },
      '8_0':{ //童装女
        model: [{key: 3, name: 't恤'},
                  {key: 4, name: '卫衣'},
                  {key: 6, name: '帽衫'},
                  {key: 7, name: '开衫'},
                  {key: 8, name: '儿童款'}
                 ],
          sex: [  {key: 1, name: '男款'}, 
                  {key: 0, name: '女款'}
               ],
          type: [  {key: 1, name: '经典款'}
                ],
          ccolor: [ {key: 'white', name: '#ffffff'}, 
                    {key: 'gray', name: '#99989e'}, 
                    {key: 'black', name: '#000000'}, 
                    {key: 'yellow', name: '#f8f12a'}, 
                    {key: 'green', name: '#149150'}, 
                    {key: 'blue', name: '#000079'}, 
                    {key: 'cyan', name: '#00FFFF'},
                    {key: 'red', name: '#ee2e1f'}
              ],
          size: [  {key: 'S', name: 'S'}, 
                   {key: 'M', name: 'M'},
                   {key: 'L', name: 'L'},
                   {key: 'XL', name: 'XL'},
                   {key: '2XL', name: '2XL'}
                ]
      }
    },
    getClothes: function (moldId, color, gender, direction) {
        var url = '../../../static/images/clothes',
        url = url + '/' + clothesdic.cstyle[moldId];
        url = url + '/' + clothesdic.sex[gender];
        url = url + '/' + clothesdic.ccolor[color];
        url = url + clothesdic.direction[direction];
        return url;
    },
    supportWeixinShare: function (shareData) {
        // 配置微信的二次分享
        var ua = navigator.userAgent.toLowerCase();
        var isWeiXin = ua.indexOf('micromessenger') > -1;
        if (isWeiXin) {
            this.jsonp(config.getProduceUrl, {function: config.shareConfFn}, function (error, data) {
                if (error !== 'error') {
                    var config = data;
                    // -1错误：获取不到Token;
                    // -2错误：获取不到Ticket;
                    if ('-1' == config.retcode || '-2' == config.retcode) {
                        return;
                    }

                    // 是否为调试状态，false为否
                    config.debug = false;
                    // 需要使用的接口列表
                    config.jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline'];
                    wx.config(config);
                    // 添加验证通过后的回调
                    wx.ready(function () {
                        alert('微信安全认证成功');
                        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareTimeline({
                            title: shareData.desc, // 分享标题
                            link: shareData.url, // 分享链接
                            imgUrl: shareData.imgUrl, // 分享图标
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
                        wx.onMenuShareAppMessage({
                            title: shareData.title, // 分享标题
                            desc: shareData.desc, // 分享描述
                            link: shareData.url, // 分享链接
                            imgUrl: shareData.imgUrl, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                    });

                    wx.error(function(res){
                        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                        alert('微信安全认证出错：' + res);
                    });
                }
            });
        }
    },
    supportAppShare: function (url, imgUrl) {
        var shareData = {
            title: '自做自售',
            desc: '@自做自售 小伙伴们：分享一个不错的APP软件给大家，“自做自售”：Just Me，没有什么能阻挡我的创作，我是设计师，我为自己代言',
            url: url,
            imgUrl: imgUrl
        };
        this.supportWeixinShare(shareData);
    },
    supportPersonalShare: function (username, url, imgUrl) {
        var shareData = {
            title: '好友' + username + '的设计',
            desc: 'Just Me，没有什么能阻挡我的创作，我是设计师，我为自己代言!',
            url: url,
            imgUrl: imgUrl
        };
        this.supportWeixinShare(shareData);
    },
    supportShakeShare: function (url, imgUrl) {
        var shareData = {
            title: '自做自售',
            desc: '摇一摇秒创T恤，有创意零压力赚取佣金',
            url: url,
            imgUrl: imgUrl
          };
        this.supportWeixinShare(shareData);
    }
};