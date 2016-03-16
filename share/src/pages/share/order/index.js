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

var clothesChinesedic = {
	ccolor: {
        'white':'白色',
        'gray':'灰色',
        'black':'黑色',
        'yellow':'黄色',
        'blue':'蓝色',
        'cyan':'天兰',
        'green':'绿色',
        'pink':'粉色',
        'red':'红色'
    },
}

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
    	orderItems: []
    },
    methods: {
    	clickNavItem: function (item) {
    		this.$data.selectState = item.state;
    		router();
    	}
    },
    components: {
    	'order-item': OrderItem
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

    var params = {
        userId: '906',
        state: app.$data.selectState,//0代付款 1已付款 4已快递 5已完成
        function: config.getOrderByBuyerId
    };
    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data || !data.data || 0 != data.success) {
            alert('show error page');
            return;
        }

        var result = data.data;
        var dataResult = new Array();
        for (i=0;i<result.length;i++)
		{
			dataResult[i] = new Array();
		    var tempOrders = result[i];
			for (j=0;j<tempOrders.c.length;j++)
			{
				var tempOrder = tempOrders.c[j];
				var resultOrder = {
					title: '自做自售！人气潮T，三色入！夏日必备，专属自己的品牌!',
		    		price: tempOrder.price,
		    		color: clothesChinesedic.ccolor[tempOrder.color],
		    		size: tempOrder.size,
		    		num: 'x 1',
		    		workDisplayImgs: {
			            frontUrl: tempOrder.pictrueurl,
			            backUrl: tempOrder.pictrueurlback,
			            frontbgUrl: getClothes(tempOrder.moldId, tempOrder.color, tempOrder.gender, 'front'),
			            backbgUrl: getClothes(tempOrder.moldId, tempOrder.color, tempOrder.gender, 'back')
			        }
				}
				dataResult[i][j] = resultOrder;
			}
		}
        app.$data.orderItems = dataResult;
    });
}

router();
window.addEventListener('hashchange', router);
