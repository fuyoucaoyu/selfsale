/**
 * @file
 */

 var WorkdDisplay = require('../workDisplay/workDisplay.js');
 
module.exports = {
    template: __inline('./orderItem.html'),
    props: ['orderInfo'],
    methods: {
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function () {
    }
};