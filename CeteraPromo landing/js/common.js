(function ($) {

    $(function () {
        "use strict";

        $(document).foundation({
        });
    });
    //begin of form input focus
    $('.b-oform__inp').on("blur", function() {
        if($(this).val() != '') {
            $(this).addClass('b-oform__inp_full');
        }
        else {
$(this).removeClass('b-oform__inp_full');
        }
    })

window.onload = function() {
     var aaa1 = $(".b-oform__submit").offset()
    
    $('.b-tooltip').offset({top:aaa1.top + 60, left:aaa1.left + 30 })
}
   
     $('.b-oform__submit').mouseenter(function(){
        $('.b-tooltip').show();
     }).mouseleave(function() {
        $('.b-tooltip').hide();
     });
    //end of form input focus
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.js-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop:  $($anchor.attr('href')).offset().top-0
     
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
//end jQuery for page scrolling feature - requires jQuery Easing plugin

})(jQuery);
