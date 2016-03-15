/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = true;
Vue.use(window.tap);

var OrderItem = require('../../../components/orderItem/orderItem.js');

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

var app = new Vue({
    el: '#app',
    data: {
    	selectState: 0,
    	states: [{state: 0, name: '待付款'}, 
    			 {state: 1, name: '代发货'},
    			 {state: 4, name: '代收货'},
    			 {state: 5, name: '交易完成'}],
    	orderItems: [
	    	[
		    	{
		    		title: '自做自送！人气超T，三色入！夏日专属，自己的品牌！',
		    		price: '179.00',
		    		color: '白色',
		    		size: 'XL',
		    		num: '1',
			        workDisplayImgs: {
			            frontUrl: '',
			            backUrl: '',
			            frontbgUrl: getClothes(6, 'gray', 1, 'front'),
			            backbgUrl: getClothes(6, 'gray', 1, 'back')
			        }
		    	},
		    	{
		    		title: '2:自做自送！人气超T，三色入！夏日专属，自己的品牌！',
		    		price: '179.00',
		    		color: '白色',
		    		size: 'XL',
		    		num: '1',
			        workDisplayImgs: {
			            frontUrl: '',
			            backUrl: '',
			            frontbgUrl: getClothes(6, 'gray', 1, 'front'),
			            backbgUrl: getClothes(6, 'gray', 1, 'back')
			        }
		    	}
	    	],
	    	[
		    	{
		    		title: '3:自做自送！人气超T，三色入！夏日专属，自己的品牌！',
		    		price: '179.00',
		    		color: '白色',
		    		size: 'XL',
		    		num: '1',
			        workDisplayImgs: {
			            frontUrl: '',
			            backUrl: '',
			            frontbgUrl: getClothes(6, 'gray', 1, 'front'),
			            backbgUrl: getClothes(6, 'gray', 1, 'back')
			        }
		    	},
		    	{
		    		title: '4:自做自送！人气超T，三色入！夏日专属，自己的品牌！',
		    		price: '179.00',
		    		color: '白色',
		    		size: 'XL',
		    		num: '1',
			        workDisplayImgs: {
			            frontUrl: '',
			            backUrl: '',
			            frontbgUrl: getClothes(6, 'gray', 1, 'front'),
			            backbgUrl: getClothes(6, 'gray', 1, 'back')
			        }
		    	}
	    	]
    	]
    },
    methods: {
    	clickNavItem: function (item) {
    		this.$data.selectState = item.state;
    	}
    },
    components: {
    	'order-item': OrderItem
    }
});
