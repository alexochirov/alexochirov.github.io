;$(document).foundation();
(function ($) {
    "use strict";
    $(function () {
        /**
         * сортировка и подсветка столбца.
         */

        // https://mottie.github.io/tablesorter/
        // https://mottie.github.io/tablesorter/docs/index.html
        $(".rating-pamm-table").tablesorter({
          headers: {
            0: { sorter: false},
            1: { sorter: false},
            8: { sorter: false}
            },
          theme: 'blue',
          widgets : ["zebra", "columns"],
          widgetOptions : {
            columns : [ "primary", "secondary", "tertiary" ]
          }
        });
        /**
         * фильтры
         */
                 //tooltips
         function sliderDataTooltipsShow(sliderClass, str) {
             var $slider=$(sliderClass);
             var $sliderInitStart=$(sliderClass + ' + .rating-pamm__slider-input-group .rating-pamm__slider-input-left').val();
             var $sliderInitEnd=$(sliderClass + ' + .rating-pamm__slider-input-group .rating-pamm__slider-input-right').val();
                 $slider.find('.rating-pamm__slider-handle-left-inner').text($sliderInitStart +' '+str);
                 $slider.find('.rating-pamm__slider-handle-right-inner').text($sliderInitEnd +' '+str);
         }
        $('.rating-pamm-filter__slider-yield').on('moved.zf.slider', function(event) {
            sliderDataTooltipsShow('.rating-pamm-filter__slider-yield', '%');
        });
        $('.rating-pamm-filter__slider-drawdown').on('moved.zf.slider', function(event) {
            sliderDataTooltipsShow('.rating-pamm-filter__slider-drawdown', '%');
        });
        $('.rating-pamm-filter__slider-strategy').on('moved.zf.slider', function(event) {
            sliderDataTooltipsShow('.rating-pamm-filter__slider-strategy', 'д.');
        });
        $('.rating-pamm-filter__slider-commission').on('moved.zf.slider', function(event) {
            sliderDataTooltipsShow('.rating-pamm-filter__slider-commission', '%');
        });
        $('.rating-pamm-filter__slider-funds-management').on('moved.zf.slider', function(event) {
            sliderDataTooltipsShow('.rating-pamm-filter__slider-funds-management', '');
        });
        /**
         * Разные карусели
         */
        $(".x-carousel-main").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: true,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>'
        });

        $(".x-carousel-services").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true
        });

        $(".x-carousel-news").slick({
            infinite: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 7000,
            autoplayHoverPause: true
        });
        $('.x-carousel-news-link').on('click', function(e){

            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });

        /**
         * Показ любого блока по наведению на другой
         */
        var toggleLeaveTimer;
        $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function(e) {
            var selector = '#' + $(this).data('toggle-hover-dd');
            if ($(selector).length > 0)
            {
                var $toggler = $(selector);
                var className = $toggler.data('toggler-hover-dd');
                if (e.type == 'mouseenter' && !$toggler.hasClass(className))
                {
                    $toggler.addClass(className)
                }
                if (e.type == 'mouseleave' && $toggler.hasClass(className))
                {
                    toggleLeaveTimer = setTimeout(function () {$toggler.removeClass(className)}, 300);
                }
            }
        });
        $('[data-toggler-hover-dd]').on('mouseenter', function () {
            clearTimeout(toggleLeaveTimer);
        }).on('mouseleave', function () {
            var $toggler = $(this);
            var className = $toggler.data('toggler-hover-dd');
            if ($toggler.hasClass(className))
            {
                toggleLeaveTimer = setTimeout(function () {$toggler.removeClass(className)}, 300);
            }
        });
        // Резина → Адаптив в главном меню на 1280px и иконка-гамбургер
        $(document).ready(function () {
            var windowWidth = $(window).width();
            if (windowWidth <= 1280) {
                $('.expanded').removeClass('expanded');
            }
        });
        $(window).resize(function(){
            var windowWidth = $(window).width(),
                fluidRow = $('.top-menu-fluid'),
                menuPanel = $('.menu-panel'),
                mobileIcon = $('.mobile-icon');

            if(windowWidth >= 1280) {
                fluidRow.addClass('expanded');
                mobileIcon.css({display:"none"});
                menuPanel.addClass('large-7');
            } else {
                fluidRow.removeClass('expanded');
                mobileIcon.css({display:"block"});
                menuPanel.removeClass('large-7');
            }
        });
       // Подсветка форекс-разделов в главном меню
        $('.forex-link').mouseover(function () {
            $('.forex-link').addClass("active");
        }).mouseout(function () {
            $('.forex-link').removeClass("active");
        });

        // Закрытие tab-меню по клику вне области выпадающего блока
            $(document).click(function(event) {
                if ($(event.target).closest("tabs-menu__content__inner").length) return;
                $(".main-menu__item.is-active").removeClass('is-active');
                $("[aria-selected='true']").attr('aria-selected','false');
                $("[aria-hidden='false']:not(.js-usual)").attr('aria-hidden','true');
                event.stopPropagation();
            });
    });
    $('#webticker').webTicker();
})(jQuery);
