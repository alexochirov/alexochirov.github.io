"use strict";

;

(function ($) {
  "use strict";

  $(function () {
    //begin of draggable plugin jquery-ui
    var startPosOfTriangle = 0;
    $(".lore__triangle").draggable({
      axis: "x",
      containment: "parent",
      scroll: false
    });
    $(".lore__triangle").draggable({
      start: function start() {
        startPosOfTriangle = $(this).css('left');
      },
      stop: function stop() {
        var sumOfWidthOfLoreBlocks = $(this).closest('.lore').width();
        var numOfLoreBlocks = $(this).closest('.lore').find('.lore__block').length;
        var currentPos = $(this).css('left').slice(0, -2);
        var averageWidthOfLoreBlock = sumOfWidthOfLoreBlocks / numOfLoreBlocks;
        var numOfCurrentActiveBlock = Math.round((currentPos - 0) / averageWidthOfLoreBlock);
        $(this).closest('.lore').find('.lore__block.js-active').removeClass('js-active');

        if (numOfCurrentActiveBlock == numOfLoreBlocks) {
          numOfCurrentActiveBlock--;
        }

        $(this).closest('.lore').find('.lore__block').eq(numOfCurrentActiveBlock).click();
      }
    }); //end of draggable plugin jquery-ui
    //begin of .paper__textarea helper function

    var $span = $('<div class="fake">').appendTo('body');

    function initDivForCalculateHeightOfTextarea(textarea) {
      $span.text(textarea.text()).width(textarea.width()).css('font-size', textarea.css('font-size')).css('font-family', textarea.css('font-family')).css('line-height', textarea.css('line-height'));
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
      var lineHeight = area.css('line-height').slice(0, -2);
      var numOfRows = Math.ceil($span.height() / lineHeight);
      area.height(numOfRows * lineHeight);
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
      setTimeout(function () {
        setHeightOfTextarea($('.paper__textarea'));
      }, 1000);
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
        var rightOffsetOfCurrentBlock = $(this).width() - 5;

        if ($(this).find('.lore__block.js-active').hasClass('lore__block_last')) {
          leftOffsetOfCurrentBlock = rightOffsetOfCurrentBlock;
        } else {
          leftOffsetOfCurrentBlock = $('.lore__block.js-active').css('left');
        }

        $(this).find('.lore__triangle').css('left', leftOffsetOfCurrentBlock);
      });
    }

    $('.lore__block').click(function () {
      var leftOffsetOfCurrentBlock = $(this).css('left');
      var rightOffsetOfCurrentBlock = $(this).closest('.lore').width() - 5;

      if ($(this).hasClass('lore__block_last')) {
        $(this).closest('.lore').find('.lore__triangle').css('left', rightOffsetOfCurrentBlock);
      } else {
        $(this).closest('.lore').find('.lore__triangle').css('left', leftOffsetOfCurrentBlock);
      }

      $('.lore__block.js-active').removeClass('js-active');
      $(this).addClass('js-active');
    }); //end of .lore slider activity
  });
})(jQuery);