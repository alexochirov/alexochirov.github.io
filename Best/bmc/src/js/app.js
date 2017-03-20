;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {


        //begin of aside accordion
        $('.cat__item').click(function() {
            $(this).toggleClass('active');
            $(this).find('.jacket').toggleClass('hide');
        });
        //end of aside accordion
        //begin of foundation reload slider
        $(document).load(function() {
            Foundation.reInit('slider');
        });
        //end of foundation reload slider
        //begin of gun and navi sliders
        var arr = [];
        (function() {

            $('.gun__slide').each(function(i) {
                arr[i] = $(this).find('img').attr('src');
            });

        })();
        jQuery.each(arr, function() {
            $('.navi').append('<div class="navi__slide"><span class="navi__helper"></span><img src="' + this + '" alt=""/></div>');
        });


        $('.gun').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.navi',
            responsive: [

                {
                    breakpoint: 640,
                    settings: {
                        arrows: true
                    }
                }
            ]
        });
        $('.navi').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.gun',
            dots: false,
            arrows: true,
            centerMode: true,
            centerPadding: '8px',

            focusOnSelect: true,
            prevArrow: '<div class="slick-prev  "> </div>',
            nextArrow: '<div class="slick-next"> </div>'
        });
        //end of gun and navi sliders

        $('.model').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            arrows: true,

            prevArrow: '<div class="slick-prev  "> </div>',
            nextArrow: '<div class="slick-next"> </div>',
            responsive: [

                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        arrows: false,
                    }
                },
            ]
        });

        //begin of slider reload when tabs was clicked
        $('#example-tabs .tabs-title').click(function() {
            setTimeout(function() {
                $('.model').slick('slickNext');
            }, 50);

        });
        //end of slider reload when tabs was clicked
        //begin of file input name changing
        $(".file__input").change(function() {
            var path = $(this).val();
            $(this).prev().html(path);
        });
        //end of file input name changing

        //begin of hiding text messages when radio buttons were clicked
      
        $('.radio__label').click(function() {
            if ($(this).prop('for') == 3) {
                $('.pattern__docs').slideUp();
                $('.pattern__docs_indi').slideDown();
            }
            if ($(this).prop('for') == 2) {
                $('.pattern__docs').slideUp();
                $('.pattern__docs_physical').slideDown();
            }
            if ($(this).prop('for') == 1) {
                $('.pattern__docs').slideUp();
                $('.pattern__docs_law').slideDown();
            }
        });
        //end of hiding text messages when radio buttons were clicked
    });
})(jQuery);
