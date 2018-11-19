;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        /**
         * Разные карусели
         */
        $(".bento").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true
        });
        $(".chief").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true
        });
        $(".solution").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            responsive: [{
                    breakpoint: 440,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });
        $(".award").slick({
            infinite: true,
            dots: true,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
        });
        // сладеры в новости
        var newsDetailSlider = $(".news-detail__slider");
          newsDetailSlider.slick({
          infinite: false,
          dotsClass: 'news-detail__slider-dots',
          dots: true,
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 5000,
          autoplayHoverPause: true,
          fade: false,
          swipeToSlide: true
        });
        var newsDetailSlider2 = $(".news-detail__slider-text");
        newsDetailSlider2.slick({
          infinite: false,
          dotsClass: 'news-detail__slider-dots',
          dots: true,
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 5000,
          autoplayHoverPause: true,
          fade: false,
          swipeToSlide: true
        });
        //реинициализация после открытия модального окна
        $('.reveal').on('open.zf.reveal', function(event) {
          newsDetailSlider.slick('reinit');
          newsDetailSlider2.slick('reinit');
        });
    });
})(jQuery);
