;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {
        //begin of sliders
        $(".b-uri__slider").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<div class=" slick-prev slick-arrow b-uri__par"><i class=" fa fa-angle-left fa-2x"> </i></div>',
            nextArrow: '<div class="slick-next slick-arrow b-uri__nar "><i class=" fa fa-angle-right fa-2x"> </i></div>'
        });

        $('.b-client__slider').slick({
            dots: false,
            infinite: true,
            speed: 300,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 2,
            prevArrow: '<div class=" slick-prev slick-arrow"><i class=" fa fa-angle-left fa-2x"> </i></div>',
            nextArrow: '<div class=" slick-next slick-arrow"><i class=" fa fa-angle-right fa-2x"> </i></div>',
            responsive: [{
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
        //end of sliders
        //begin of closing search menu
        $(document).mouseup(function(e) {
            var container = $(".b-header");
            if (container.has(e.target).length === 0) {
                $(".dropdown-pane").removeClass('is-open');
            }
        });
        $('.menu-icon').click(function() {
            $(".dropdown-pane").removeClass('is-open');
        })
        //end of closing search menu

    });
})(jQuery);