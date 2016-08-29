(function($) {
    $(function() {
        "use strict";


        //$(document).foundation();

        $("body").on("mouseover", "div.b-dostoprim-items-four-item", function() {
            $(this).parent().find('.b-dostoprim-items-four-item').css({
                'width': '7%'
            });
            $(this).removeClass('b-dostoprim-items-four-item-min').css({
                'width': '79%'
            });
        }).on("mouseout", "div.b-dostoprim-items-four-item", function() {
            $('.b-dostoprim-items-four-item').css({
                'width': '25%'
            });
        });
        //begin of  hiding filter button b-rubrikmenu__toggler 
        $(".b-rubrikmenu__toggler").click(function() {
            if ($(this).hasClass('b-rubrikmenu__toggler_active')) {
                $(".b-rubrikmenu").slideDown();
                $(this).text($(this).data('hide'));
                $(this).removeClass('b-rubrikmenu__toggler_active')
            }
            else {
                $(".b-rubrikmenu").slideUp();
                $(this).text($(this).data('show'));
                $(this).addClass('b-rubrikmenu__toggler_active')
            }
        });
        //end of  hiding filter button b-rubrikmenu__toggler 
        //begin of b-vipa dropdown 
        $('.b-spisok__plan-span').click(function() {
            if ($(this).parent().parent().find('.b-vipa_comm').is(':visible') === false) {
                $(this).parent().parent().find('.b-vipa_comm').slideToggle();
            }
            $(this).parent().parent().find('.b-vipa_comm').find('.b-vipa__input').focus();
            $(this).parent().parent().find('.b-vipa_cal').slideUp();
        });

        $('.b-spisok__time-span').click(function() {
            if ($(this).parent().parent().find('.b-vipa_cal').is(':visible') === false) {
                $(this).parent().parent().find('.b-vipa_cal').slideToggle();
            }
            $(this).parent().parent().find('.b-vipa_cal').find('.b-vipa__input').focus();
            $(this).parent().parent().find('.b-vipa_comm').slideUp();
        });


        $('.b-vipa__btn').click(function() {
            var text = $(this).parent().find('.b-vipa__input').val();
            if (text) {
                $(this).parent().parent().find('.b-spisok__plan-span').text(text);
                $(this).parent().parent().find('.b-spisok__plan-cross').slideDown();
                $(this).parent().parent().find('.b-spisok__plan-span').addClass('b-spisok__plan-span_vvod');
            }

            $(this).parent().slideUp();
        });



        $('.b-vipa__button').click(function() {
            var text = $(this).parent().find('.b-vipa__input').val();
            if (text) {
                $(this).parent().parent().find('.b-spisok__time-span').text(text);
                $(this).parent().parent().find('.b-spisok__time-cross').slideDown();
                $(this).parent().parent().find('.b-spisok__time-span').addClass('b-spisok__time-span_vvod');
            }

            $(this).parent().slideUp();
        });

        $('.b-spisok__plan-cross').click(function() {
            $(this).parent().find('.b-spisok__plan-span').text('Добавить комментарий');
            $(this).parent().find('.b-spisok__plan-span_vvod').removeClass('b-spisok__plan-span_vvod');
            $(this).parent().parent().find('.b-vipa_comm').slideUp();
            $(this).slideUp("fast");
        });
        $('.b-spisok__time-cross').click(function() {
            $(this).parent().find('.b-spisok__time-span').text('Добавить время посещения');
            $(this).parent().find('.b-spisok__time-span_vvod').removeClass('b-spisok__time-span_vvod');
            $(this).parent().parent().find('.b-vipa_cal').slideUp();
            $(this).slideUp("fast");
        });

        $(document).mouseup(function(e) {
            var container = $(".b-vipa");
            if (container.has(e.target).length === 0) {
                $(".b-vipa").slideUp();
            }
        });
        //end of b-vipa dropdown 

        //begin of sliders
        $('.b-modal__slider').slick({
            dots: false,
            infinite: true,
            speed: 500,
            arrows: true,
        });
        //end of sliders

        //begin of yandex map




        //end of yandex map
        //begin of b-modal__slider naming slides
        function naming() {
            var currS = $('.b-modal__slider .slick-current');
            var nextS = currS.next();
            var prevS = currS.prev();
            var nextT = nextS.find('.b-spisok__title-link').html() + '<img src="./i/logo-me.png"/>';
            var prevT = prevS.find('.b-spisok__title-link').html() + '<img src="./i/logo-me.png"/>';
            $('.slick-next').html(nextT);
            $('.slick-prev').html(prevT);
        }
        $('.b-modal__slider').on('afterChange', function(event, slick, currentSlide, nextSlide) {
            naming();
        });
        //end of b-modal__slider naming slides
        //begin of b-gorod menu
        $('.b-gorod__block').click(function() {
            $(this).toggleClass('b-gorod__block_active');
            $(this).parent().find('.b-gorod__inner').slideToggle("fast");
        });

        $(document).mouseup(function(e) {
            var container = $(".b-gorod");
            if (container.has(e.target).length === 0) {
                $(".b-gorod__inner").slideUp();
                $('.b-gorod__block').removeClass('b-gorod__block_active');
            }
        });
        //end of b-gorod menu
        //begin of filter open
        $('.b-vipad__search-input').click(function() {
            $(this).addClass('b-vipad__search-input_active');
            $('.b-vipad__inner').slideDown();
        });
        $('.b-sort__ubrat-filter').click(function() {
            $('.b-vipad__search-input').removeClass('b-vipad__search-input_active');
            $('.b-vipad__inner').slideUp();
        })
        //end of filter open
        //begin of b-region__menu opening
        $('.b-region__menu').click(function() {;
            $(this).find(".b-region__list").slideToggle();
        });
        $('.b-region__link').click(function() {
            var text = $(this).text();
            $(this).closest('.b-region__menu').find('.b-region__now').text(text);
        });

        $(document).mouseup(function(e) {
            var container = $(".b-region__menu");
            if (container.has(e.target).length === 0) {

                $('.b-region__list').slideUp();
            }
        });
        //end of b-region__menu opening
        //begin of b-sort-slider fix on attraction.html
        $(document).ready(function() {
            $(".b-sort_dop").find(".ui-slider-range").first().attr('style', '');
        })
        //end of b-sort-slider fix on attraction.html
        //begin of sortable jquery-ui plugin
        $("#sortable").sortable();
        $("#sortable").disableSelection();
        //end of sortable jquery-ui plugin
        // begin window onload
        $(document).ready(function() {
            naming();



        });
        // end window onload
        //begin of window resize
        $(window).resize(function() {

        });
        //end of window resize

    });

})(jQuery);