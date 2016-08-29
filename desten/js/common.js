(function ($) {

    $(function () {
        "use strict";

        $(document).foundation({
        });
    });

// Прокрутка слайдера
$('.jcarousel')
    .on('jcarousel:create jcarousel:reload', function() {
        var element = $(this),
            width = element.innerWidth();

        // This shows 1 item at a time.
        // Divide `width` to the number of items you want to display,
        // eg. `width = width / 3` to display 3 items at a time.
        element.jcarousel('items').css('width', width + 'px');
    })
    .jcarousel({
        // Your configurations options
    });
// Кнопка PREV
$('.jcarousel-prev')

// Триггер класса inactive
.on('jcarouselcontrol:active', function() {
  $(this).removeClass('inactive');
})
.on('jcarouselcontrol:inactive', function() {
  $(this).addClass('inactive');
})

// Инициализация кнопки PREV
.jcarouselControl({
  target: '-=1'
});

// Кнопка NEXT
$('.jcarousel-next')

// Триггер класса inactive
.on('jcarouselcontrol:active', function() {
  $(this).removeClass('inactive');
})
.on('jcarouselcontrol:inactive', function() {
  $(this).addClass('inactive');
})

// Инициализация кнопки NEXT
.jcarouselControl({
  target: '+=1'
});

// Пагинация слайдера
$('.jcarousel-pagination')

// Триггер класса active
.on('jcarouselpagination:active', 'a', function() {
  $(this).addClass('active');
})
.on('jcarouselpagination:inactive', 'a', function() {
  $(this).removeClass('active');
})

// Инициализация пагинации
.jcarouselPagination({
  item: function(page) {
    return '<a href="#' + page + '">' + page + '</a>';
  }
});


// Пагинация слайдера
$('.jcarousel-pagination_vertical')

// Триггер класса active
.on('jcarouselpagination:active', 'a', function() {
  $(this).addClass('active');
})
.on('jcarouselpagination:inactive', 'a', function() {
  $(this).removeClass('active');
})





$('.jcarousel').jcarouselAutoscroll({
    interval: 3000,
    target: '+=1',
    autostart: true
});

$('.jcarousel_vertical').jcarouselAutoscroll({
    interval: 2000,
    target: '+=1',
    autostart: true
});


$('.jcarousel').jcarousel({
    wrap: 'circular'
});

//begin of slideDown main menu
$(document).ready(function(){
  $('a').on('click', function(e){
    e.preventDefault();
  });
    
  $('.b-header__list li').hover(function () {
     clearTimeout($.data(this,'timer'));
     $('ul',this).stop(true,true).slideDown(400);
  }, function () {
    $.data(this,'timer', setTimeout($.proxy(function() {
      $('ul',this).stop(true,true).slideUp(00);
    }, this), 100));
  });

});

//end of slideDown main menu
//begin slideup catalog items
$( ".b-podbor__filter-title" ).click(function() {
  $( this ).next().slideToggle( "slow", function() {
    // Animation complete.
  });
  if($(".b-podbor__spisok",this).attr("style") == "background: url('./imgs/sprites.png') no-repeat -358px -69px;" || $(".b-podbor__spisok",this).attr("style") == undefined) {
  $(".b-podbor__spisok",this).attr({style:"background: url('./imgs/sprites.png') no-repeat -319px -68px;"});
  }
  else {
    $(".b-podbor__spisok",this).attr({style:"background: url('./imgs/sprites.png') no-repeat -358px -69px;"});
  }
});

//end slideup catalog items
//begin hover of catalog items
$(".b-catalog__block").mouseenter(function() {
  $(".b-catalog__sravnit-link",this).attr({style:"visibility:visible"});
  $(".b-catalog__order-link",this).attr({style:"visibility:visible"});
}).mouseleave(function() {
  $(".b-catalog__sravnit-link",this).attr({style:"visibility:hidden"});
  $(".b-catalog__order-link",this).attr({style:"visibility:hidden"});
});
//end hover of catalog items

//begin range slider
if ($.fn.editRangeSlider) {
$("#range-slider").editRangeSlider({bounds:{min: -30, max: 60}});
}
//end range slider
//begin delete of tabs lighting
$("li.tab-title.active").mouseleave(function(e) {
  
  $('.b-breadcrumbs__link')[0].click();
  e.preventDefault();
});
//end delete of tabs lighting
if ($.fn.fancybox) {
  $(".fancybox").fancybox();
}
//begin  restart of jcarousel
$(".tab-title>a").click(function() {
  setTimeout(function() {
    $('.jcarousel').jcarousel('reload');
  }, 100);
  
});
//end restart of jcarousel 

//begin inputmask
$(document).ready(function() {
  if ($.fn.inputmask)
$('.b-config__inp-mask').inputmask("+9(999)999-99-99");
});
//end inputmask
//begin hover sphera on main page
$('.b-sphera__img').mouseenter(function() {
  $('.b-sphera__text-img',this).css( "visibility", "visible" )
});
$('.b-sphera__img').mouseleave(function() {
  $('.b-sphera__text-img',this).css( "visibility", "hidden" )
});
//end hover sphera on main page
     /*begin calendar*/
     if ($.fn.pickmeup)
     {
    $('.date').pickmeup();
   $(function () {
  $('.multiple').pickmeup({
    flat  : true,
    mode  : 'multiple'
  });
});
   }
   /*end calendar*/
   //begin of jScrollPane
$(document).ready(function() {
  if ($.fn.jScrollPane) {
   $('.b-sravnenie__wrapper').jScrollPane();
   $('.b-sravnenie__wrapper').jScrollPane({autoReinitialise: true});

   }
});
   //end of jScrollPane

})(jQuery);
