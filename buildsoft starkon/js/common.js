(function ($) {

    $(function () {
        "use strict";

        $(document).foundation({
        });
        

       
    });
    //begin sekundomer
        date = getRelativeDate(7, 9,59);//настройка времени окончания акции
        document.getElementById('date2-str').innerHTML = date.toString();

        $('#countdown-3').timeTo({
            timeTo: new Date(new Date(' Dec 1 2015 00:00:00 GMT+0300 (Беларусь (зима))')),
            displayDays: 2,
            theme: "black",
            displayCaptions: true,
            fontSize: 48,
            lang: 'ru',
            captionSize: 14
        });

        
        $('#clock-1').timeTo();

        function getRelativeDate(days, hours, minutes){
            var date = new Date((new Date()).getTime() + 60000 /* milisec */ * 60 /* minutes */ * 24 /* hours */ * days /* days */);

            date.setHours(hours || 0);
            date.setMinutes(minutes || 0);
            date.setSeconds(0);

            return date;
        }
        //end sekundomer

        // Инициализация слайдера
$('a[data-scroll]').on('click', function(event) {
          var target = $($(this).attr('href'));
          if( target.length ) {
              var animationTime = (target.offset().top - $(document).scrollTop()) / 4;
              event.preventDefault();
              $('html, body').animate({
                  scrollTop: target.offset().top
              }, (animationTime > 0 ? animationTime : -animationTime), function() {
                  window.location.hash = target.attr('id');
              });
          }
      });
$('.jcarousel').jcarousel({
  // Базовые настройки скрипта пишутся здесь
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

// Автопрокрутка слайдера
$('.jcarousel').jcarouselAutoscroll({
    interval: 8000,
    target: '+=1',
    autostart: true
});
$('.jcarousel').jcarousel({
    wrap: 'circular'
});
//jQuery to collapse the navbar on scroll


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
})(jQuery);