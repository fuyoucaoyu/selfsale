/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

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
        'front':'front.png',
        'back':'back.png'
    }
}
var getClothes = function (moldId, color, gender, direction) {
    var url = '../../../static/images/clothes',
    url = url + '/' + clothesdic.cstyle[moldId];
    url = url + '/' + clothesdic.sex[gender];
    url = url + '/' + clothesdic.ccolor[color];
    url = url + clothesdic.direction[direction];
    return url;
}
var app = new Vue({
    el: '#app',
    data: {
        front: true,
        title: '石头家的小饭桶',
        nick: '名字',
        detail: '每个人都带着一个标签。<br/> 80或者签。<br/> 8090后，颓废的遗嘱。<br/> tes人都带着一个标签。<br/> 80或者签。<br/> 80签。<br/> 8090后，颓废的遗嘱。<br/> testi人都带着一个标签。<br/> 80或者签。<br/> 80签。<br/> 8090后，颓废的遗嘱。<br/> testi人都带着一个标签。<br/> 80或者签。<br/> 80签。<br/> 8090后，颓废的遗嘱。<br/> testiting',
        avatarUrl: '../../../static/images/test_avatar.png',
        frontUrl: '../../../static/images/myfront.png',
        backUrl: '../../../static/images/myback.png',
        frontbgUrl: getClothes(3, 'yellow', 1, 'front'),//'../../../static/images/clothes/cardigan/female/grayfront.png',
        backbgUrl: getClothes(3, 'yellow', 1, 'back'),//'../../../static/images/clothes/cardigan/female/grayback.png'
    },
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        },
        onTouchBuyHandler: function (event) {
            alert('buy?');
        },
        onTouchWorkHandler: function (event) {
            this.$data.front = !this.$data.front;
        }
    },
    components: {
    }
});