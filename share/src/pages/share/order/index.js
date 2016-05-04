/**
 * @file
 */

var Vue = window.Vue;
Vue.config.debug = false;
Vue.use(window.tap);

var OrderItem = require('../../../components/orderItem/orderItem.js');

function hasParent(e, p) {
    if (!e) return false;
    var el = e.target||e.srcElement||e||false;
    while (el && el != p) {
        el = el.parentNode||false;
    }
    return (el!==false);
};

var pricedic = {
    '1':{
        '7':199,
        '6':199,
        '4':139,
        '8':99,
        '3':99
    },
    '0':{
        '3':59
    }
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
        errMsg: null,
        showPopup: false,
    	selectState: 0,
    	states: [{state: 0, name: '待付款'},
    			 {state: 1, name: '待发货'},
    			 {state: 4, name: '待收货'},
    			 {state: 5, name: '交易完成'}],
        showQueryBtn: false,
        btnNames: {'0': '去支付',
                   '1': '提醒发货',
                   '4': '确认收货',
                   '5': '交易完成'},
    	orderItems: []
    },
    methods: {
    	clickNavItem: function (item) {
    		this.$data.selectState = item.state;
            this.$data.showQueryBtn = (4 === item.state) ? true : false;

    		router();
    	},
        clickBtnHandler: function (items) {
            var self = this;

            if (4 == this.$data.selectState || 5 == this.$data.selectState) {
                return;
            }

            // 去支付
            if (0 == this.$data.selectState) {
                return;
            }

            // 去提醒发货
            var params = {
                'function': config.updateOrderFn,
                'orderId': items.orderNo
            };

            $.ajax({
                url: config.getProduceUrl,
                type: 'get',
                data: params,
                dataType: 'json',
                error: function (evt) {
                },
                success: function (data) {
                    if (data && 0 == data.success) {
                        self.$data.showPopup = true;
                        self.$data.errMsg = '提醒发货成功';
                    }
                }
            });
        },
        isOpen: function() {
            return this.$data.showPopup === true;
        },
        hideMessagePopup: function () {
            this.$data.showPopup = false;
            self.$data.errMsg = '';
        }
    },
    components: {
    	'order-item': OrderItem
    },
    ready: function () {
        var self = this;
        var container = document.getElementById('msgPopup');
        var docClickHandler = function (event) {
            var target = event.target;
            if(self.isOpen() && target !== container && !hasParent(target, container)) {
                self.hideMessagePopup();
            }
        };
        document.addEventListener('touchend', docClickHandler);
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

    // for test: userId: '906',
    var params = getUrlParams(window.location.href.split('?')[1]);
    if (undefined === params || (undefined === params.userId && undefined === params.phone)) {
        return;
    }
    params.function = config.getOrderByBuyerId;
    params.state = app.$data.selectState;

    util.jsonp(config.getProduceUrl, params, function (error, data) {
        if ('error' === error || !data || !data.data || 0 != data.success) {
            // alert('show error page');
            util.gotoPage('../app/index.html');
            return;
        }

        var result = data.data;
        var dataResult = [];
        var dataItem;
        var iterator;
        var len = result.length;
        var i;
        var j;
        for (i = 0; i < len; i++)
		{
            iterator = result[i];
			dataItem = {};
            dataItem.orderNo = iterator.orderNo;
            dataItem.state = iterator.state;
            dataItem.c = [];

		    var tempOrders = iterator.c;
            var cLen = tempOrders.length;
			for (j = 0; j < cLen; j++)
			{
				var tempOrder = tempOrders[j];


                var baseprice = pricedic[tempOrder.corftype][tempOrder.moldId];
                var otherprice = 0;
                if (tempOrder.pictrueurlback && '' !== tempOrder.pictrueurlback.replace(/ /g, '') &&
                    tempOrder.pictrueurl && '' !== tempOrder.pictrueurl.replace(/ /g, '')){
                    otherprice = 20;
                }
                var percent = (undefined === tempOrder.percent || '' === tempOrder.percent) ? 0 : tempOrder.percent;
                var matsPrice = (undefined === baseprice.matsPrice || '' === baseprice.matsPrice) ? 0 : baseprice.matsPrice;
                var resultPrice = baseprice * (1 + percent / 100.0) + otherprice + matsPrice;
                // resultPrice = resultPrice.toFixed(2);
                resultPrice = Math.floor(resultPrice);

				var resultOrder = {
					title: '自做自售！人气潮T，三色入！夏日必备，专属自己的品牌!',
		    		price: resultPrice,
		    		color: clothesChinesedic.ccolor[tempOrder.color],
		    		size: tempOrder.size,
		    		num: 'x 1',
		    		workDisplayImgs: {
			            frontUrl: (undefined !== tempOrder.pictrueurl || '' !== tempOrder.pictrueurl) ? config.getImgUrl + tempOrder.pictrueurl : '',
			            backUrl: (undefined !== tempOrder.pictrueurlback || '' !== tempOrder.pictrueurlback) ? config.getImgUrl + tempOrder.pictrueurlback : '',
                        // frontUrl: (undefined !== tempOrder.pictrueurl || '' !== tempOrder.pictrueurl) ? util.getImageUrl(tempOrder.pictrueurl, 200) : '',
                        // backUrl: (undefined !== tempOrder.pictrueurlback || '' !== tempOrder.pictrueurlback) ? util.getImageUrl(tempOrder.pictrueurlback, 200) : '',
			            frontbgUrl: getClothes(tempOrder.moldId, tempOrder.color, tempOrder.gender, 'front'),
			            backbgUrl: getClothes(tempOrder.moldId, tempOrder.color, tempOrder.gender, 'back')
			        }
				}
				dataItem.c.push(resultOrder);
			}
            dataResult.push(dataItem)
		}
        app.$data.orderItems = dataResult;
    });
}

router();
window.addEventListener('hashchange', router);
