$(document).foundation();

(function($) {
    "use strict";
    $(function() {

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
            prevArrow: '<i class="slick-prev"> </i>',
            nextArrow: '<i class="slick-next"> </i>'
        });
        //begin of corrector page count (block .hit)
        var allPageCat = $('.corrector__slide').length;
        $('.js-allPageCat').text(allPageCat);

        $(".hit__input").keyup(function() {
            var inputNumber = $(this).val();
            if (inputNumber > allPageCat) {
                inputNumber = allPageCat;
            }
            if (!inputNumber) {
                return;
            }
            if (inputNumber == 0) {
                return;
            }
            $('.corrector').slick('slickGoTo', inputNumber - 1);
        });



        $(".corrector").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: '<i class="slick-prev"> </i>',
            nextArrow: '<i class="slick-next"> </i>',
            responsive: [{
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });

        $(".hit__next").click(function() {
            $('.corrector').slick('slickNext');
        });
        $(".hit__prev").click(function() {
            $('.corrector').slick('slickPrev');
        });

        $('.corrector').on('afterChange', function(event, slick, currentSlide) {
            $('.js-leftPageCat').text(currentSlide + 1);
            $('.js-rightPageCat').text(currentSlide + 2);
        });
        //end of corrector page count (block .hit)



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

        function sliderImg() {
            var img = $('.product__slide.slick-current img').attr('src');
            var imgPrev = $('.product__slide.slick-current').prev().find('img').attr('src');

            var imgNext = $('.product__slide.slick-current').next().find('img').attr('src');
            $('.product .slick-dots li.slick-active button').html('<img src="' + img + '" alt=""/>');

            $('.product .slick-dots li.slick-active button').html('<img src="' + img + '" alt=""/>');
            $('.product .slick-dots li.slick-active').prev().find('button').html('<img src="' + imgPrev + '" alt=""/>');
            $('.product .slick-dots li.slick-active').next().find('button').html('<img src="' + imgNext + '" alt=""/>');
        }
        $('.product').on('init', function(event, slick) {
            sliderImg();
        });
        $('.product').on('afterChange', function(event, slick, currentSlide) {
            sliderImg();
        });
        $('.product').slick({
            infinite: true,
            dots: true,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<div class="product__arrow product__prev"> <svg width="67"  viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" fill="#dfdfdf"/></svg> </div>',
            nextArrow: '<div class="product__arrow product__next"> <svg width="67" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" fill="#dfdfdf"/></svg> </div>'
        });
        $('.product').slick('slickNext');



        $('.x-carousel-news-link').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });

        //begin of filter close and action when choosing



        $('.js-reset-filter').click(function() {
            $(this).closest('.dropdown-pane').find('input').prop('checked', false);
        });

        $('.js-check-filter').click(function() {
            $(this).closest('.dropdown-pane').find('input').prop('checked', true);
        });
        $('.js-apply-filter').click(function() {
            var $pane = $(this).parent('.dropdown-pane');
            var $inputChecked = $pane.find('input:checked');
            var numOfActiveFilters = $inputChecked.length;
            var idOfDropdown = $pane.attr('id');
            var $buttonCurrent = $('[data-toggle^="' + idOfDropdown + '"]');

            if ($buttonCurrent.attr('data-array') == undefined) {
                $pane.removeClass('is-open');
                return;
            }
            var arrayCase = $buttonCurrent.attr('data-array').split(',');

            for (var i = 0; i < 40; i++) {
                if (arrayCase[i] == undefined) {
                    arrayCase[i] = arrayCase[i - 1];
                }
            }

            if (numOfActiveFilters == 0) {
                $buttonCurrent.removeClass('js-check').text(arrayCase[0]);
                $pane.removeClass('is-open');

                $buttonCurrent.removeClass('js-close');
                return;
            } else {
                $buttonCurrent.addClass('js-close');
                var flagIfButtonExist = $buttonCurrent.next().hasClass("rage");
                if (!flagIfButtonExist) {
                    $('<span class="button  hollow  rage">&times;</span>').insertAfter($buttonCurrent);
                }


                $('.rage').unbind();
                $('.rage').bind('click', function() {
                    var $buttonCurrent = $(this).prev('.material');
                    $buttonCurrent.removeClass('js-check').text(arrayCase[0]);

                    $buttonCurrent.removeClass('js-close');
                    $(this).remove();

                });

            }

            var beginOfTextInLabel = $inputChecked.parent('label').html().indexOf('>') + 1;
            var labelText = $inputChecked.parent('label').html().slice(beginOfTextInLabel);


            if (numOfActiveFilters == 1) {
                $buttonCurrent.addClass('js-check').text(arrayCase[0]);
                $('<span class="badge js-active">' + labelText + '</span>').appendTo($buttonCurrent);
                $pane.removeClass('is-open');
            } else {
                $buttonCurrent.removeClass('js-check').text(numOfActiveFilters + " " + arrayCase[numOfActiveFilters - 1]).find('.badge').removeClass('js-active').text('');
                $pane.removeClass('is-open');

            }
        });

        function closeDropdownPaneWhenOutside(event) {
            if (!$(event.target).closest('.dropdown-pane').length) {
                $('.dropdown-pane').removeClass('is-open');
                $(document).unbind('click', closeDropdownPaneWhenOutside);
            }
        }

        $('#catalog-filter-dropdown-price').on('show.zf.dropdown', function() {
            $(document).bind('click', closeDropdownPaneWhenOutside);
        });

        //end of filter close and action when choosing





    });
})(jQuery);
