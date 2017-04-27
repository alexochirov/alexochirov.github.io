$(function() {
  var windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    documentHeight = $('body').height(),
    isTouch = "ontouchstart" in window || window.navigator.msMaxTouchPoints,
    animationCompleate = true,
    $header = $('.header'),
    headerHeight = $header.outerHeight(),
    $footer = $('.footer'),
    footerHeight = $footer.outerHeight(),
    // topMenuOffset = $('.content .first-screen').height() - headerHeight,
    topMenuOffset = headerHeight,
    menuVisible = $('.header .menu-toggle').is(':visible'),
    resizeTimer;

  //begin of calendar

  var date1 = new Date;
  if (typeof pickmeup == 'function') {

    var arrayDate = {
      days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    };
    pickmeup.defaults.locales['ru'] = arrayDate;
    document.getElementsByClassName('calendar')[0].addEventListener('pickmeup-fill', function(e) {

      fillPmuHelper();
      dateGet();
      hoverBeauty();

    });
    pickmeup('.calendar', {
      flat: true,
      select_month: false,
      select_year: false,
      min: date1,
      title_format: 'Y B',
      locale: 'ru',
      prev: '<img src="./images/left.svg" alt="" />',
      next: '<img src="./images/right.svg" alt="" />',
      date: [
        new Date,
        date1
      ],
      mode: 'range',
      calendars: 2
    });

    $('.rest__button').click(function() {
      if ($(this).find('.year').hasClass('hide')) {

        $('.year').addClass('hide');
        $(this).find('.year').toggleClass('hide');
      } else {
        $('.year').addClass('hide');
      }

    });

    function hoverBeauty() {
      $('.pmu-days .pmu-button:not(.pmu-disabled)').mouseenter(function() {

        var hoverDate = getMyDate($(this));

        if (hoverDate > lastSelectedDate) {
          $(this).addClass('js-last-hover');
          $('.pmu-days .pmu-button:not(.pmu-disabled)').each(function() {
            if (getMyDate($(this)) >= lastSelectedDate && getMyDate($(this)) <= hoverDate) {
              $(this).addClass('js-hover-now');

            }
          });

        }
        if (hoverDate <= firstSelectedDate) {
          $(this).addClass('js-first-hover');
          $('.pmu-days .pmu-button:not(.pmu-disabled)').each(function() {
            if (getMyDate($(this)) <= firstSelectedDate && getMyDate($(this)) >= hoverDate) {
              $(this).addClass('js-hover-now');

            }
          });
        }

      }).mouseleave(function() {
        $('.js-hover-now').removeClass('js-hover-now');
        $('.js-last-hover').removeClass('js-last-hover');
        $('.js-first-hover').removeClass('js-first-hover');
      });
    }



    function getMyDate(obj) {
      var day = +obj.find('.pmu-helper').text();
      var textMonthAndYear = obj.closest('.pmu-instance').find('nav:first-child .pmu-month.pmu-button').text();
      var month = textMonthAndYear.slice(5);
      var year = +textMonthAndYear.slice(0, 5);
      jQuery.each(arrayDate['months'], function(i) {
        if (arrayDate['months'][i] == month) month = i;
      })
      return new Date(year, month, day);
    }
    var firstSelectedDate;
    var lastSelectedDate;

    function dateGet() {


      $('.pmu-days .pmu-selected.pmu-button').first().addClass('js-first-date');

      $('.pmu-days .pmu-selected.pmu-button').last().addClass('js-last-date');


      $('.pmu-days .pmu-button:not(.pmu-disabled)').click(function() {
        var dateFromCalendar;

        setTimeout(function() {



          dateFromCalendar = pickmeup('.calendar').get_date(false);

          firstSelectedDate = dateFromCalendar[0];
          lastSelectedDate = dateFromCalendar[1];

          var monthFirstSelectedDate = arrayDate['monthsShort'][firstSelectedDate.getMonth()];
          var weekDayFirstSelectedDate = arrayDate['daysShort'][firstSelectedDate.getDay()];
          var dayFirstSelectedDate = firstSelectedDate.getDate();
          var checkInTime = '<span class="rest__weekday">' + weekDayFirstSelectedDate + '</span>' + dayFirstSelectedDate + ' ' + monthFirstSelectedDate + '.';
          $('.rest__check-in').html(checkInTime);

          var monthLastSelectedDate = arrayDate['monthsShort'][lastSelectedDate.getMonth()];
          var weekDayLastSelectedDate = arrayDate['daysShort'][lastSelectedDate.getDay()];
          var dayLastSelectedDate = lastSelectedDate.getDate();
          var checkOutTime = '<span class="rest__weekday">' + weekDayLastSelectedDate + '</span>' + dayLastSelectedDate + ' ' + monthLastSelectedDate + '.';
          if (checkOutTime != checkInTime) {
            $('.rest__check-out').html(checkOutTime);
            $('.year_calendar').addClass('hide');
          } else {
            $('.rest__check-out').html('Дата выезда');
          }



        }, 100);



      });
    }

    function fillPmuHelper() {
      $('.pmu-days .pmu-button').each(function() {
        var num = +$(this).text();
        $(this).append('<span class="pmu-helper">' + num + '</span>');
      });
    }


  }

  //end of calendar
  //begin of cancel click on .year
  $('.year').click(function(e) {
    e.preventDefault();
    e.stopPropagation();

  });
  //end of cancel click on .year
  //begin of choose way .garage__link
  function crossInside() {
    $(".rest__cross").click(function(e) {
      $(this).closest('.rest__road').text('Выбрать направление');
      e.preventDefault();
      e.stopPropagation();
    });
  }
  var $insideRoad = $('.rest__road');
  $('.garage__link').click(function() {
    var city = $(this).find('.garage__city').text();
    var country = $(this).find('.garage__country').text();
    var insideText = city + ', ' + country;
    $insideRoad.text(insideText);
    $insideRoad.append('<img src="./images/times.svg" alt="" class="rest__cross" />');

    crossInside();

  });


  $('.trip__button').click(function() {
    var numPane = $(this).data('region');
    $('.trip__cities').addClass('hide');
    $('.trip__cities').eq(numPane - 1).removeClass('hide');
  });
  $('.trip__destination').click(function() {
    var country = $(this).find('.trip__nation').text();
    var city = $(this).find(".trip__city").text();
    var insideText = city + ', ' + country;
    $insideRoad.text(insideText);
    $insideRoad.append('<img src="./images/times.svg" alt="" class="rest__cross" />');

    crossInside();
    $(this).closest('.year').toggleClass('hide');
  });
  //end of choose way .garage__link
  //begin of .room count and other
  function reloadCountRoomAndPeople() {
    var $visibleRooms = $(".room:not(.hide)");
    var numRooms = $visibleRooms.length;
    var numGuests = 0;
    var arrayRooms = ['1 номер', '2 номера', '3 номера', '4 номера'];
    var arrayGuests = ['1 гость', '2 гостя', '3 гостя', '4 гостя', '5 гостей', '6 гостей', '7 гостей', '8 гостей', '9 гостей', '10 гостей', '11 гостей', '12 гостей', '13 гостей', '14 гостей', '15 гостей', '16 гостей', '17 гостей', '18 гостей', '19 гостей', '20 гостей', '21 гость', '22 гостя', '23 гостя', '24 гостя', '25 гостей', '26 гостей', '27 гостей', '28 гостей', '29 гостей', '30 гостей', '31 гость', '32 гостя', '33 гостя', '34 гостя', '35 гостей', '36 гостей', '37 гостей', '38 гостей', '39 гостей', '40 гостей', '41 гость', '42 гостя', '43 гостя', '44 гостя', '45 гостей', '46 гостей', '47 гостей', '48 гостей'];
    $visibleRooms.each(function(i) {
      $(this).find('.room__digit').text(i + 1);
      numGuests += +$(this).find('.room__adults input').val();
      numGuests += +$(this).find('.room__children input').val();

    });
    $visibleRooms.first().addClass('room_first');
    $('.rest__room').text(arrayRooms[numRooms - 1]);
    $('.rest__guest').text(arrayGuests[numGuests - 1]);


  }
  reloadCountRoomAndPeople();

  function showAndHideRemoveButton() {
    var $visibleRooms = $(".room:not(.hide)");
    var numRooms = $visibleRooms.length;

    if (numRooms > 1) {
      $visibleRooms.find('.room__remove').removeClass('hide');
    } else {
      $visibleRooms.find('.room__remove').addClass('hide');
    }
  }
  $('.room__adults .room__more').click(function() {
    var currentInput = $(this).closest('.room__adults').find('input');
    var numCurrent = +currentInput.val();
    if (numCurrent < 8) {
      currentInput.val(numCurrent + 1);
    }
    reloadCountRoomAndPeople();

  });
  $('.room__adults .room__less').click(function() {
    var currentInput = $(this).closest('.room__adults').find('input');
    var numCurrent = +currentInput.val();
    if (numCurrent > 1) {
      currentInput.val(numCurrent - 1);
    }
    reloadCountRoomAndPeople();

  });
  $('.room__adults input').change(function() {
    var numCurrent = +$(this).val();
    var minNum = 1;
    var maxNum = 8;

    if (numCurrent >= maxNum) {
      $(this).val(maxNum);
    } else {
      if (numCurrent <= minNum) {
        $(this).val(minNum);
      } else {
        if (numCurrent < maxNum && numCurrent > minNum) {
          $(this).val(numCurrent);

        } else {

          $(this).val(minNum);

        }
      }
    }
    reloadCountRoomAndPeople();
  });
  $('.room__children input').change(function() {
    var numCurrent = +$(this).val();
    var minNum = 0;
    var maxNum = 4;

    if (numCurrent >= maxNum) {
      $(this).val(maxNum);
    } else {
      if (numCurrent <= minNum) {
        $(this).val(minNum);
      } else {
        if (numCurrent < maxNum && numCurrent > minNum) {
          $(this).val(numCurrent);

        } else {

          $(this).val(minNum);

        }
      }
    }
    agesFunction($(this));

    reloadCountRoomAndPeople();
  });

  function agesFunction(obj) {

    var numCurrent = +obj.val();
    if (numCurrent > 0) {
      obj.closest('.room').find('.room__age').removeClass('hide');
      if (numCurrent == 1) {
        obj.closest('.room').find('.room__line').removeClass('room__up-2 room__up-3 room__up-4').addClass('room__up-1').find('input').addClass('hide');
        obj.closest('.room').find('.room__line input.hide').first().removeClass('hide');
      }
      if (numCurrent == 2) {
        obj.closest('.room').find('.room__line').removeClass('room__up-1 room__up-3 room__up-4').addClass('room__up-2').find('input').addClass('hide');
        obj.closest('.room').find('.room__line input.hide').first().removeClass('hide');
        obj.closest('.room').find('.room__line input.hide').first().removeClass('hide');
      }
      if (numCurrent == 3) {
        obj.closest('.room').find('.room__line').removeClass('room__up-1 room__up-2 room__up-4').addClass('room__up-3').find('input').addClass('hide');
        obj.closest('.room').find('.room__line input.hide').first().removeClass('hide');
        obj.closest('.room').find('.room__line input.hide').first().removeClass('hide');
        obj.closest('.room').find('.room__line input.hide').first().removeClass('hide');
      }
      if (numCurrent == 4) {
        obj.closest('.room').find('.room__line').removeClass('room__up-1 room__up-2 room__up-3').addClass('room__up-4').find('input').removeClass('hide');
      }
    } else {
      obj.closest('.room').find('.room__age').addClass('hide');
    }
  }
  $('.room__children .room__more').click(function() {
    var currentInput = $(this).closest('.room__children').find('input');
    var numCurrent = +currentInput.val();
    if (numCurrent < 4) {
      currentInput.val(numCurrent + 1);
    }
    reloadCountRoomAndPeople();
    agesFunction($(this).closest('.room__children').find('input'));

  });
  $('.room__children .room__less').click(function() {
    var currentInput = $(this).closest('.room__children').find('input');
    var numCurrent = +currentInput.val();
    if (numCurrent > 0) {
      currentInput.val(numCurrent - 1);
    }
    reloadCountRoomAndPeople();
    agesFunction($(this).closest('.room__children').find('input'));
  });

  $('.room__remove').click(function() {
    $(this).closest('.room').addClass('hide');
    showAndHideRemoveButton();
    reloadCountRoomAndPeople();
    if ($('.room.hide').length != 0) {
      $('.year__button').removeClass('hide');
    }
  });
  $('.year__button').click(function() {


    $('.room.hide').first().removeClass('hide');
    reloadCountRoomAndPeople();
    if ($('.room.hide').length == 0) {
      $(this).addClass('hide');
    }
    showAndHideRemoveButton();

  });
  //end of .room count and other



  $(window).on('load resize', function(e) {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }

    resizeTimer = setTimeout(function() {
      windowWidth = $(window).width();
      windowHeight = $(window).height();
      documentHeight = $('body').height();
      headerHeight = $header.outerHeight();
      footerHeight = $footer.outerHeight();
      menuVisible = $('.header .menu-toggle').is(':visible');
      adjustSlide(e);
    }, 500);
  });

  function adjustSlide(e) {
    $('.video-slide video').each(function() {
      var videoOrigWidth = 1920,
        videoOrigHeight = 1080,
        newWidth = windowWidth,
        blockHeight = $(this).parent().height() || windowHeight,
        newHeight = Math.round(newWidth / videoOrigWidth * videoOrigHeight),
        top = Math.round((blockHeight - newHeight) / 2),
        left = 0;

      if (newHeight < blockHeight) {
        newHeight = blockHeight;
        newWidth = Math.round(newHeight / videoOrigHeight * videoOrigWidth);
        top = 0;
        left = Math.round((windowWidth - newWidth) / 2);
      }

      $(this).css({
        position: 'absolute',
        width: newWidth,
        height: newHeight,
        top: top,
        left: left
      });
    });
  }

  $(window).on('load scroll', function() {
    var topOffset = $(document).scrollTop(),
      toBottom = topOffset - (documentHeight - windowHeight - footerHeight);

    if (topOffset >= topMenuOffset) {
      $header.addClass('minimized');
    } else {
      $header.removeClass('minimized');
    }

    headerHeight = $header.outerHeight();

    if (toBottom > 0) {
      $('.bottom-nav').css('bottom', toBottom);
      $('body').addClass('document-bottom');
    } else {
      $('.bottom-nav').css('bottom', 0);
      $('body').removeClass('document-bottom');
    }
  });

  $header.each(function() {
    $header.find('.menu-toggle').click(function(e) {
      e.preventDefault();
      if (!menuVisible) return;
      $('body').toggleClass('menu-opened');
    });

    $header.find('.filter a').click(function(e) {
      e.preventDefault();
      $('body').toggleClass('filter-opened');
    });

    $header.find('.menu a').click(function() {
      var href = $(this).attr('href');

      if (href.charAt(0) == '#') {
        var offset = $(href).offset().top - headerHeight + 13;

        $.scrollTo(offset, 600);
        return false;
      }
    });
  });

  $('.content .clients-slide .slider').owlCarousel({
    navigation: false,
    pagination: true,
    singleItem: true,
    slideSpeed: 500
  });

  $('.content .news-list .slider, .reviews-list .slider, .content .certs-list .slider').owlCarousel({
    navigation: true,
    pagination: true,
    singleItem: true,
    slideSpeed: 500
  });

  $('.content .team-list .slider').each(function() {
    var items = $(this).find('.item').size(),
      itemWidth = $(this).find('.item:first').outerWidth(true),
      perLine = Math.ceil(items / 3),
      itemsWidth = perLine * itemWidth,
      maxLeftOffset = $(this).width() - itemsWidth,
      $itemsContainer = $(this).find('.items');

    $itemsContainer.css('width', itemsWidth).transition({
      x: -(itemsWidth - $(this).width()) / 2
    });

    $(this).find('.pr').click(function(e) {
      e.preventDefault();
      var translate = $itemsContainer.css('translate').split(',');

      if (translate) {
        var translateX = parseInt(translate[0], 10);
        if ((translateX + itemWidth) < 0) {
          $itemsContainer.transition({
            x: '+=' + itemWidth
          });
        } else {
          $itemsContainer.transition({
            x: 0
          });
        }
      }
    });

    $(this).find('.nx').click(function(e) {
      e.preventDefault();
      var translate = $itemsContainer.css('translate').split(',');

      if (translate) {
        var translateX = parseInt(translate[0], 10);
        if ((translateX - itemWidth) > maxLeftOffset) {
          $itemsContainer.transition({
            x: '-=' + itemWidth
          });
        } else {
          $itemsContainer.transition({
            x: maxLeftOffset
          });
        }
      }
    });
  });

  // $('.background-clip.grey').attr('data-pattern', 'images/grey-pattern.jpg');
  // $('.background-clip.red').attr('data-pattern', 'images/red-pattern.jpg');
  // $('.background-clip').patternizer();

  $('.bottom-nav a.next').click(function(e) {
    e.preventDefault();
    var topOffset = $(document).scrollTop();

    if ($('body').hasClass('document-bottom')) {
      $.scrollTo(0, 600);
    } else {
      $('.content > div[class$="-slide"], .content .news-list').each(function() {
        var slideTop = Math.round($(this).offset().top - headerHeight);

        // console.log($(this).attr('class'), slideTop, topOffset, documentHeight);
        if (slideTop > topOffset) {
          if ($(this).is('.contacts-slide')) {
            slideTop = documentHeight;
          }
          $.scrollTo(slideTop, 600);
          return false;
        }
      });
    }
  });

  $('.content .services-filter, .content .inform_agency-inner .top .inform_agency-filter .tab').each(function() {
    var $filter = $(this);

    $filter.find('.items').owlCarousel({
      navigation: true,
      pagination: false
    });

    $filter.find('label').each(function() {
      var $input = $(this).children('input'),
        $text = $input.parent().find('.text');

      if ($input.attr('type') != 'radio') {
        return;
      }
      if ($input.prop('checked') === true) {
        $(this).addClass('active');
        $text.text('выбрано');
      } else {
        $(this).removeClass('active');
        $text.text('выбрать');
      }
    }).click(function() {
      var $input = $(this).children('input'),
        $text = $input.parent().find('.text');

      if ($input.attr('type') == 'radio') {
        if ($input.prop('checked') === false) {
          $filter.find('input[type="radio"]').prop('checked', false);
          $filter.find('label').removeClass('active');
          $filter.find('.text').text('выбрать');
          $(this).addClass('active');
          $input.prop('checked', true);
          $text.text('выбрано');
        }
      }
    });
  });

  $('.content .inform_agency-inner .top .search .clear').click(function() {
    $(this).siblings('.text').val('');
  });

  $('.content .inform_agency-inner .top .inform_agency-filter .tabs a').click(function(e) {
    e.preventDefault();
    $(this).parent().addClass('active').siblings().removeClass('active');
    $($(this).attr('href')).show().siblings('.tab').hide();
  }).first().click();

  $('.content .inform_agency-inner .news-list .bottom-btns .btn a').click(function(e) {
    e.preventDefault();
    var $news_list = $(this).closest('.news-list');

    if (!$(this).data('text-origin')) {
      $(this).data('text-origin', $(this).text());
    }

    if ($news_list.hasClass('extended')) {
      $(this).text($(this).data('text-origin'));
      $news_list.removeClass('extended');
    } else {
      $news_list.addClass('extended');
      $(this).text('Свернуть');
    }
  });

  $('.content .service-form select').each(function() {
    $(this).selectmenu();
  });
  $('.content .service-form input[type="submit"]').click(function(e) {
    e.preventDefault();
    $('#order').show();
    $('#order .close').click(function() {
      $(this).parent().parent().hide();
    });
  });

  $('.content .tag-cloud canvas').each(function() {
    $(this).css('width', $(this).parent().width()).tagcanvas({
      textColour: '#2e2e2e',
      outlineThickness: 1,
      maxSpeed: 0.03,
      depth: 0.75,
      wheelZoom: false,
      textFont: null,
      outlineColour: '#ff5d4c'
    });
  });

  $('.content .news-item .btn a, .header .geo a').click(function(e) {
    e.preventDefault();
    var $popup = $($(this).attr('href'));

    if ($popup.is('.popup-form')) {
      $popup.show();
      $popup.find('.close').click(function() {
        $popup.hide();
      });
    }
  });

});
