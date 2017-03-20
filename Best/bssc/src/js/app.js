;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {


        $(".cloth").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            dots: true,
            responsive: [{
                    breakpoint: 640,
                    settings: {
                        dots: false
                    }
                },

            ]

        });

    });
})(jQuery);
