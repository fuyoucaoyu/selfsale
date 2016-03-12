/**
 * @file
 */

module.exports = {
    template: __inline('./works.html'),
    methods: {
        onTouchDownloadHandler: function (event) {
            alert('click download');
        }
    }
};