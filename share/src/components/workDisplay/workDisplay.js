/**
 * @file
 */

module.exports = {
    template: __inline('./workDisplay.html'),
    props: ['displayImgs', 'front', 'specClass', 'touchWorkCallback'],
    methods: {
        onTouchWorkHandler: function (event) {
            this.touchWorkCallback && this.touchWorkCallback(event);
        }
    },
    ready: function (argument) {
    }
};