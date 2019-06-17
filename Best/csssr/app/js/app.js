;

(function($) {
  "use strict";
  $(function() {
    //begin of .paper__textarea helper function
    var span = $('<span class="fake">').appendTo('body');

    function initSpan(textarea) {
      span.text(textarea.text())
        .width(textarea.width())
        .css('font', textarea.css('font'));
    }
    $('.paper__textarea').on({
      input: function() {
        setHeightOfTextarea($(this));
      },
      focus: function() {
        initSpan($(this));
      },
      keypress: function(e) {
        if (e.which == 13) e.preventDefault();
      }
    });

    function setHeightOfTextarea(area) {

      var text = area.val();
      console.log(area.val());
      span.text(text);
      area.height(text ? span.height() : 'auto');
    }
    //end of .paper__textarea helper function
    //begin of debounce function
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
    //end of debounce function
    //begin of .lore slider activity
    $(document).ready(function() {
      createHeightOfSlider();
      positioningOfTrianle();
      initSpan($('.paper__textarea'))
      setHeightOfTextarea($('.paper__textarea'));
    });
    var debounceOfSlider = debounce(function() {
      createHeightOfSlider();
      positioningOfTrianle();
    }, 150);
    window.addEventListener('resize', debounceOfSlider);

    function createHeightOfSlider() {
      var heightAdded = 60;
      $('.lore').each(function() {

        var $currentBlocks = $(this).find('.lore__block');
        var heights = $currentBlocks.map(function() {
          return $(this).height();
        }).get();

        var maxHeight = Math.max.apply(null, heights) + heightAdded;
        $(this).height(maxHeight);
      });

    }

    $('.lore__block').click(function() {
      var leftOffsetOfCurrentBlock = $(this).css('left');
      if ($(this).hasClass('lore__block_last')) {
        $(this).closest('.lore').find('.lore__triangle').css('left', 'calc(100% - 5px)');
      } else {
        $(this).closest('.lore').find('.lore__triangle').css('left', leftOffsetOfCurrentBlock);
      }
      $('.lore__block.js-active').removeClass('js-active');
      $(this).addClass('js-active');

    });

    function positioningOfTrianle() {
      $('.lore').each(function() {
        var leftOffsetOfCurrentBlock = $('.lore__block.js-active').css('left');
        $(this).find('.lore__triangle').css('left', leftOffsetOfCurrentBlock);
      });
    }



    //end of .lore slider activity

  });
})(jQuery);
