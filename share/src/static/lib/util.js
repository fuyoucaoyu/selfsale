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
    gotoPage: function (loc, params) {
        if (!params || undefined === params) {
            window.location.href = loc;
            return;
        }

        loc = loc + (-1 < loc.indexOf('?') ? '&': '?');
        var data;
        var isFirst = true;
        for (var key in params) {
            data = params[key];

            if (isFirst) {
               loc += key + '=';
            } else {
                loc += '&' + key + '=';
            }

            if (typeof data === 'object') {
                loc += JSON.stringify(data);
            } else {
                loc += data;
            }

            isFirst = false;
        }

        window.location.href = loc;
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
    }
};