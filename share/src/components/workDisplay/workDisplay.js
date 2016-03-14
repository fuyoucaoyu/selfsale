/**
 * @file
 */

module.exports = {
    template: __inline('./workDisplay.html'),
    props: ['displayImgs', 'front', 'touchWorkCallback'],
    methods: {
        onTouchWorkHandler: function (event) {
            this.touchWorkCallback(event);
        }
    },
    ready: function (argument) {
    }
};