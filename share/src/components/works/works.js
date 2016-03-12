/**
 * @file
 */

module.exports = {
    template: __inline('./appHeader.html'),
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        }
    }
};