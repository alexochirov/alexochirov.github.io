;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        /**
         * Разные карусели
         */
        $(".hall").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>',
            responsive: [{
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 410,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
        $(".entrepreneur").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-2x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-2x"> </i>',
            responsive: [{
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 1
                    }
                },

            ]
        });

    });
})(jQuery);
