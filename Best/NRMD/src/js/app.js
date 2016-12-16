;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        $(".x-carousel-main").slick({
            infinite: true,
            dots: false,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: true,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>'
        });

        $(".x-carousel-brands").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            prevArrow: '<i class="slick-prev carousel-brands__prev fa fa-angle-left fa-2x"> </i>',
            nextArrow: '<i class="slick-next carousel-brands__next fa fa-angle-right fa-2x"> </i>',
            responsive: [{
                breakpoint: 649,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }, ]
        });

        $(".x-carousel-news").slick({
            infinite: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 7000,
            autoplayHoverPause: true
        });

        $('.x-carousel-news-link').on('click', function(e) {

            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });


        var arr = [];
        (function() {

            $('.gun__slide').each(function(i) {
                arr[i] = $(this).find('img').attr('src');
            });

        })();
        jQuery.each(arr, function() {
            $('.navi').append('<div class="navi__slide" style="background-image:url(' + this + ')"></div>');
        });


        $('.gun').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            asNavFor: '.navi',
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>'
        });
        $('.navi').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.gun',
            dots: false,
            arrows:false,
            centerMode: true,
            centerPadding: '20px',

            focusOnSelect: true,
            prevArrow: '<i class="slick-prev fa fa-chevron-left "> </i>',
            nextArrow: '<i class="slick-next fa fa-chevron-right "> </i>'
        });



        //scrollbar
        (function($) {
            $(window).on("load", function() {
                $(".goods").mCustomScrollbar({
                    axis: "x", // horizontal scrollbar
                    mouseWheel: {
                        enable: false
                    }
                });
            });
        })(jQuery);

        $(document).scroll(function() {
            if (window.scrollY > 500) {
                $('.scroll').attr("style", "display:block;");
            } else {
                $('.scroll').attr("style", "display:none;");
            }
        });

        $(function() {

            $('.scroll').click(function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });

        });
        $(window).on(
            'open.zf.reveal',
            function() {
               Foundation.reInit('equalizer');
            }
        );


    });
})(jQuery);
