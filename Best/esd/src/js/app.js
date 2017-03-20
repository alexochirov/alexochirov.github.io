;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        /**
         * Разные карусели
         */
        $(".estel").slick({
            infinite: true,
            dots: true,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: true,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"><i class="fa fa-chevron-left"></i></div>',
            nextArrow: '<div class="slick-next"><i class="fa fa-chevron-right"></i></div>'
        });
        $(".makeup").slick({
            infinite: true,
            dots: false,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true
        });


        $(".spa").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"><i class="fa fa-lg fa-chevron-left"></i></div>',
            nextArrow: '<div class="slick-next"><i class="fa fa-lg fa-chevron-right"></i></div>',
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                },
            }, {
                breakpoint: 440,
                settings: {
                    slidesToShow: 1,
                },
            }]
        });

        //begin of makeup

        //end of makeup
        //begin of fancybox
        $("a.group-fancy").fancybox({
            'transitionIn': 'elastic',
            'transitionOut': 'elastic',
            'speedIn': 600,
            'speedOut': 200,
            'overlayShow': false
        });


        //end of fancybox

        //begin soc icons hack
        $('.soc,.arrow').mouseenter(function() {
            $(this).find('.fa-stack-2x').removeClass('fa-circle-thin').addClass('fa-circle');
        });
        $('.soc,.arrow').mouseleave(function() {
            $(this).find('.fa-stack-2x').addClass('fa-circle-thin').removeClass('fa-circle');
        });
        //end soc icons hack
        //begin of scroll

        $(document).scroll(function() {
            if (window.scrollY > 900) {
                $('.scroll').attr("style", "display:block;");
            } else {
                $('.scroll').attr("style", "display:none;");
            }
        });
        $('.scroll').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        //end of scroll


    });
})(jQuery);
