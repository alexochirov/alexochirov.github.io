;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {


        var arr = [];
        (function() {

            $('.gun__slide').each(function(i) {
                arr[i] = $(this).find('img').attr('src');
            });


        })();

        $('.gun').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: false,
            asNavFor: '.navi',
            vertical: true,
            verticalSwiping: true
        });
        $('.navi').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.gun',
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            prevArrow: '<i class="slick-prev fa fa-chevron-up "> </i>',
            nextArrow: '<i class="slick-next fa fa-chevron-down "> </i>'
        });


        (function() {

            $('.navi .slick-dots li button').each(function(i) {
                $(this).html('<img src="' + arr[i] + '" alt="" />');

            });

        })();
        $(document).on("show.zf.dropdownmenu", function(ev, $el) {
            $el.prev().addClass('js-open');
        });
        $(document).on("hide.zf.dropdownmenu", function(ev, $el) {
            $el.find('a').removeClass('js-open');
        });







    });
})(jQuery);
