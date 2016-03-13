/**
 * @file
 */

module.exports = {
    template: __inline('./display.html'),
    props: ['items'],
    methods: {
    },
    ready: function (argument) {
        var mySwiper = new Swiper('.swiper-container', {
            pagination: '.pagination',
            paginationClickable: true,
            slidesPerView: 'auto'
        })
    }
};