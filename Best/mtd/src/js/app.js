;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {


    //begin of .wing slider
    $(".wing").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="slick-prev" viewBox="0 0 41 184"><defs><path id="po8la" d="M104.989 2219.002l-32.975-91.999 32.975-92.005h-8.001l-32.977 92.005 32.977 91.999z"/></defs><g><g transform="translate(-64 -2035)"><use fill="#eeeff1" xlink:href="#po8la"/></g></g></svg>',
      nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-next" viewBox="0 0 41 184"><defs><path id="mydra" d="M1492.98 2218.97l33.025-91.967-33.025-91.974h8.013l33.027 91.974-33.027 91.967z"/></defs><g><g transform="translate(-1493 -2035)"><use fill="#eeeff1" xlink:href="#mydra"/></g></g></svg>',
      responsive: [{
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
        }
      }, {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 700,
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
    //end of .wing slider
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

    $(".carousel-volunteers").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      swipeToSlide: true,
      prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="slick-prev" viewBox="0 0 41 184"><defs><path id="po8la" d="M104.989 2219.002l-32.975-91.999 32.975-92.005h-8.001l-32.977 92.005 32.977 91.999z"/></defs><g><g transform="translate(-64 -2035)"><use fill="#eeeff1" xlink:href="#po8la"/></g></g></svg>',
      nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  class="slick-next" viewBox="0 0 41 184"><defs><path id="mydra" d="M1492.98 2218.97l33.025-91.967-33.025-91.974h8.013l33.027 91.974-33.027 91.967z"/></defs><g><g transform="translate(-1493 -2035)"><use fill="#eeeff1" xlink:href="#mydra"/></g></g></svg>',
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

    $('.preview-slider').slick({
      slidesToScroll: 2,
      infinite: false,
      arrows: true,
      variableWidth: true,
      prevArrow: '<span><svg class="svg-inline--fa fa-angle-left fa-w-8 slick-prev fa-2x issue-detail__prev" aria-hidden="true" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></span>',
      nextArrow: '<span><svg class="svg-inline--fa fa-angle-right fa-w-8 slick-next fa-2x issue-detail__next" aria-hidden="true" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></span>',
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
    // Сортировка элементов
    var $grid = $('.sort-grid').isotope({
      itemSelector: '.sort-item',
      layoutMode: 'fitRows',
      getSortData: {
        name: '.sort-item__title',
        rating: '.sort-item__rating parseFloat',
        count: '.sort-item__count parseInt'
      }
    });
    $('#sorts').on('click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      $grid.isotope({
        sortBy: sortByValue
      });
    });
    $grid.isotope({
      sortBy: 'count',
      sortAscending: false
    });
    $('.selector-group').each(function(i, selectorGroup) {
      var $buttonGroup = $(selectorGroup);
      $buttonGroup.on('click', 'button', function() {
        $buttonGroup.find('.button').addClass('hollow');
        $(this).removeClass('hollow');
      });
    });

    $(".multiselect").zmultiselect({
      filter: true,
      filterResult: true,
      selectAll: true,
      locale: 'ru-RU',
      selectAllText: ['Выбрать все', 'Сбросить выделенное'],
      selectedText: ['Выбрано', 'из'],
      filterPlaceholder: 'Начните набирать название',
      //filterResultText: "Showed",
      //filterPlaceholder: 'MyFilter...',

      get: "zmultiselect",
      placeholder: "Выберите издание",
      live: '#menu_live'
    });
    $(".user-multiselect").zmultiselect({
      filter: true,
      filterResult: true,
      selectAll: false,
      locale: 'ru-RU',
      selectAllText: ['Выбрать всеx', 'Сбросить выделенное'],
      selectedText: ['Выбрано', 'из'],
      filterPlaceholder: 'Начните набирать имя',
      //filterResultText: "Showed",
      //filterPlaceholder: 'MyFilter...',

      get: "zmultiselect",
      placeholder: "Выберите волонтера",
      live: '#menu_live'
    });
    $('[data-toggle="adSearch"]').click(function() {
      setTimeout(function() {
        $('.zselect ul').attr('style', 'width:calc(100% + 2px);');
      }, 200);
    });

    $('.x-input-file').each(function () {
      const $input = $(this),
        $label = $input.prev('label'),
        labelVal = $label.html();

      $input.on('change', function (e) {
        let fileName = '';

        if (this.files && this.files.length > 1) {
          fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
        } else if (e.target.value) {
          fileName = e.target.value.split('\\').pop();
        }

        if (fileName) {
          $label.find('b,span').html(fileName);
        } else {
          $label.html(labelVal);
        }
      });
    });

  });
})(jQuery);
