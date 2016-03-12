/**
 * @file
 */

module.exports = {
    template: __inline('./display.html'),
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        }
    }
};