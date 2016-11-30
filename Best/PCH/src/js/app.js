;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        $(".sli").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true
        });
        // (function() {
        //     $('.result__drop').click(function() {
        //         $(this).toggleClass('fa-rotate-180');
        //         $(this).parent().parent().find('.result__news').toggleClass('js-show');
        //     });
        // })();

        (function() {
            $('.content__toggle').click(function() {
                $(this).parent().find('.menu').toggleClass('js-open');
            });
        })();







    });
})(jQuery);
