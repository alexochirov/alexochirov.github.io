;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {


        $(".piano").slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>',
            responsive: [


                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,

                    }
                },
                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,

                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        //begin of sticky information in header
        var $infoBlock = $('.js-info');
        if ($infoBlock.length > 0) {
            $(window).scroll(function() {

                var posAnchor = $infoBlock.offset().top;
                var scrollTop = window.pageYOffset;
                if (scrollTop > posAnchor) {
                    $('.sticky').addClass('js-information');
                    $('.header__info').removeClass('hide');
                } else {
                    $('.sticky').removeClass('js-information');
                    $('.header__info').addClass('hide');
                }
            });

        } else {
            $('.sticky').addClass('js-information');
            $('.header__info').removeClass('hide');
        }


        //end of sticky information in header
    });
})(jQuery);
