/**
 * @file
 */

 var WorkdDisplay = require('../workDisplay/workDisplay.js');

module.exports = {
    template: __inline('./buyPopup.html'),
    props: ['options', 'displayImgs'],
    data: function () {
    },
    methods: {
        onTouchBuyHandler: function (event) {
            alert('buy click');
        },
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function (argument) {
    }
};