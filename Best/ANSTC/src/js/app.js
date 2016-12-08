;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {
        var arrImage = [];
        (function() {
            $('.flat').on('init', function() {

                $(this).find('.flat__slide img').each(function(index) {
                    arrImage[index] = $(this).attr('src');
                });

            });
        })();
        $(".flat").slick({
            infinite: true,
            dots: true,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-chevron-left"> </i>',
            nextArrow: '<i class="slick-next fa fa-chevron-right"> </i>'
        });

        (function() {

            $('.flat .slick-dots li button').each(function(i) {
                $(this).attr('style', 'background-image:url(' + arrImage[i] + ');');

            });

        })();

        $(document).ready(function() {
            $(".fancybox").fancybox();
        });

        (function() {

            $('.house__rel').each(function(index) {
                var num = $(this).find('.curtain__slide').length;
                $(this).find('.house__all').html(num);
            });


            $(".curtain").slick({
                infinite: true,
                dots: false,
                arrows: true,
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                autoplayHoverPause: true,
                fade: false,
                swipeToSlide: true,
                prevArrow: '<i class="slick-prev fa fa-chevron-left"> </i>',
                nextArrow: '<i class="slick-next fa fa-chevron-right"> </i>'
            });

            $('.curtain').on('afterChange', function(event, slick, currentSlide) {
                $(this).closest('.house__rel').find('.house__current').html(currentSlide + 1 + ' ');

            });




        })();

        $('.attraction').on('init', function() {
            Foundation.reInit('equalizer');
        });
        $(".attraction").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-5x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-5x"> </i>',
            responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
        $('.attraction').on('afterChange', function(event, slick, currentSlide) {

            Foundation.reInit('equalizer');

        });
        $('.country .tabs-title a').click(function() {
            $('.attraction').slick('slickNext');
            setTimeout(function() {
                Foundation.reInit('equalizer');
            }, 500);

        });






    });
})(jQuery);
