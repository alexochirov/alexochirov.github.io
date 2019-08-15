;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {
  
    //begin of fix parallax when click on tabs
    $('.tabs-title').click(function() {
      var scrollOffset = $(window).scrollTop();
      $(window).scrollTop(--scrollOffset);
    });
    //end of fix parallax when click on tabs
    //begin of .header__src activity show/hide menu with search form
    $(document).click(function(e) {
      if (e.target.closest(".header__search")) {
        $('.header__search').toggleClass('hide');
        $('.header__src').toggleClass('js-open');
      }
      if (!(e.target.closest(".header__search") || e.target.closest('.header__src'))) {
        $('.header__search').addClass('hide');
        $('.header__search_prime').removeClass('hide');
        $('.header__src').removeClass('js-open');
      }
    });
    //end of .header__src activity show/hide menu with search form
    //begin of .header__hamb activity
    $(document).click(function(e) {
      if (e.target.closest(".header__hamb")) {
        $(e.target).closest('.header__hamb').toggleClass('js-open');
        $('.offer').toggleClass('show-for-large');
      } else {
        $('.header__hamb').removeClass('js-open');
        $('.offer').addClass('show-for-large');

      }
    });
    //end of .header__hamb activity
    //begin of parallax

    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this,
          args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
    var myEfficientFn = debounce(function() {

      $('.parallax-img_animate').each(function() {
        $(this).css('margin-top', 0);
        var currentPos = $(this).offset().top;
        var diffTranslateParallax = (window.scrollY - currentPos) * 0.16;
        $(this).css('margin-top', diffTranslateParallax);
      });
    }, 10);
    window.addEventListener('scroll', myEfficientFn);
    //end of parallax
    //begin of replace svg img with inline svg
    function replaceImgForSvg() {
      jQuery('img.js-inl-svg').each(function() {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Add replaced image's ID to the new SVG
          if (typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if (typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass + ' replaced-svg');
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);

        }, 'xml');

      });
    }
    $(document).ready(function() {
      replaceImgForSvg();
    });

    //end of replace svg img with inline svg
    //begin of fonts loading
    const loadFont = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let css = xhr.responseText;
          css = css.replace(/}/g, 'font-display: swap; }');

          const head = document.getElementsByTagName('head')[0];
          const style = document.createElement('style');
          style.appendChild(document.createTextNode(css));
          head.appendChild(style);



        }

      };
      xhr.send();
    }
    //if you need google fonts - use this function
    // loadFont('https://fonts.googleapis.com/css?family=Ubuntu:300,300i,400,400i,500,500i,700,700i&subset=cyrillic,cyrillic-ext,latin-ext');


    //begin of choose city in .cities block
    const pathToJson = './json/ajax.json';
    /* links */
    $('#cities-main-window-list').on('click', 'a', function(e) {
      e.preventDefault();

      const link = $(this).attr('href');

      $.ajax({
        method: 'GET',
        url: pathToJson,
        data: {
          action: 'setCity',
          link: link
        },
        success: function(response) {
          let res;
          typeof response == 'string' ? res = $.parseJSON(response) : res = response;
          if (res.success) {
            document.location = link;

          }
        }
      });
    });
    const staticCities = $('#cities-main-window-list').html();
    const container = $('#cities-main-window-list');

    $('#searchCities').on('keyup', function() {
      const data = $(this)[0].value;
      const name = $(this).attr('name');
      if (data != '') {
        $.ajax({
          method: 'GET',
          url: pathToJson,
          data: {
            action: name,
            data: data,
            count: 16,
          },
          success: function(response) {
            let res;
            typeof response == 'string' ? res = $.parseJSON(response) : res = response;
            if (res.success) {
              container.empty();
              for (var i = 0; i < res.rows.length; i++) {
                container.append("<a href=" + res.rows[i].link + " class='cities-main-window-list-link'>" + res.rows[i].name + "</a>");
              }
            } else {
              container.empty();
              container.append("<p class='callout warning cities-message'>Ничего не найдено</p>");
            }
          }
        });
      } else {
        container.empty();
        container.append(staticCities);
      }
    });
    /* popup of the region */
    const modalRegion = $('#cities-container-region');
    const overlay = $('.overlay');
    /* Ajax окна региона  */
    $.ajax({
      method: 'GET',
      url: pathToJson,
      data: {
        action: 'checkIp',
      },
      success: function(response) {
        let res;
        typeof response == 'string' ? res = $.parseJSON(response) : res = response;
        if (res.success) {
          overlay.addClass('body-overlay');
          modalRegion.fadeIn();
        }
      }

    });


    const modalCities = $('#cities-container');

    /* choose buttons */
    $('#button-ok').on('click', function(e) {
      e.preventDefault();
      $.ajax({
        method: 'GET',
        url: pathToJson,
        data: {
          action: 'saveCity',
        },
        success: function(response) {

          let res;
          typeof response == 'string' ? res = $.parseJSON(response) : res = response;
          if (res.success) {
            modalRegion.fadeOut();
            overlay.removeClass('body-overlay');
          }
        }
      });
    });
    $('#button-another').on('click', function(e) {
      e.preventDefault();
      modalRegion.fadeOut();
      modalCities.fadeIn();
      $("#searchCities").focus();
    });

    $('#main-window-close').on('click', function() {
      modalCities.fadeOut();
      overlay.removeClass('body-overlay');
    });

    $('#cities-select').on('click', function() {
      modalCities.fadeIn();
      $("#searchCities").focus();
    });

    $(document).on('keyup', function(e) {
      if (e.keyCode === 27 && modalCities.is(':visible')) {
        modalCities.fadeOut();
        overlay.removeClass('body-overlay');
      }
    });



    /** fix bug equalizer */


    function fixEqualizer() {
      if ($('[data-equalizer]').length) {
        Foundation.reInit('equalizer');
      }
    }

    $(document).ready(function() {
      fixEqualizer();
    });
    $(window).resize(function() {
      fixEqualizer();
    });

    /** .quant input activity */

    // Restricts input for each element in the set of matched elements to the given inputFilter.
    (function($) {
      $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          }
        });
      };
    }(jQuery));

    $('.quant').each(function() {
      const $input = $(this).find('.quant__input');
      $input.inputFilter(function(value) {
        return /^\d*$/.test(value);
      });

      $(this).find('.quant__plus').on('click', function() {
        let currentNum = Math.max(+$input.val(), 0);

        $input.val(++currentNum);
      });

      $(this).find('.quant__minus').on('click', function() {
        let currentNum = Math.max(+$input.val(), 0);
        if (currentNum >= 2) {

          $input.val(--currentNum);
        }
      });
    });

    /** close .dd when click outside, when using Foundation Toggler */
    $(document).on('mouseup', function(e) {
      const $popup = $('.dd_show[data-toggler]');
      if ($popup.length === 0) {
        return;
      }
      const $button = $('[data-toggle="' + $popup.prop('id') + '"]');
      if (
        !$popup.is(e.target) && $popup.has(e.target).length === 0 &&
        !$button.is(e.target) && $button.has(e.target).length === 0
      ) {
        $popup.removeClass('dd_show');
      }
    });

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
