/**
 * @file
 */

 var WorkdDisplay = require('../workDisplay/workDisplay.js');

module.exports = {
    template: __inline('./userWorkDisplay.html'),
    props: ['item'],
    data: function () {
    },
    methods: {
        clickItemHandler: function () {
            util.gotoPage(this.item.workUrl);
        }
    },
    components: {
        'work-display': WorkdDisplay
    },
    ready: function () {
    }
};