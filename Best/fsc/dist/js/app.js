"use strict";

;
$(document).foundation();

(function ($) {
  "use strict";

  $(function () {
    //begin of fix resize .stage slider
    //end of fix resize .stage slider
    //begin of fix .stage slider preserve current slide position, when modal is closed
    var currentSlideNum;
    $('[data-reveal]').on('open.zf.reveal', function () {
      currentSlideNum = $('.stage').slick('slickCurrentSlide');
    });
    $('.stage').click(function () {
      currentSlideNum = $('.stage').slick('slickCurrentSlide');
    });
    $('[data-reveal]').on('closed.zf.reveal', function () {
      $('.stage').slick('slickGoTo', currentSlideNum, true);
    }); //end of fix .stage slider preserve current slide position, when modal is closed
    //begin of port activity

    $('.js-blocks').fadeOut();
    $(".lot,.site__faq").click(function () {
      var selectorChosen = $(this).data('toggle');
      $('.js-main,.js-blocks').slideUp();
      $('.' + selectorChosen).slideDown();
      setTimeout(function () {
        Foundation.reInit('equalizer');
      }, 100);
    }); //end of port activity
    //begin of .menu-top__link activity

    $('.menu-top__link').click(function () {
      var numSlide = $(this).data('slide');
      $('.field').slick('slickGoTo', numSlide);
    }); //end of .menu-top__link activity
    //begin of equalize .js-eq

    function setHeight() {
      for (var i = 1; i < 10; i++) {
        $('.js-eq' + i).css('height', 'auto');
        var maxHeight2 = Math.max.apply(null, $(".js-eq" + i).map(function () {
          return $(this).height();
        }).get());
        $('.js-eq' + i).height(maxHeight2);
      }
    }

    $('.slick-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      setHeight();
    });
    $(document).ready(function () {
      setHeight();
      $('body').addClass('js-onload');
    });
    $(window).on('load', function () {
      setHeight();
    });
    window.addEventListener ? window.addEventListener("load", setHeight(), false) : window.attachEvent && window.attachEvent("onload", setHeight());
    $(window).on('resize', function () {
      setHeight();
    }); //end of equalize .js-eq
    //begin of header hamb activity on the mobile phones

    $('[data-toggle="js-menu"]').click(function () {
      $('.js-menu').toggleClass('hide-for-small-only');
    }); //end of header hamb activity on the mobile phones
    //begin of .vault select imitation

    $('.vault__input').click(function () {
      $(this).toggleClass('vault__input_active');
      $(this).closest('.vault').find('.vault__block').toggleClass('vault__block_active');
    });
    $('.vault__item').click(function () {
      var text = $(this).text();
      var numData = $(this).data('num');
      $(this).closest('.vault').find('.vault__input').removeClass('vault__input_active').text(text);
      $(this).closest('.vault__block').removeClass('vault__block_active');
      $('.site__flow_first').slideDown();
      $('.site__flow_second').fadeOut();
    });
    $(document).mouseup(function (e) {
      var $div = $(".vault");

      if (!$div.is(e.target) && $div.has(e.target).length === 0) {
        $div.find('.vault__input').removeClass('vault__input_active');
        $div.find('.vault__block').removeClass('vault__block_active');
      }
    }); //end of .vault select imitation
    //begin of .site__flow activity

    $('.site__flow_second').slideUp();
    $('[data-toggle="blocks"]').click(function () {
      $('.site__flow_first').slideUp();
      $('.site__flow_second').fadeIn();
    }); //end of .site__flow activity
    //begin of .field slider

    var $slider = $('.field:not(".field_one")');

    if ($slider.length) {
      var alignArrows = function alignArrows() {
        var heightDots = $slider.find('.slick-dots').height();
        var topOffset = heightDots / 2 + 62;
        $slider.find('.slick-prev').attr('style', 'top:calc(50% - ' + topOffset + 'px);');
        $slider.find('.slick-next').attr('style', 'bottom:calc(50% - ' + topOffset + 'px);');
      };

      $(document).ready(function () {
        alignArrows();
      });
      $(window).resize(function () {
        alignArrows();
      });
      $slider.slick({
        infinite: true,
        dots: true,
        arrows: true,
        vertical: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        touchThreshold: 10,
        fade: false,
        autoplayHoverPause: true,
        swipe: false,
        prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="slick-prev" viewBox="0 0 37 22"><defs><path id="7y4va" d="M263.004 454.007l18.495-11.91 18.497 11.91v-6.103L281.5 431.993l-18.495 15.911z"/></defs><g><g transform="translate(-263 -432)"><use fill="#fff" xlink:href="#7y4va"/></g></g></svg>',
        nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="slick-next"  viewBox="0 0 37 22"><defs><path id="xk0oa" d="M263.004 693.993l18.495 11.91 18.497-11.91v6.103L281.5 716.007l-18.495-15.911z"/></defs><g><g transform="translate(-263 -694)"><use fill="#fff" xlink:href="#xk0oa"/></g></g></svg>',
        responsive: [{
          breakpoint: 960,
          settings: {
            arrows: false,
            dots: false
          }
        }]
      });
      var timeOfAnimation = 450;
      $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.site').slick('slickGoTo', nextSlide);
        var $blockThatAnimate = $('.field .slick-list');
        $blockThatAnimate.velocity({
          "scale": 1.5
        }, timeOfAnimation);
        setTimeout(function () {
          $blockThatAnimate.velocity({
            "scale": 1
          }, timeOfAnimation);
        }, timeOfAnimation);
      });
    }

    $('.site').slick({
      infinite: true,
      dots: false,
      arrows: false,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      touchThreshold: 10,
      fade: true,
      autoplayHoverPause: true,
      swipe: false
    }); // $slider.slick('slickGoTo', 2);
    //end of .field slider
    //begin of .aloft__link

    function showAndHideBlock() {
      var offsetPos = $(window).scrollTop() - window.innerHeight;

      if (offsetPos > 0) {
        $('.aloft').addClass('js-show');
      } else {
        $('.aloft').removeClass('js-show');
      }
    }

    $(window).scroll(function () {
      showAndHideBlock();
    });
    $('.aloft').click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    }); //end of .aloft__link
    //begin of .stage slider

    $('.stage').slick({
      infinite: true,
      dots: false,
      arrows: false,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      swipe: true
    });
    $(document).ready(function () {
      stageSliderFixOnLowDisplays();
    });
    $(window).resize(function () {
      stageSliderFixOnLowDisplays();
    });

    function stageSliderFixOnLowDisplays() {
      if ($(window).height() < 770 && $(window).width() > 1000) {
        $(".stage").slick("slickSetOption", "slidesToShow", 3);
        $(".stage").slick("slickGoTo", 1, true);
      } else {
        if ($(window).height() > 770 && $(window).width() > 1300) {
          $(".stage").slick("slickSetOption", "slidesToShow", 5);
          $(".stage").slick("slickGoTo", 1, true);
        } else {
          if ($(window).width() < 1300 && $(window).width() > 1040) {
            $(".stage").slick("slickSetOption", "slidesToShow", 4);
            $(".stage").slick("slickGoTo", 1, true);
          } else {
            if ($(window).width() < 1040 && $(window).width() > 720) {
              $(".stage").slick("slickSetOption", "slidesToShow", 2);
              $(".stage").slick("slickGoTo", 1, true);
            } else {
              $(".stage").slick("slickSetOption", "slidesToShow", 1);
              $(".stage").slick("slickGoTo", 1, true);
            }
          }
        }
      }
    }

    $('.site__chevron_prev').click(function () {
      $(this).closest('.site__main').next().slick('slickPrev');
    });
    $('.site__chevron_next').click(function () {
      $(this).closest('.site__main').next().slick('slickNext');
    }); //end of .stage slider
    //begin of .quant input activity

    $('.quant__plus').on('click', function () {
      var $input = $(this).closest('.quant').find('.quant__input');
      var currentNum = Math.max(+$input.val(), 0);
      currentNum++;
      $input.val(currentNum);
    });
    $('.quant__minus').on('click', function () {
      var $input = $(this).closest('.quant').find('.quant__input');
      var currentNum = Math.max(+$input.val(), 0);

      if (currentNum < 2) {
        return;
      }

      currentNum--;
      $input.val(currentNum);
    }); //end of .quant input activity
    //begin of close .dd__content when click outside

    $(document).mouseup(function (e) {
      var $div = $("#location,[data-toggle='location']");

      if (!$div.is(e.target) && $div.has(e.target).length === 0) {
        $div.removeClass('dd_show');
      }
    }); //end of close .dd__content when click outside

    /** Разные карусели */

    $(".carousel").slick({
      infinite: true,
      dots: true,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      swipeToSlide: true,
      prevArrow: '<span><svg class="svg-inline--fa fa-angle-left fa-w-8 slick-prev fa-4x" aria-hidden="true" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span>',
      nextArrow: '<span><svg class="svg-inline--fa fa-angle-right fa-w-8 slick-next fa-4x" aria-hidden="true" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span>'
    });
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
    $('.carousel-news-anchor').on('click', function (e) {
      e.preventDefault();
      var $this = $(this),
          index = $this.closest('.carousel-news-links').find('.carousel-news-anchor').index($this);
      $('.carousel-news').slick('slickGoTo', index);
    });
    /** Показ любого блока по наведению на другой */

    var toggleLeaveTimer;
    $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function (e) {
      var $toggler = $('#' + $(this).data('toggle-hover-dd'));

      if ($toggler.length > 0) {
        var className = $toggler.data('toggler-hover-dd');

        if (e.type === 'mouseenter' && !$toggler.hasClass(className)) {
          $toggler.addClass(className);
        }

        if (e.type === 'mouseleave' && $toggler.hasClass(className)) {
          toggleLeaveTimer = setTimeout(function () {
            $toggler.removeClass(className);
          }, 300);
        }
      }
    });
    $('[data-toggler-hover-dd]').on('mouseenter', function () {
      clearTimeout(toggleLeaveTimer);
    }).on('mouseleave', function () {
      var $toggler = $(this);
      var className = $toggler.data('toggler-hover-dd');

      if ($toggler.hasClass(className)) {
        toggleLeaveTimer = setTimeout(function () {
          $toggler.removeClass(className);
        }, 300);
      }
    });
  });
})(jQuery);