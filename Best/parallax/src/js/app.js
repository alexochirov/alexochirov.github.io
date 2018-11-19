;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {
    //begin of parallax
    function parallaxMy() {
      $(window).scroll(function() {
        var windowScrollY = window.pageYOffset;
        var $elements = $('[data-depth]');

        $elements.each(function() {
          var koeff = $(this).data('depth');
          var offsetOfCurrentElement = $(this).offset().top;

          var offsetAdditional = $(this).data('offset');
          if (!offsetAdditional) {
            offsetAdditional = 0;
          }
          var topOffset = (windowScrollY - offsetOfCurrentElement) * koeff + offsetAdditional;

          $(this).attr('style', 'transform: translateY(' + topOffset + 'px);');
        });
      });
    }

    parallaxMy();

    //end of parallax
    //begin of equalize .js-head
    function setHeight2() {
      for (var i = 1; i < 5; i++) {
        $('.js-head' + i).css('height', 'auto');
        var maxHeight2 = Math.max.apply(null, $(".js-head" + i).map(function() {
          return $(this).height();
        }).get());
        $('.js-head' + i).height(maxHeight2);

      }


    }
    $(window).on('load', function() {

      setHeight2();
    });
    $(window).on('resize', function() {

      setHeight2();
    });
    //end of equalize .js-head
    //begin of viewport-checker animation of blocks while scrolling page
    jQuery(document).ready(function() {
      jQuery('.js-animate').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp fadeInUp',
        offset: 100
      });
      jQuery('.js-animate-second').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInUp fadeInUp',
        offset: 200
      });
      // jQuery('.js-spec-animate').addClass("hidden").viewportChecker({
      //   classToAdd: 'visible animated bounceInUp fadeInUp',
      //   offset: 200,
      //   callbackFunction: function(elem, action) {
      //     setTimeout(function() {
      //
      //     }, 1000);
      //   },
      // });

    });
    //end of viewport-checker animation of blocks while scrolling page
    //begin of replace img with inline svg
    $(document).ready(function() {

      $('.js-inline-svg').each(function() {

        var $img = $(this),
          imgURL = $img.attr('src'),
          imgID = $img.attr('id');

        $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');
          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }

          $svg = $svg.removeAttr('xmlns:a');
          $img.replaceWith($svg);
        }, 'xml');
      });
    });
    //end of replace img with inline svg
    //begin of .quant input activity
    $('.quant__plus').on('click', function() {
      const $input = $(this).closest('.quant').find('.quant__input');
      let currentNum = Math.max(+$input.val(), 0);
      currentNum++;
      $input.val(currentNum);
    });
    $('.quant__minus').on('click', function() {
      const $input = $(this).closest('.quant').find('.quant__input');
      let currentNum = Math.max(+$input.val(), 0);
      if (currentNum < 2) {
        return;
      }
      currentNum--;
      $input.val(currentNum);
    });
    //end of .quant input activity
    //begin of close .dd__content when click outside
    $(document).mouseup(function(e) {
      const $div = $("#location,[data-toggle='location']");
      if (!$div.is(e.target) && $div.has(e.target).length === 0) {
        $div.removeClass('dd_show');
      }
    });
    //end of close .dd__content when click outside

    /** Разные карусели */
    $(".carousel-main").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: true,
      swipeToSlide: true,
      prevArrow: '<span><svg class="svg-inline--fa fa-angle-left fa-w-8 slick-prev fa-4x" aria-hidden="true" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span>',
      nextArrow: '<span><svg class="svg-inline--fa fa-angle-right fa-w-8 slick-next fa-4x" aria-hidden="true" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span>'
    });

    $(".carousel-services").slick({
      infinite: true,
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      autoplayHoverPause: true
    });

    $(".carousel-news").slick({
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 7000,
      autoplayHoverPause: true
    });
    $('.carousel-news-anchor').on('click', function(e) {
      e.preventDefault();
      const $this = $(this),
        index = $this.closest('.carousel-news-links').find('.carousel-news-anchor').index($this);
      $('.carousel-news').slick('slickGoTo', index);
    });

    /** Показ любого блока по наведению на другой */
    let toggleLeaveTimer;
    $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function(e) {
      const $toggler = $('#' + $(this).data('toggle-hover-dd'));
      if ($toggler.length > 0) {
        const className = $toggler.data('toggler-hover-dd');
        if (e.type === 'mouseenter' && !$toggler.hasClass(className)) {
          $toggler.addClass(className);
        }
        if (e.type === 'mouseleave' && $toggler.hasClass(className)) {
          toggleLeaveTimer = setTimeout(() => {
            $toggler.removeClass(className);
          }, 300);
        }
      }
    });
    $('[data-toggler-hover-dd]').on('mouseenter', function() {
      clearTimeout(toggleLeaveTimer);
    }).on('mouseleave', function() {
      const $toggler = $(this);
      const className = $toggler.data('toggler-hover-dd');
      if ($toggler.hasClass(className)) {
        toggleLeaveTimer = setTimeout(() => {
          $toggler.removeClass(className);
        }, 300);
      }
    });
  });
})(jQuery);
