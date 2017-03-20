;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        /**
         * Разные карусели
         */
        //begin of js-list-sort Sortable plugin

        var list = document.getElementById("js-list-sort");
        if (typeof(list) != 'undefined' && list != null) {
            Sortable.create(list);
        }
        //end of js-list-sort Sortable plugin
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
        $('.x-carousel-news-link').on('click', function(e) {

            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });

        //begin of .cont__span equalize
        $('.visit').each(function() {

            var arrayWidth = [];
            $(this).find('.cont__span').each(function() {
                arrayWidth.push($(this).width());

            });
            var maxWidth = Math.max.apply(null, arrayWidth);
            if (maxWidth > 0) {
                $(this).find('.cont__span').width(maxWidth);
            }
        });
        //end of .cont__span equalize
        //begin of visit hide function
        $('.js-visit-toggle').click(function() {
            $('#visit').toggleClass('hide');
        });
        $('.js-country-toggle').click(function() {
            $('#country').toggleClass('hide');
        });
        //end of visit hide function
        /**
         * Показ любого блока по наведению на другой
         */
        var toggleLeaveTimer;
        $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function(e) {
            var selector = '#' + $(this).data('toggle-hover-dd');
            if ($(selector).length > 0) {
                var $toggler = $(selector);
                var className = $toggler.data('toggler-hover-dd');
                if (e.type == 'mouseenter' && !$toggler.hasClass(className)) {
                    $toggler.addClass(className)
                }
                if (e.type == 'mouseleave' && $toggler.hasClass(className)) {
                    toggleLeaveTimer = setTimeout(function() {
                        $toggler.removeClass(className)
                    }, 300);
                }
            }
        });
        $('[data-toggler-hover-dd]').on('mouseenter', function() {
            clearTimeout(toggleLeaveTimer);
        }).on('mouseleave', function() {
            var $toggler = $(this);
            var className = $toggler.data('toggler-hover-dd');
            if ($toggler.hasClass(className)) {
                toggleLeaveTimer = setTimeout(function() {
                    $toggler.removeClass(className)
                }, 300);
            }
        });

    });
})(jQuery);
