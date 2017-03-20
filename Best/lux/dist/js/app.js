;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {
      ////begin of reload slider to fix bug
      if($('.slider').length) {
        $(window).load(function() {
              Foundation.reInit('slider');
          });
      }

       //end of reload slider to fix bug
       //begin of fancybox
            $('.fancybox').fancybox();


              //end of fancybox
        /**
         * Разные карусели
         */
        $(".cert").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"> </div>',
            nextArrow: '<div class="slick-next"></div>',
            responsive: [{
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
        $(".pillow").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"> </div>',
            nextArrow: '<div class="slick-next"></div>',
            responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                }
            },{
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
        $(".quartz").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"> </div>',
            nextArrow: '<div class="slick-next"></div>',
            responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 2,
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
        $(".brand").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"> </div>',
            nextArrow: '<div class="slick-next"></div>',
            responsive: [{
                breakpoint: 960,
                settings: {
                    slidesToShow: 3,
                }
            }, {
                breakpoint: 440,
                settings: {
                    slidesToShow: 2,
                }
            }]
        });
        $(".cliff").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            fade: true,
            speed: 700,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<div class="slick-prev"> </div>',
            nextArrow: '<div class="slick-next"></div>'
        });

        //begin of scroll up button
        $(document).scroll(function() {
            if (window.scrollY > 500) {
                $('.scroll').attr("style", "display:block;");
            } else {
                $('.scroll').attr("style", "display:none;");
            }
        });

        $(function() {

            $('.scroll').click(function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
                return false;
            });

        });
        //end of scroll up button
        //begin of animation blocks


        function isScrolledIntoView(elem) {
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();

            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        function Utils() {

        }

        Utils.prototype = {
            constructor: Utils,
            isElementInView: function(element, fullyInView) {
                var pageTop = $(window).scrollTop();
                var pageBottom = pageTop + $(window).height();
                var elementTop = $(element).offset().top;
                var elementBottom = elementTop + $(element).height();

                if (fullyInView === true) {
                    return ((pageTop < elementTop) && (pageBottom > elementBottom));
                } else {
                    return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
                }
            }
        };

        var Utils = new Utils();
        $('.cartoon__block').addClass('js-pos');
        var arrayAnimatedBlocks = $('.cartoon');


        function isElementInViewMy() {
            arrayAnimatedBlocks.each(function() {
                var isElementInView = Utils.isElementInView($(this), false);

                if (isElementInView) {
                    $(this).find('.cartoon__block').removeClass('js-pos');
                }
            });



        }

        function throttle(func, ms) {

            var isThrottled = false,
                savedArgs,
                savedThis;

            function wrapper() {

                if (isThrottled) {
                    savedArgs = arguments;
                    savedThis = this;
                    return;
                }

                func.apply(this, arguments);

                isThrottled = true;

                setTimeout(function() {
                    isThrottled = false;
                    if (savedArgs) {
                        wrapper.apply(savedThis, savedArgs);
                        savedArgs = savedThis = null;
                    }
                }, ms);
            }

            return wrapper;
        }
        var throttledIsElementInViewMy = throttle(isElementInViewMy, 100);
        $(document).ready(throttledIsElementInViewMy);
        $(document).scroll(throttledIsElementInViewMy);

        //end of animation blocks
        //begin of tabs reload slider
        $('.tabs .tabs-title').click(function() {
            setTimeout(function() {
                $('.cert').slick('slickNext');
                $('.quartz').slick('slickNext');
            }, 100);

        });
         //end of tabs reload slider

    });
})(jQuery);
