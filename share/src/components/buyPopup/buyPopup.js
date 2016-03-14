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
    },
    components: {
    	'work-display': WorkdDisplay
    },
    ready: function (argument) {
    }
};