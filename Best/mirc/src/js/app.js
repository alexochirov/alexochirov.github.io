;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {
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
    //begin of equalize .voyage in .action__slide
    function setHeight() {
      $('.voyage').css('height', 'auto');
      var maxHeight = Math.max.apply(null, $(".voyage").map(function() {
        return $(this).height();
      }).get());
      $('.voyage').height(maxHeight);
    }
    $(window).on('load', function() {

      setHeight();
    });
    $(window).on('resize', function() {

      setHeight();
    });
    //end of equalize .voyage in .action__slide
    /**
     * Разные карусели
     */
    $(".action").slick({
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
      prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-prev"  viewBox="0 0 24 42"><defs><path id="wcjma" d="M358.7 1725.68a1 1 0 1 1-1.4 1.41l-18.4-18.38a1 1 0 0 1 0-1.42l18.4-18.38a1 1 0 0 1 1.4 1.41L341.04 1708z"/></defs><g><g transform="translate(-337 -1687)"><use  xlink:href="#wcjma"/></g></g></svg>',
      nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-next"  viewBox="0 0 24 42"><defs><path id="wcjma" d="M358.7 1725.68a1 1 0 1 1-1.4 1.41l-18.4-18.38a1 1 0 0 1 0-1.42l18.4-18.38a1 1 0 0 1 1.4 1.41L341.04 1708z"/></defs><g><g transform="translate(-337 -1687)"><use  xlink:href="#wcjma"/></g></g></svg>',
      responsive: [{
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 840,
        settings: {
          slidesToShow: 2,
        }
      }, {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }]
    });
    $(".passage").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-prev"  viewBox="0 0 24 42"><defs><path id="wcjma" d="M358.7 1725.68a1 1 0 1 1-1.4 1.41l-18.4-18.38a1 1 0 0 1 0-1.42l18.4-18.38a1 1 0 0 1 1.4 1.41L341.04 1708z"/></defs><g><g transform="translate(-337 -1687)"><use  xlink:href="#wcjma"/></g></g></svg>',
      nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-next"  viewBox="0 0 24 42"><defs><path id="wcjma" d="M358.7 1725.68a1 1 0 1 1-1.4 1.41l-18.4-18.38a1 1 0 0 1 0-1.42l18.4-18.38a1 1 0 0 1 1.4 1.41L341.04 1708z"/></defs><g><g transform="translate(-337 -1687)"><use  xlink:href="#wcjma"/></g></g></svg>',
      responsive: [{
        breakpoint: 960,
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

    $(".x-carousel-media-gallery").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-prev"  viewBox="0 0 24 42"><defs><path id="wcjma" d="M358.7 1725.68a1 1 0 1 1-1.4 1.41l-18.4-18.38a1 1 0 0 1 0-1.42l18.4-18.38a1 1 0 0 1 1.4 1.41L341.04 1708z"/></defs><g><g transform="translate(-337 -1687)"><use  xlink:href="#wcjma"/></g></g></svg>',
      nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-next"  viewBox="0 0 24 42"><defs><path id="wcjma" d="M358.7 1725.68a1 1 0 1 1-1.4 1.41l-18.4-18.38a1 1 0 0 1 0-1.42l18.4-18.38a1 1 0 0 1 1.4 1.41L341.04 1708z"/></defs><g><g transform="translate(-337 -1687)"><use  xlink:href="#wcjma"/></g></g></svg>',
      responsive: [{
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
        }
      }, {
        breakpoint: 840,
        settings: {
          slidesToShow: 2,
        }
      }, {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }]
    });

    $(".x-carousel-advantages-gallery").slick({
      infinite: true,
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true
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

    function setHeight() {
      $('.card-news__section').css('height', 'auto');
      var maxHeight = Math.max.apply(null, $(".card-news__section").map(function() {
        return $(this).height();
      }).get());
      $('.card-news__section').height(maxHeight);
    }
    $(window).on('load', function() {

      setHeight();
    });
    $(window).on('resize', function() {

      setHeight();
    });



  });
})(jQuery);
