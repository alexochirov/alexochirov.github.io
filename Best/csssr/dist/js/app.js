"use strict";

;

(function ($) {
  "use strict";

  $(function () {
    //begin of .paper__textarea helper function
    var $span = $('<div class="fake">').appendTo('body');

    function initDivForCalculateHeightOfTextarea(textarea) {
      $span.text(textarea.text()).width(textarea.width()).css('font', textarea.css('font'));
    }

    $('.paper__textarea').on({
      input: function input() {
        setHeightOfTextarea($(this));
      },
      focus: function focus() {
        initDivForCalculateHeightOfTextarea($(this));
      },
      keypress: function keypress(e) {
        if (e.which == 13) e.preventDefault();
      }
    });

    function setHeightOfTextarea(area) {
      var text = area.val();
      $span.text(text);
      area.height($span.height());
    } //end of .paper__textarea helper function
    //begin of debounce function


    function debounce(func, wait, immediate) {
      var timeout;
      return function () {
        var context = this,
            args = arguments;

        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }

    ; //end of debounce function
    //begin of .lore slider activity

    $(document).ready(function () {
      createHeightOfSlider();
      positioningOfTrianle();
      initDivForCalculateHeightOfTextarea($('.paper__textarea'));
      setHeightOfTextarea($('.paper__textarea'));
    });
    var debounceOfSlider = debounce(function () {
      createHeightOfSlider();
      positioningOfTrianle();
      initDivForCalculateHeightOfTextarea($('.paper__textarea'));
      setHeightOfTextarea($('.paper__textarea'));
    }, 150);
    window.addEventListener('resize', debounceOfSlider);

    function createHeightOfSlider() {
      var heightAdded = 60;
      $('.lore').each(function () {
        var $currentBlocks = $(this).find('.lore__block');
        var heights = $currentBlocks.map(function () {
          return $(this).height();
        }).get();
        var maxHeight = Math.max.apply(null, heights) + heightAdded;
        $(this).height(maxHeight);
      });
    }

    function positioningOfTrianle() {
      $('.lore').each(function () {
        var leftOffsetOfCurrentBlock;

        if ($(this).find('.lore__block.js-active').hasClass('lore__block_last')) {
          leftOffsetOfCurrentBlock = 'calc(100% - 5px)';
        } else {
          leftOffsetOfCurrentBlock = $('.lore__block.js-active').css('left');
        }

        $(this).find('.lore__triangle').css('left', leftOffsetOfCurrentBlock);
      });
    }

    $('.lore__block').click(function () {
      var leftOffsetOfCurrentBlock = $(this).css('left');

      if ($(this).hasClass('lore__block_last')) {
        $(this).closest('.lore').find('.lore__triangle').css('left', 'calc(100% - 5px)');
      } else {
        $(this).closest('.lore').find('.lore__triangle').css('left', leftOffsetOfCurrentBlock);
      }

      $('.lore__block.js-active').removeClass('js-active');
      $(this).addClass('js-active');
    }); //end of .lore slider activity
  });
})(jQuery);