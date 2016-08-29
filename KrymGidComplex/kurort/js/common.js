(function($) {
    if ($('.fancybox').length) {
        $('.fancybox').fancybox();
    }

    $(function() {
        "use strict";

        $(document).foundation({
            equalizer: {
                // Specify if Equalizer should make elements equal height once they become stacked.
                equalize_on_stack: true,
                // Allow equalizer to resize hidden elements
                act_on_hidden_el: false
            }

        });

        //begin of button 'UP'
        var top_show = 300; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
        var delay = 500; // Задержка прокрутки
        $(document).ready(function() {
            $(window).scroll(function() { // При прокрутке попадаем в эту функцию
                /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
                if ($(this).scrollTop() > top_show) $('.b-scroll').fadeIn();
                else $('.b-scroll').fadeOut();
            });
            $('.b-scroll').click(function() { // При клике по кнопке "Наверх" попадаем в эту функцию
                /* Плавная прокрутка наверх */
                $('body, html').animate({
                    scrollTop: 0
                }, delay);
            });
        });
        //end of button 'UP'
        //begin of yandex map


        $('.b-disable-drag').click(function() {
            if ($(this).hasClass('js-disable-drag_enable')) {
                $(this).html($(this).data('drag_disable'));
                myMap.behaviors.disable('drag');
                $(this).addClass('js-disable-drag_disable');
                $(this).removeClass('js-disable-drag_enable');
            } else {
                myMap.behaviors.enable('drag');
                $(this).html($(this).data('drag_enable'));
                $(this).removeClass('js-disable-drag_disable');
                $(this).addClass('js-disable-drag_enable');
            }
        });

        //end of yandex map
        //begin of b-contacts__svernut button 
        $('.b-contacts__svernut').click(function() {
            if ($(this).hasClass('b-contacts__svernut_sver')) {
                $(this).html($(this).data('sver-sver'));
                $(this).removeClass('b-contacts__svernut_sver');
                $('.b-contacts__inner').slideToggle();
            } else {
                $(this).html($(this).data('sver-razver'));
                $(this).addClass('b-contacts__svernut_sver');
                $('.b-contacts__inner').slideToggle();
            }
        });

        //end of b-contacts__svernut button 
        //begin of input spinner Wan Spinner

        if (typeof($.fn.WanSpinner) !== "undefined") {

            $(".js-spinner").WanSpinner({ // maximum value 
                maxValue: 99,

                // minimum value
                minValue: 1,

                // custom step
                step: 1,

                // starting value
                start: 1,


            });
        }
        //end of input spinner Wan Spinner
        //begin of slider
        $('.b-go__slider').slick({
            dots: true,
            infinite: true,
            speed: 500,
            arrows: true,
            autoplay: true
        });

        $('.b-tovar__slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            arrows: true,
            autoplay: false
        });

        $('.b-rond__slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            arrows: true,
            prevArrow: '<img src="./images/slide_left.png" class="slick-prev "/>',
            nextArrow: '<img src="./images/slide_right.png" class="slick-next "/>'
        });

        $('.b-tour__slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            arrows: true,
        });
        $('.b-rest__slider').slick({
            dots: false,
            speed: 500,
            arrows: true,
            centerMode: false,
            infinite: true,
            variableWidth: true
        });
        $('.b-shipment__slider').slick({
            dots: false,
            speed: 500,
            arrows: true,
            vertical: true,
            infinite: true,
            slidesToShow: 3,
            verticalSwiping: true,
            responsive: [

                {
                    breakpoint: 640,
                    settings: {
                        verticalSwiping:false,
                        vertical:false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });


        //end of slider
        //begin of map resize
        function mapre() {
            $('.b-main__map').height($('.b-main__church').height());
        }
        //end of map resize
        //begin of resize and onload function
        window.onload = function() {

            mapre();
        };

        $(window).resize(function() {
            mapre();
        });
        //end of resize function

        //begin of Animation goods
        $('.b-prodocts__btn').click(function() {
            var delayTime = 400;
            var buttonNumber = $(this).parent().parent().index();
            var positionBlock = $(this).parent().position();
            $(this).parent().clone().addClass('b-prodocts__item-content_cloned').prependTo('.b-back__inserted');
            $('.b-prodocts__item-content_cloned').attr("style", "left:" + positionBlock.left + "px;");
            setTimeout(function() {
                $('.b-prodocts__item-content_cloned').attr("style", "left:calc(50% - 150px);");


            }, delayTime);
            //restart of slider
            $('.b-rond__slider').slick("slickGoTo", '1');

            $(this).parent().parent().parent().slideUp(delayTime);
            $('.b-back__storage').find('.b-back__row').eq(buttonNumber).delay(delayTime).slideDown(delayTime);
            $('.b-prodocts__item-content_cloned').remove()




            $('.b-prodocts-produits__content').click(function() {
                var buttonNum = $(this).parent().index();
                var positionBlk = $(this).position();
                var delayFadeOut = 300;




                //check whether there is an element
                if ($(this).closest('.b-back__row').is('div')) {
                    $(this).closest('.b-back__row').fadeOut(delayFadeOut, "linear");
                } else {
                    $(this).closest('.b-back__more-block').fadeOut(delayFadeOut, "linear");
                }

                //clone element which will be transformed
                $('.b-back__more-storage').find('.b-back__more-block').eq(buttonNum).find('.b-tovar').clone().addClass('b-tovar_cloned').prependTo('.b-back__inserted');
                $('.b-tovar_cloned').find('.b-tovar__slide:first-child img').clone().prependTo('.b-tovar__block:first');
                $('.b-tovar_cloned').find('.b-tovar__slider').remove();


                //here We set the initial parameters
                $('.b-tovar_cloned .b-tovar__block').attr("style", "width:216px; height:278px; overflow:hidden; left:" + positionBlk.left + "px; top:" + positionBlk.top + "px;");
                setTimeout(function() {
                    $('.b-tovar_cloned .b-tovar__block').attr("style", "");


                }, 50);

                setTimeout(function() {
                    //restart of sliders
                    $('.b-tovar__slider').slick("slickGoTo", '1');
                    $('.b-rond__slider').slick("slickGoTo", '1');
                }, 10);


                setTimeout(function() {
                    $(document).foundation('equalizer', 'reflow');
                    $('.b-tovar_cloned').remove();


                }, delayFadeOut + 600);


                setTimeout(function() {
                    $('.b-back__more-storage').find('.b-back__more-block').eq(buttonNum).fadeIn("easeInOutExpo");
                    //scrolling up
                    if ($(window).width() < 640) {
                        var destination = 1000;
                    } else {
                        var destination = $('.b-tovar').offset().top;
                    }

                    $('body').animate({
                        scrollTop: destination
                    }, 300);

                }, delayFadeOut - 100);


            });

        });
        //End of Animation goods
        //begin of Motion


        //end of Motion

    });



})(jQuery);