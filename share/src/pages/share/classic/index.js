/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var BuyPopup = require('../../../components/buyPopup/buyPopup.js');
var WorkDisplay = require('../../../components/workDisplay/workDisplay.js');

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
        'blue':'darkblue',
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

var getClothes = function (moldId, color, gender, direction) {
    var url = '../../../static/images/clothes',
    url = url + '/' + clothesdic.cstyle[moldId];
    url = url + '/' + clothesdic.sex[gender];
    url = url + '/' + clothesdic.ccolor[color];
    url = url + clothesdic.direction[direction];
    return url;
};

var clothesData = {
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
                {key: 'blue', name: '#37b0ca'}, 
                {key: 'cyan', name: 'skyblue'},
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
                {key: 'blue', name: '#37b0ca'}, 
                {key: 'cyan', name: 'skyblue'},
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
                {key: 'blue', name: '#37b0ca'}
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
                {key: 'blue', name: '#37b0ca'}, 
                {key: 'cyan', name: 'skyblue'},
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
                {key: 'blue', name: '#37b0ca'}, 
                {key: 'cyan', name: 'skyblue'},
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
                {key: 'blue', name: '#37b0ca'}, 
                {key: 'cyan', name: 'skyblue'},
                {key: 'red', name: '#ee2e1f'}
          ],
      size: [  {key: 'S', name: 'S'}, 
               {key: 'M', name: 'M'},
               {key: 'L', name: 'L'},
               {key: 'XL', name: 'XL'},
               {key: '2XL', name: '2XL'}
            ]
  }
}
var testGoodsOptions = clothesData['6_1'];

var app = new Vue({
    el: '#app',
    data: {
        buying: false,
        goodsOptions: testGoodsOptions,
        front: true,
        title: '',
        nick: '',
        detail: '',
        avatarUrl: '../../../static/images/test_avatar.png',
        workDisplayImgs: {
            frontUrl: '',
            backUrl: '',
            frontbgUrl: '', // getClothes(6, 'gray', 1, 'front'),
            backbgUrl: ''//getClothes(6, 'gray', 1, 'back')
        }
    },
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        },
    	  onTouchBuyHandler: function (event) {
    		    this.$data.buying = true;
    	  },
        onTouchWorkHandler: function (event) {
            this.$data.front = !this.$data.front;
        },
        closeBuyPopup: function (event) {
            this.$data.buying = false;
        }
    },
    components: {
        'buy-popup': BuyPopup,
        'work-display': WorkDisplay
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
        params[pa[0]] = (pa[1] === undefined ? '' : pa[1]);
    });
    return params;
}

// 路由控制
function router(e) {
    if (e) {
        e.preventDefault();
    }

    var params = getUrlParams(window.location.href.split('?')[1]);
    params.function = config.getProduceFn;
    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data || !data.data || 0 != data.success) {
            alert('show error page');
        }

        var result = data.data;
        app.$data.nick = result.nick;
        app.$data.title = result.title;
        app.$data.detail = result.content;
        if (result.headurl && '' !== result.headurl.replace(/ /g, '')) {
            app.$data.avatarUrl = config.getImgUrl + result.headurl;
        }
        if (result.pictureUrl && '' !== result.pictureUrl.replace(/ /g, '')) {
            app.$data.workDisplayImgs.frontUrl = config.getImgUrl + result.pictureUrl;
        }
        if (result.pictureUrlBack && '' !== result.pictureUrlBack.replace(/ /g, '')) {
            app.$data.workDisplayImgs.backUrl = config.getImgUrl + result.pictureUrlBack;
        }
        app.$data.workDisplayImgs.frontbgUrl = getClothes(result.moldId, result.color, result.gender, 'front'),
        app.$data.workDisplayImgs.backbgUrl = getClothes(result.moldId, result.color, result.gender, 'back')
        var infoId = result.moldId + '_' + result.gender;
        app.$data.goodsOptions = clothesData[infoId];
    });
}

router();
window.addEventListener('hashchange', router);










