(function ($) {

    $(function () {
        "use strict";

        $(document).foundation({
          equalizer : {
      // Specify if Equalizer should make elements equal height once they become stacked.
      equalize_on_stack: true
    },
    tab: {
      callback : function (tab) {
        var myName = $('.tab-title.active').text();
        $('.b-tabs__js-name').text(myName);
      }
    }
        });


    });
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop:  $($anchor.attr('href')).offset().top-0
     /* margin: "50px 0px 0px 0px"*/
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
//end jQuery for page scrolling feature - requires jQuery Easing plugin
    /*begin calendar*/
     if ($.fn.pickmeup)
     {
    $('.date').pickmeup();
   $(function () {
  $('.multiple').pickmeup({
    flat  : true,
    mode  : 'single'
  });
});
   }
var firstZ = 0;
   window.onload = function() {
    if (firstZ == 0) {
      ohgoda();
    }
    firstZ++;
    //calendar
    $('.pmu-next').click(function() {
      setTimeout(function() {ohgoda()}, 50);

    });

    //calendar vnutrenniy v tabe
     $('.js-multiple .pmu-next').click(function() {
      setTimeout(function() {ohgodaInner()}, 50);

    });

  };
function ohgoda() {
      var all = $('.multiple .pmu-month').text();
      var mont = all.substring(17,20);
      var year = all.substring(all.length - 4, all.length);
      switch (mont) {

    case "Янв":

      var monti = "Фев."

      break

    case "Фев":

    var monti = "Мар."

      break
      case "Мар":

    var monti = "Апр."

      break
      case "Апр":

    var monti = "Май"

      break
      case "Мая":

    var monti = "Июн."

      break
      case "Июн":

    var monti = "Июл."

      break
      case "Июл":

    var monti = "Авг."

      break
      case "Авг":

    var monti = "Сен."

      break
      case "Сен":

    var monti = "Окт."

      break
      case "Окт":

    var monti = "Ноя."

      break
      case "Ноя":

    var monti = "Дек."

    break
     case "Дек":

    var monti = "Янв."
    year++;
    break



}
      $('.pmu-next').html(monti + " " + year);
}
function ohgodaInner() {
      var all = $('.js-multiple .pmu-month').text();
      var mont = all.substring(3,6);
      var year = all.substring(all.length - 4, all.length);
      switch (mont) {

    case "Янв":

      var monti = "Фев."

      break

    case "Фев":

    var monti = "Мар."

      break
      case "Мар":

    var monti = "Апр."

      break
      case "Апр":

    var monti = "Май"

      break
      case "Мая":

    var monti = "Июн."

      break
      case "Июн":

    var monti = "Июл."

      break
      case "Июл":

    var monti = "Авг."

      break
      case "Авг":

    var monti = "Сен."

      break
      case "Сен":

    var monti = "Окт."

      break
      case "Окт":

    var monti = "Ноя."

      break
      case "Ноя":

    var monti = "Дек."

    break
     case "Дек":

    var monti = "Янв."
    year++;
    break



}
      $('.pmu-next').html(monti + " " + year);
}

   /*end calendar*/

   //begin top-menu script
   $('.b-header__menu-link').click(function() {
     if ( $( ".b-header__list" ).is( ":hidden" ) ) {
        $( ".b-header__list" ).show( "slow" );
        $('.b-header__menu-link').hide();
        $('.b-header__logo').addClass("b-header__logo_open");
      } else {
        $( ".b-header__list" ).slideUp();
        $('.b-header__menu-link').show();
        $('.b-header__logo').removeClass("b-header__logo_open");
      }
   })
   $('.b-header__list-close').click(function() {
    $( ".b-header__list" ).slideUp();
    $('.b-header__menu-link').show();
    $('.b-header__logo').removeClass("b-header__logo_open");
   })
   //end top-menu script
   //begin right top menu dropdown script
   $('.b-poisk__dropka').click(function() {
    if ($('.b-poisk .f-dropdown').hasClass('open')) {

    $('.b-poisk__strelka').removeClass('b-poisk__strelka_js');
    var name = $(".b-poisk__inp:checkbox:checked").filter(":first").next().text();
    if(name != "") {
      $('.b-poisk__dropka').text(name)
    }
   }
   else {
    $('.b-poisk__strelka').addClass('b-poisk__strelka_js');
   }
   $('html').click(function() {
    if ($('.b-poisk .f-dropdown').hasClass('open')) {

    $('.b-poisk__strelka').removeClass('b-poisk__strelka_js');
    var name = $(".b-poisk__inp:checkbox:checked").filter(":first").next().text();
    if(name != "") {
      $('.b-poisk__dropka').text(name)
    }
   }
   else {
    $('.b-poisk__strelka').addClass('b-poisk__strelka_js');
   }
   })
   })

   //end right top menu dropdown script

   //chuzhie scripti
   $('.realty__expanded-btn').click(function() {
    f_map_control
                       (
                         'realty_search_map_iframe',
                         this.id,
                         '&#9660;&nbsp;&nbsp;Показать',
                         '&#9650;&nbsp;&nbsp;Свернуть'
                       );
                       return false;
   })
   window.onload = function() {
    fDoubleSliderInit
                  (
                    20,
                    110,
                    1,
                    'realty__square',
                    'realty__square_value_min',
                    'от ',
                    'realty__square_value_max',
                    'до ',
                    'м<sup>2</sup>',
                    'realty__square_min',
                    'realty__square_max'
                  );
                }
      fSimpleSlider
                  (
                    1,
                    10,
                    1,
                    'realty__rooms',
                    'realty__result_rooms',
                    '',
                    '',
                    'realty__input_rooms'
                  );
      fDoubleSliderInit
                  (
                    1000,
                    10000,
                    100,
                    'realty__cost',
                    'realty__result_cost_min',
                    'от ',
                    'realty__result_cost_max',
                    'до ',
                    '',
                    'realty__input_cost_min',
                    'realty__input_cost_max'
                  );
                  fDoubleSliderInit
                  (
                    20,
                    110,
                    1,
                    'realty__square_copy',
                    'realty__square_value_min_copy',
                    'от ',
                    'realty__square_value_max_copy',
                    'до ',
                    'м<sup>2</sup>',
                    'realty__square_min_copy',
                    'realty__square_max_copy'
                  );
                  fSimpleSlider
                  (
                    1,
                    10,
                    1,
                    'realty__rooms_copy',
                    'realty__result_rooms_copy',
                    '',
                    '',
                    'realty__input_rooms_copy'
                  );
      fDoubleSliderInit
                  (
                    1000,
                    10000,
                    100,
                    'realty__cost_copy',
                    'realty__result_cost_min_copy',
                    'от ',
                    'realty__result_cost_max_copy',
                    'до ',
                    '',
                    'realty__input_cost_min_copy',
                    'realty__input_cost_max_copy'
                  );

   //end of chuzhie scripti
})(jQuery);
