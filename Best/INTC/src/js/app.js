;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        $(".top__slider").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: true,
            swipeToSlide: true
        });




   

    });
})(jQuery);