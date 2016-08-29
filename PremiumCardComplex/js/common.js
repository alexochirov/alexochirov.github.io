(function ($) {
var Xinner=0;
var Yinner=0;

$(document).ready(function(){
$('.b-main__four').mouseenter(function() {
  $(this).addClass("act4");
}).mouseleave(function() {
  $(this).removeClass("act4");
})

$('.b-main__three').mouseenter(function() {
  $(this).addClass("act3");
}).mouseleave(function() {
  $(this).removeClass("act3");
})

$('.b-main__five').mouseenter(function() {
  $(this).addClass("act5");
}).mouseleave(function() {
  $(this).removeClass("act5");
})

});


})(jQuery);
