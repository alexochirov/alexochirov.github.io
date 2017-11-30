;$(document).foundation();

(function ($) {
    "use strict";
    $(function () {

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

        $(".slider-video").slick({
            infinite: true,
            dots: true,
            dotsClass: 'slider-video-dots',
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            // fade: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 7000,
            autoplayHoverPause: true
        });
        $(".slider-foto").slick({
            infinite: true,
            dots: true,
            dotsClass: 'slider-video-dots',
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            // fade: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 7000,
            autoplayHoverPause: true
        });


        // слайдер новостей https://flickity.metafizzy.co/
        if ( $('body').find('.slider-news').length >= 1 ) {
          var $carousel = $('.slider-news').flickity({
            autoPlay: 4500,
            prevNextButtons: false,
            pageDots: false,
            adaptiveHeight: true,
            setGallerySize: false
          });
          var $carouselNav = $('.slider-news__nav');
          var $carouselNavCells = $carouselNav.find('.slider-news__cell');
          $carouselNav.on( 'click', '.slider-news__cell', function( event ) {
            var index = $( event.currentTarget ).index();
            $carousel.flickity( 'select', index );
          });
          var flkty = $carousel.data('flickity');
          var navTop  = $carouselNav.position().top;
          var navCellHeight = $carouselNavCells.height();
          var navHeight = $carouselNav.height();

          $carousel.on( 'select.flickity', function() {
            // set selected nav cell
            $carouselNav.find('.slider-news__cell_selected').removeClass('slider-news__cell_selected');
            var $selected = $carouselNavCells.eq( flkty.selectedIndex )
            .addClass('slider-news__cell_selected');
            // scroll nav
            var scrollY = $selected.position().top +
            $carouselNav.scrollTop() - ( navHeight + navCellHeight ) / 2;
            $carouselNav.animate({
              scrollTop: scrollY
            });
          });
        }


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

        // focus search
        var widthWindow = $(window).width();
        function searchFormFocus(widthWindow) {
          var searchForm = $('.search-form');
          var searchFormInput = $('.search-form__input');
          var searchButtom = $('.search-form__buttom');
          var faSearch = $('.fa-search');
          searchFormInput.focusin(function(event) {
            searchFormInput.css('background-color', '#454545');
            searchFormInput.css('border-color', '#454545');
            searchButtom.css('background-color', '#454545');
            faSearch.css('color', '#fbaf1e');
          });
          searchFormInput.focusout(function(event) {
            searchFormInput.attr('style', '');
            searchButtom.attr('style', '');
            faSearch.attr('style', '');
          });
          if ( widthWindow >= 1860) {
            var searchForm = $('.search-form');
            var searchFormGroup = $('.search-form__group');
            searchForm.focusin(function(event) {
              $(this).stop().animate({left: 0}, 400);
              searchForm.css('background-color', '#454545');
              searchForm.css('width', 'auto'); //fix ms
              searchFormGroup.css('background-color', 'transparent');
            });
            searchForm.focusout(function(event) {
              $(this).stop().animate({left: 'auto'}, 0);
              searchForm.attr('style', '');
              searchFormGroup.attr('style', '');
            });
          } else {
            $('.search-form').unbind();
          }
        }
        searchFormFocus(widthWindow);
        $(window).resize(function(event) {
          widthWindow = $(window).width();
          console.log(widthWindow);
            searchFormFocus(widthWindow);
        });
        //button up
  			var buttonUp = $('<button>', {
  				type: 'button',
  				class: 'buttonUp'
  			});
  			buttonUp.appendTo($('.wrap-arrow-up'));
  			var buttonUpBreakpont = 300;
  			var activateButtonUp = 'buttonUp_active';
  			$(window).on('scroll load', function(event) {
  				event.preventDefault();
  				if ( $(this).scrollTop()>buttonUpBreakpont ) {
  					buttonUp.fadeIn(300);
  				} else {
  					buttonUp.fadeOut(300);
  				}
  			});
  			buttonUp.on('click', function(event) {
  				$('html, body').animate({
  					scrollTop: 0
  				}, 500);
  			});

        // переключатели
        $(".aside-games-panel-switcher__input").removeAttr("checked");
        $(".aside-games-panel-switcher__input").on("change", function(e) {
            e.preventDefault();
            if ($(this).prop('checked')) {
                $(this).parents(".tabs-panel").find(".switch-content-left").hide();
                $(this).parents(".tabs-panel").find(".switch-content-right").show();
                $(this).parents(".callout").find(".switch-content-left").hide();
                $(this).parents(".callout").find(".switch-content-right").show();
                $(this).parents(".team-static").find(".switch-content-left").hide();
                $(this).parents(".team-static").find(".switch-content-right").show();
                Foundation.reInit('equalizer');
            } else {
                $(this).parents(".tabs-panel").find(".switch-content-left").show();
                $(this).parents(".tabs-panel").find(".switch-content-right").hide();
                $(this).parents(".callout").find(".switch-content-left").show();
                $(this).parents(".callout").find(".switch-content-right").hide();
                $(this).parents(".team-static").find(".switch-content-left").show();
                $(this).parents(".team-static").find(".switch-content-right").hide();
                Foundation.reInit('equalizer');
            }
        });
        function functionCheckSwitch(element, element2) {
          $(element).each(function(index, el) {
            if ( $(this).prop('checked') ) {
              $(this).parents(".live-feeds").find(element2).show();
            } else {
              $(this).parents(".live-feeds").find(element2).hide();
            }
          });
        }

        functionCheckSwitch("#live-feeds__switcher", ".switch-content-news");
        functionCheckSwitch("#live-feeds__switcher2", ".switch-content-video");
        functionCheckSwitch("#live-feeds__switcher3", ".switch-content-photo");
        functionCheckSwitch("#live-feeds__switcher4", ".switch-content-history");
        // functionCheckSwitch(".aside-games-panel-switcher__input-live-feeds", ".switch-content-news");
        // functionCheckSwitch(".aside-games-panel-switcher__input-live-feeds", ".switch-content-video");
        // functionCheckSwitch(".aside-games-panel-switcher__input-live-feeds", ".switch-content-photo");
        // functionCheckSwitch(".aside-games-panel-switcher__input-live-feeds", ".switch-content-history");

        $("#live-feeds__switcher").on("change", function(e) {
            e.preventDefault();
            functionCheckSwitch( $(this), ".switch-content-news");
        });
        $("#live-feeds__switcher2").on("change", function(e) {
            e.preventDefault();
            functionCheckSwitch( $(this), ".switch-content-video");
        });
        $("#live-feeds__switcher3").on("change", function(e) {
            e.preventDefault();
            functionCheckSwitch( $(this), ".switch-content-photo");
        });
        $("#live-feeds__switcher4").on("change", function(e) {
            e.preventDefault();
            functionCheckSwitch( $(this), ".switch-content-history");
        });

        // переключатель клубов
        $(".aside-games-panel-switcher-club__label").removeAttr("checked");
        $("#switcher__input-club").on("change", function(e) {
            e.preventDefault();
            if ($(this).prop('checked')) {
              $(this).parents(".tabs-panel").find(".switch-club-neftehimik").hide();
              $(this).parents(".tabs-panel").find(".switch-club-reaktor").show();
            } else {
              $(this).parents(".tabs-panel").find(".switch-club-neftehimik").show();
              $(this).parents(".tabs-panel").find(".switch-club-reaktor").hide();
            }
        });
        $("#switcher__input-club-next").on("change", function(e) {
            e.preventDefault();
            if ($(this).prop('checked')) {
              $(this).parents(".tabs-panel").find(".switch-club-neftehimik").hide();
              $(this).parents(".tabs-panel").find(".switch-club-reaktor").show();
            } else {
              $(this).parents(".tabs-panel").find(".switch-club-neftehimik").show();
              $(this).parents(".tabs-panel").find(".switch-club-reaktor").hide();
            }
        });

        // фото играков team-static
        $('.hockey-player-cell__item-name').on('click', function(event) {
          event.preventDefault();
          var indexEl = $(this).parent().index();
          $(this).closest('.hockey-player-cell__inner').find('.hockey-player-cell__item-name').removeClass('hockey-player-cell__item-name_select');
          $(this).addClass('hockey-player-cell__item-name_select');
          $(this).closest('.cell').find('.hockey-player-team__img').hide();
          $(this).closest('.cell').find('.hockey-player-team__img').eq(indexEl-1).show();
          $(this).closest('.cell').find('.hockey-player-team__num').hide();
          $(this).closest('.cell').find('.hockey-player-team__num').eq(indexEl-1).show();
          Foundation.reInit('equalizer');
        });

			$("a[data-fancybox]").fancybox({
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'titlePosition' 	: 'over',
				'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
					return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
				}
			});




    });
})(jQuery);

/*
 * функция вставки виджетов
 * */
function addWidgetInBlock(id, content, cbfunction, idcb) {
    $('#' + id).replaceWith(content);
}
