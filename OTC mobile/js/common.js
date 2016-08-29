(function($) {

    $(function() {
        "use strict";

        $(document).foundation({});
        //begin slider
        $('.js-slider_main').slick({
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: false,
            dots: true,
            autoplay: true
        });

        $('.js-slider').slick({
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 2,
            dots: true,
            autoplay: true,
            responsive: [{
                    breakpoint: 465,
                    settings: {
                        slidesToShow: 1,
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });


        $('.b-horizont__slider').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 2,
            responsive: [{
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        //end slider

        //begin of input number krasiviy
        if ($.fn.spinner) {
            $(function() {
                var spinner = $('.b-input-number').spinner();
            });
        }
        //end of input number krasiviy


        function centerIfOneSlide() {
            var obj = $('.slick-track>.b-slider__slide');
            var num = $(".slick-track>.b-slider__slide").length;
            if (num == 1) {
                $(".b-slider").addClass('b-slider_one-slide');
            }
        }

        $(document).ready(function() {

            /* This is basic - uses default settings */

            $("a.js-fancy-one").fancybox();

            /* Using custom settings */


            /* Apply fancybox to multiple items */

            $("a.js-fancy").fancybox({
                'transitionIn': 'elastic',
                'transitionOut': 'elastic',
                'speedIn': 600,
                'speedOut': 200,
                'overlayShow': false
            });
            centerIfOneSlide();

        });

    

        //jQuery for page scrolling feature - requires jQuery Easing plugin
        $(function() {
            $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - 0

                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });
        //end jQuery for page scrolling feature - requires jQuery Easing plugin
        //begin of b-vipa icon bordering

        $('.b-header__icons > a').click(function() {
            var dataD = $(this).attr("data-dropdown");
            $('.js-icon').removeClass('js-icon');

            function way(dataD) {
                if ($('#' + dataD).hasClass("open")) {
                    $('[data-dropdown =' + dataD + ' ]').parent().removeClass('js-icon');
                } else {
                    $('[data-dropdown =' + dataD + ' ]').parent().addClass('js-icon');
                }
            }
            setTimeout(way(dataD), 50)



        })


        //end of b-vipa icon bordering
        //begin of show address-14 
        $('.b-address__show').click(function() {
            $(this).toggleClass("b-address__show_reverse");
            $(this).next().slideToggle();
            if ($(this).hasClass("b-address__show_reverse")) {
                $(this).text("Скрыть адрес");
            } else {
                $(this).text("Показать адрес");
            }
        })
        //end of show address-14
        //begin of menu vipadenie trehyarusnoe
        $('#drop1').click(function() {
            $(this).addClass('js-mega');
        })

        $('[data-dropdown = drop2]').click(function() {
            $('#drop1').removeClass('js-mega');
        })
        $('[data-dropdown = drop3]').click(function() {
            $('#drop1').removeClass('js-mega');
        })
        $('[data-dropdown = drop4]').click(function() {
            $('#drop1').removeClass('js-mega');
        })

        $(document).mouseup(function(e) {
            var container = $(".b-vipa");
            if (container.has(e.target).length === 0) {
                container.removeClass('js-mega');
                $('.js-icon').removeClass('js-icon');
            }
        });
        $('.b-drop__list-item').click(function() {
            $(this).toggleClass('js-active');
            $(this).next('ul').slideToggle();
            $('[data-dropdown = drop1]').parent().addClass('js-icon');
        })
        $('.b-drop__list-in-item').click(function() {
            $('.b-drop__list-in-ico', this).toggleClass('js-rotate');
            $(this).next('ul').slideToggle();

        })

        //end of menu vipadenie

    });


})(jQuery);