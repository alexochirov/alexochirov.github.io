;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {
    //begin of .num activity
    $('.num__plus').click(function() {
      var $input = $(this).closest('.num').find('.num__input');
      var val = +$input.val();

      $input.val(++val);
    });
    $('.num__minus').click(function() {
      var $input = $(this).closest('.num').find('.num__input');
      var val = +$input.val();
      if (val > 1) {
        $input.val(--val);
      }


    });
    //end of .num activity
    //begin of .cat__item mousehover class
    $('.cat__item').mouseenter(function() {
      $(this).find('>.cat__link').addClass('cat__link_active');
    }).mouseleave(function() {
      $(this).find('>.cat__link').removeClass('cat__link_active');
    });
    //end of .cat__item mousehover class
    //begin of equalize .product__title in .market__slide
    function setHeight() {
      $('.product__title').css('height', 'auto');
      var maxHeight = Math.max.apply(null, $(".product__title").map(function() {
        return $(this).height();
      }).get());
      $('.product__title').height(maxHeight);
    }
    $(document).ready(function() {

      setHeight();
    });
    $(window).on('resize', function() {

      setHeight();
    });
    //end of equalize .product__title in .market__slide
    //begin of .market slider
    $(".market").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<div class="slick-prev"><i class=" fa fa-angle-left fa-3x"> </i></div>',
      nextArrow: '<div class="slick-next"><i class=" fa fa-angle-right fa-3x"> </i></div>',
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
        }
      }, {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      }]
    });
    //end of .market slider
    //begin of .program slider
    $(".program").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<div class="slick-prev"><i class=" fa fa-angle-left fa-3x"> </i></div>',
      nextArrow: '<div class="slick-next"><i class=" fa fa-angle-right fa-3x"> </i></div>'
    });
    //end of .program slider
    /**
     * Разные карусели
     */


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
