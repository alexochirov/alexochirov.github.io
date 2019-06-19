"use strict";

;

(function ($) {
  "use strict";

  $(function () {
    $(document).ready(function () {
      $(".header__link").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({
          scrollTop: top
        }, 300);
      });
    });
  });
})(jQuery);