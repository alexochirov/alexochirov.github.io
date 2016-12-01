;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        $('.sli').on('init', function(slick) {
            $(this).parent().next().find('.news_slider').first().addClass('active');
        });

        $(".sli").slick({
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
        $('.sli').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $(this).parent().next().find('.news_slider.active').removeClass('active');
            $(this).parent().next().find('.news_slider').eq(nextSlide).addClass('active');
        });







    });
})(jQuery);
