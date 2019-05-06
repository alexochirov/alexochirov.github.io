;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {
    //begin of vue
    new Vue({
      el: '.client',

    })
    new Vue({
      el: '.app',

    })

    new Vue({
      el: '#app',
      data: () => ({
        valid: false,
        firstname: '',
        lastname: '',

        checkbox: null,
     dictionary: {
       attributes: {
         email: 'E-mail Address'
         // custom attributes
       },
       custom: {
         name: {
           required: () => 'Name can not be empty',
           max: 'The name field may not be greater than 10 characters'
           // custom messages
         },
         select: {
           required: 'Select field is required'
         }
       }
     },

        nameRules: [
          v => !!v || 'Заполните имя',
          v => v.length <= 10 || 'Должно быть менее 10 символов'
        ],
        email: '',
        emailRules: [
          v => !!v || 'Введите адрес почты',
          v => /.+@.+/.test(v) || 'Неверно ввели почту'
        ]
      })
    })
    //end of vue
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

    loadFont('https://fonts.googleapis.com/css?family=Ubuntu:300,300i,400,400i,500,500i,700,700i&subset=cyrillic,cyrillic-ext,latin-ext');



    /** fix bug equalizer */
    if ($('[data-equalizer]').length) {
      Foundation.reInit('equalizer');
    }

    /** .quant input activity */
    $('.quant').each(function() {
      const $input = $(this).find('.quant__input');
      let currentNum = Math.max(+$input.val(), 0);
      $(this).find('.quant__plus').on('click', function() {
        $input.val(++currentNum);
      });

      $(this).find('.quant__minus').on('click', function() {
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
