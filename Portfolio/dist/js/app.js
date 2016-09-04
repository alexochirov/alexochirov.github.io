;


(function($) {
    "use strict";
    $(function() {



        $(document).ready(function() {
            $(".header__menu").on("click", "a", function(event) {
                event.preventDefault();

                var id = $(this).attr('href'),

                    top = $(id).offset().top;

                $('body,html').animate({
                    scrollTop: top
                },700);
            });
        });

  

    });
})(jQuery);
