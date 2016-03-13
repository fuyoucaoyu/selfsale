/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var app = new Vue({
    el: '#app',
    data: {
        front: true,
        title: '石头家的小饭桶',
        nick: '名字',
        detail: '每个人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>tes人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>testi人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>testi人都带着一个标签。<br>80或者签。<br>80签。<br>8090后，颓废的遗嘱。<br>testiting',
        avatarUrl: '../../../static/images/test_avatar.png',
        frontUrl: '../../../static/images/myfront.png',
        backUrl: '../../../static/images/myback.png',
        frontbgUrl: '../../../static/images/clothes/cardigan/female/whiteback.png',
        backbgUrl: '../../../static/images/myback.png'
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
// var clothesdic = {
//     cstyle:{
//         "7":"cardigan",
//         "6":"hatshirts",
//         "4":"sweater",
//         "3":"tshirt"
//     },
//     sex:{
//         "1":"male",
//         "0":"female"
//     },
//     ccolor: {
//         "白":"white",
//         "灰":"gray",
//         "黑":"black",
//         "黄":"yellow",
//         "深蓝":"darkblue",
//         "玫红":"rose",
//         "天兰":"skyblue",
//         "荧光绿":"fluorescencegreen",
//         "绿":"green",
//         "粉":"pink",
//         "红":"red"
//     },
//     direction:{
//         "正":"front.png",
//         "背":"back.png"
//     }
// }
// var getClothes = function{
//     var parameters = {
//         "moldId": 7, //衣服款式3 t恤 4 卫衣 5背心 6帽衫 7开衫 8儿童款
//         "color": "白", //衣服颜色
//         "gender": "1", //男女款式 1男0女
//         "direction":"正"
//     }
//     var url = '../../../static/images/clothes',
//     url = url + "/" + clothesdic.cstyle[parameters.moldId];
//     url = url + "/" + clothesdic.sex[parameters.gender];
//     url = url + "/" + clothesdic.ccolor[parameters.color];
//     url = url + clothesdic.direction[parameters.direction];
//     return url;
// }












