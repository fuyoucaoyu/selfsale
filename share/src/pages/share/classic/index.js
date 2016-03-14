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
        '正':'front.png',
        '背':'back.png'
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

var testGoodsOptions = {
    sex: [  {key: 0, name: '男款'}, 
            {key: 1, name: '女款'}, 
            {key: 2, name: '无'}
         ],
    type: [  {key: 0, name: '经典款'}, 
             {key: 1, name: '基本款'}
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
    size: [  {key: 0, name: 'M'}, 
             {key: 1, name: 'L'}
          ]
};

var app = new Vue({
    el: '#app',
    data: {
        buying: false,
        goodsOptions: testGoodsOptions,
        front: true,
        title: '石头家的小饭桶',
        nick: '名字',
        detail: '每个人都带着一个标签。<br/> 80或者签。<br/> 8090后，颓废的遗嘱。<br/> tes人都带着一个标签。<br/> 80或者签。<br/> 80签。<br/> 8090后，颓废的遗嘱。<br/> testi人都带着一个标签。<br/> 80或者签。<br/> 80签。<br/> 8090后，颓废的遗嘱。<br/> testi人都带着一个标签。<br/> 80或者签。<br/> 80签。<br/> 8090后，颓废的遗嘱。<br/> testiting',
        avatarUrl: '../../../static/images/test_avatar.png',
        workDisplayImgs: {
            frontUrl: '../../../static/images/myfront.png',
            backUrl: '../../../static/images/myback.png',
            frontbgUrl: getClothes(3, 'yellow', 1, '正'),
            backbgUrl: getClothes(3, 'yellow', 1, '背')
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
        }
    },
    components: {
        'buy-popup': BuyPopup,
        'work-display': WorkDisplay
    }
});












