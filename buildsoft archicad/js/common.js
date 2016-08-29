(function($) {

    $(function() {
        "use strict";

        $(document).foundation({

        });
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.page-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0
                    /* margin: "50px 0px 0px 0px"*/
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });
  
    //end jQuery for page scrolling feature - requires jQuery Easing plugin

})(jQuery);
