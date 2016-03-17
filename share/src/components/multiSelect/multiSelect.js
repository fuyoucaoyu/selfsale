
var Address = require('../../static/lib/address.js');
var address = new Address();

function hasParent(e, p) {
	if (!e) return false;
	var el = e.target||e.srcElement||e||false;
	while (el && el != p) {
		el = el.parentNode||false;
	}
	return (el!==false);
};

var spliter = ' ';

module.exports = {
	template: __inline('./multiSelect.html'),
	props: ['containerId', 'synCallback'],
	data: function () {
		return {
				defaultPlaceholder: '地址：省市区',
				optionsId: this.containerId + '_optionsId',
				items: address.getProvince(),
				selectValue: '地址：省市区',
				preSelectValue: '地址：省市区',
				selectedIndex: -1,
			};
	},
	methods: {
		showOptions: function () {
			this.toggleSelect();
		},
		resetSelectValue: function () {
			this.$data.selectValue = this.defaultPlaceholder;
		},
		isDefaultPlaceholder: function () {
			return this.$data.selectValue === this.defaultPlaceholder;
		},
		isOpen: function() {
			return bonzo.has(document.getElementById(this.containerId), 'cs-active');
		},
		removeFocus: function() {
			var focusEl = document.getElementById(this.containerId).querySelector('li.cs-focus');
			if (focusEl) {
				bonzo.remove(focusEl, 'cs-focus');
			}
		},
		changeOption: function() {
		},
		toggleSelect: function() {
			var self = this;
			// remove focus class if any..
			this.removeFocus();

			// 如果打开状态，直接关闭
			// 同时处理隐藏overflow-y
			if (this.isOpen()) {
				// 同步数据
				if (this.isDefaultPlaceholder()) {
					this.$data.selectValue = this.$data.preSelectValue;
				}
				this.synCallback(!this.isDefaultPlaceholder() ? this.$data.selectValue : '');

				// 切换动画
				bonzo.remove(document.getElementById(this.containerId), 'cs-active');
				// bonzo.add(document.getElementById(this.$data.optionsId), 'cs-overflow-y');
				document.getElementById(self.$data.optionsId).style.overflowY = 'hidden';
			} else {
				var scrollPos = 0;
				var selectedIndex = -1;
				if (!this.isDefaultPlaceholder()) {
					var selectedItem = this.$data.selectValue.split(' ')[0];
					selectedIndex = address.getProvince().indexOf(selectedItem);
					this.$data.selectedIndex = selectedIndex;
				} 
				bonzo.add(document.getElementById(this.containerId), 'cs-active');
				
				if (0 > selectedIndex) {
					selectedIndex = 0;
				} else if (2 < selectedIndex) {
					selectedIndex -= 1;
				}
				scrollPos = selectedIndex * document.querySelector('#' + self.containerId + ' li').offsetHeight;
				bonzo.scroll(document.getElementById(self.$data.optionsId), null, scrollPos, 'y');

				// 延迟激活scroll，避免动画问题
				setTimeout(function () {
					document.getElementById(self.$data.optionsId).style.overflowY = 'auto';
					// bonzo.add(document.getElementById(self.$data.optionsId), 'cs-overflow-y');
				}, 250);

				// 重置文本
				this.$data.preSelectValue = this.$data.selectValue;
				this.resetSelectValue();
			}
		},
		selectItem: function (index, item) {
			// 没选中一个就立即重置选择的index；
			this.$data.selectedIndex = -1;
			if (this.isDefaultPlaceholder()) {
				this.$data.selectValue = item;
			} else {
				this.$data.selectValue += spliter + item;
			}

			var nextItems = address.getNextLevel(index);
			if (nextItems && nextItems.length > 0) {
				this.$data.items = nextItems;
				bonzo.scroll(document.getElementById(this.$data.optionsId), null, 0, 'y');
			} 
			// 没有下级菜单时结束
			else {
				this.toggleSelect();
				// 重置数据
				this.$data.items = address.getProvince();
			}
		},
		stopTouchEvent: function (event) {
			event.preventDefault();
			event.stopPropagation();
		}
	},
	ready: function () {
		var self = this;
		var container = document.getElementById(this.containerId);
		var docClickHandler = function (event) {
			var target = event.target;
			if(self.isOpen() && target !== container && !hasParent(target, container)) {
				self.toggleSelect();
			}
		};
		// document.addEventListener('click', docClickHandler);
		document.addEventListener('touchend', docClickHandler);
	}
}