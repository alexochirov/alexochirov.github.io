$(document).ready(function() {
  (function($) {
    $(function() {
      "use strict";
      //begin of .shipment slider
      if ($('.shipment,.voyager').length) {
        var arrImage = [];
        $('.shipment__slide').each(function() {
          arrImage.push($(this).find('img').attr('src'));
        });
        $.each(arrImage, function(index, value) {
          $('.voyager').append('<div class="voyager__slide"><div class="voyager__block"><img src="' + value + '" ></div></div>')
        });
        $('.shipment').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
        });
        $('.voyager').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
          centerMode: false,
        });
        $('.voyager__slide').click(function() {
          var indexOfSlide = $(this).data('slick-index');
          $('.shipment').slick('slickGoTo', indexOfSlide);
        });
        $('.voyager').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          $('.shipment').slick('slickGoTo', nextSlide);
        });

      }
      //end of .shipment slider
      //begin of  .trend slick slider on main page
      if ($('.trend').length) {

        $('.trend').slick({
          infinite: true,
          dots: true,
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 5000,
          autoplayHoverPause: true,
          fade: false,
          swipeToSlide: true,
        });
      }
      $('.fabric__li:not(:first-child)').mouseenter(function() {
        $('.trend').addClass('js-active');
      }).mouseleave(function() {
        $('.trend').removeClass('js-active');
      });
      //end of  .trend slick slider on main page
      $(document).foundation({
        equalizer: {
          equalize_on_stack: true
        }
      });

      var $citySelect = $('.js-city-select');
      if ($citySelect.length) {
        $citySelect.on('click', function() {
          $('#citySelectPopup').foundation('reveal', 'open');
        });
      }

      $(".js-geocity-autocomplete").autocomplete({
        source: window.availableCities,
        search: function() {
          $('.js-geocity-button').attr('disabled', true);
        },
        select: function(event, ui) {
          $('.js-geocity-button').attr('disabled', false);
          return true;
        }
      });

      var $geocityButton = $('.js-geocity-button');
      if ($geocityButton) {
        $geocityButton.on('click', function() {
          $(this).parent('form').submit();
        });
      }

      var $geocityLinks = $('.geo-cities__item a');
      if ($geocityLinks) {
        $geocityLinks.on('click', function() {
          var $citySelectForm = $('#citySelectForm');
          $citySelectForm.find('input').val($(this).html());
          $citySelectForm.submit();
        });
      }

      var $cityPickupPointsShow = $('.js-city-pickup-points-show');
      if ($cityPickupPointsShow) {
        $cityPickupPointsShow.on('click', function() {
          $('#cityBoxberryPickupPopup').foundation('reveal', 'open');
        });
      }

      //begin of footer open list
      $('.b-footer-links__item h3').click(function(e) {
        if ($(this).hasClass('js-opened')) {
          $(this).toggleClass('js-opened');
        } else {
          $(this).toggleClass('js-opened');
        }
      });
      //end of footer open list

      //begin of input[type='file'] img preview
      function readURL(input, img) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function(e) {
            img.attr('src', e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
        }
      }

      $(".js-file-inp").change(function() {
        var img = $(this).closest('.file').find('.blah');
        readURL(this, img);
      });
      $('.file__delete').click(function() {
        $(this).closest('.file').removeClass('js-show');
      });

      $('.b-lk-content__download').click(function() {
        var inputRow = $('.file:not(.js-show)').first();
        inputRow.addClass('js-show').find('.js-file-inp').trigger('click');
      });
      //end of input[type='file'] img preview
      //begin of opening catalog in the my magazine
      (function() {
        $('.chapter>li').click(function() {

          if (!$(this).hasClass('js-opened')) {
            $('.chapter').find('.js-opened').removeClass('js-opened');
            $(this).addClass('js-opened');
          } else {
            $('.chapter').find('.js-opened').removeClass('js-opened');
          }


        });
        $('.chapter>li>ul a').click(function(e) {
          if (!$(this).hasClass('js-sel')) {
            $('.chapter').find('.js-sel').removeClass('js-sel');
            $(this).addClass('js-sel');
          } else {
            $('.chapter').find('.js-sel').removeClass('js-sel');
          }
          e.stopPropagation();
        });

      })();
      //end of opening catalog in the my magazine
      //begin of equalize of b-zhela__block

      if ($.fn.datepick) {
        $.datepick.regionalOptions["ru"];
        $.datepick.monthNavigation;
        $('.datp').datepick({
          showOtherMonths: true,
          selectDefaultDate: false,
          changeMonth: false,

          renderer: {
            picker: '<div class="b-news-item b-news_detal-calendar-pad">' +
              '' +
              '{months}</div>',
            monthRow: '{months}',
            month: '<div class="b-news-calendar-items__datepick-nav">{link:prev}{link:today}{link:next}</div><div class="b-news-calendar-items__monthHeader">{monthHeader:MM yyyy}</div><div class="b-news-calendar-items-header b-news-calendar-items b-news-calendar-font-12-white">{weekHeader}</div>{weeks}',
            weekHeader: '{days}',
            dayHeader: '{day}',
            week: '<div class="b-news-calendar-items b-news-calendar-font-12">{days}</div>',
            day: '{day}',
            monthSelector: '.month',
            daySelector: 'li',
            rtlClass: 'rtl',
            multiClass: 'multi',
            defaultClass: 'default',
            selectedClass: 'selected',
            highlightedClass: 'highlight',
            todayClass: 'b-newspage-calendar-activ',
            otherMonthClass: 'b-newspage-calendar-past other-month',
            weekendClass: 'weekend',
            commandClass: 'cmd-',
            disabledClass: 'disabled'
          }
        });
      }


      //$('.datp').datepick({
      //    changeMonth: false, showTrigger: '#calImg'}
      //);
      if ($.fn.fancybox) {
        $(".fancybox").fancybox({
          helpers: {
            overlay: {
              locked: false
            }
          }
        });
      }


      if ($('.js-razd.active').length) {

        $('.js-razd.active').parent().parent('ul').show();
        $('.js-razd.active').parent('li').addClass('active');
        $('.js-razd.active').parent().parent('ul').parent().parent('ul').show();
        $('.js-razd.active').parent('li').parent('ul').parent('li').addClass('active');
        $('.js-razd.active').parent('li').parent('ul').parent('li').parent('ul').parent('li').addClass('active');
      }
      $('.b-edit-product .js-razd').on('click', function() {
        $('.js-razd').removeClass('active');
        $(this).addClass('active');
        $('.js-in-razd').val($(this).data('sect'));
        $.post("/personal/shop/mycatalog/new-product/", {
          iblocksection_ajax: $(this).data('sect'),
          ajax_request: 1
        }, function(data) {
          $('.js-props-list').html(data);
        });
      });


      /**
       * Плавающая панель на странице офорсления оптовой покупки
       *
       * @type {*|HTMLElement}
       */
      if ($('#js-opt-short-info').length) {
        var doc = $(document);
        var onScroll = function(e) {
          var docTop = doc.scrollTop(),
            anchorTop = $('#js-opt-short-info-anchor').offset().top,
            anchorBottom = $('#js-opt-short-info-anchor-bottom').offset().top,
            content = $('#js-opt-short-info');

          if (docTop > anchorTop && docTop < (anchorBottom - content.height())) {
            if (!content.hasClass('fix-opt-panel')) {
              content.width(content.width());
              content.addClass('fix-opt-panel');
            }
          } else if (content.hasClass('fix-opt-panel'))
            content.removeClass('fix-opt-panel');

        };
        $(window).on('scroll', onScroll);
      }


      $(document).on('click', '.js-delpic', function() {

        if ($(this).parent().parent('.js-prev').hasClass('js-preview')) {
          $(this).parent().parent('.js-prev').remove();
        } else {
          if ($(this).parent().parent('.js-prev').hasClass('active')) {
            $(this).parent().parent('.js-prev').removeClass('active');


          };

          $(this).parent().parent('.js-prev').toggleClass('delete');

        }


        if (!$('.js-prev.active').length) {
          $.each($(".js-prev"), function(key, value) {
            if (!$(value).hasClass('delete')) {
              $(value).addClass('active');
              return false;
            }
          });
        }
      });
      $(document).on('click', '.js-glav', function() {

        $('.js-prev').removeClass('active');
        $(this).parent().parent('.js-prev').addClass('active');
        $(this).parent().parent('.js-prev').removeClass('delete');
      });
      $('.js-goaddtovar').on('submit', function() {
        $('.js-photos').html('');
        $.each($(".js-preview").not(".active"), function(key, value) {
          $('.js-photos').append('<input type="hidden" name="DOP_IMG[' + key + ']" value="' + $(value).data("fileid") + '">');
        });
        $('.js-photos').append('<input type="hidden" name="DETAIL_IMG" value="' + $('.js-prev.active').data('fileid') + '">');
        $.each($(".js-prev.delete"), function(key, value) {
          $('.js-photos').append('<input type="hidden" name="DELETE_IMG[' + key + ']" value="' + $(value).data("fileid") + '">');
        });


      });

      var dropbox = $('#dropbox'),
        message = $('.message', dropbox);
      if ($.fn.filedrop) {
        dropbox.filedrop({
          paramname: 'pic',

          maxfiles: 15,
          maxfilesize: 2,
          url: '/ajax/post_file.php',

          uploadFinished: function(i, file, response) {
            $.data(file).addClass('done');
            $('.js-prev').removeClass('active');
            $('.js-prev:first').addClass('active');
            if (response.code == 1)
              $.data(file).attr('data-fileid', response.id);
          },

          error: function(err, file) {
            switch (err) {
              case 'BrowserNotSupported':
                showMessage('Ваш Браузер не поддерживает HTML5!');
                break;
              case 'TooManyFiles':
                alert('Разрешено загружать за 1 раз не более 5 изображений');
                break;
              case 'FileTooLarge':
                alert(file.name + ' Слишком большой.Разрешена загрузка файлов не более 2мб.');
                break;
              default:
                break;
            }
          },

          beforeEach: function(file) {
            if (!file.type.match(/^image\//)) {
              alert('Разрешена загрузка только изображений!!!!');
              return false;
            }

          },

          uploadStarted: function(i, file, len) {

            createImage(file);
          },

          progressUpdated: function(i, file, progress) {
            $.data(file).find('.progress').width(progress);
          }
        });
      }


      var template = '<div class="preview js-prev js-preview">' +
        '<span class="imageHolder">' +
        '<img />' +
        '<span class="uploaded"></span>' +
        '<span class="deleteimg"></span>' +
        '</span>' +
        '<div class="b-catalog-main-items-hover hover">' +
        ' <div class="btn btn_gray js-delpic" > Удалить</div>' +
        '<div onclick="this.event.preventDefault()" class="btn btn_red js-glav"  > Сделать главной</div>' +
        '</div>' +
        '<div class="progressHolder">' +
        '<div class="progress"></div>' +
        '</div>' +
        '</div>';


      function createImage(file) {

        var preview = $(template),
          image = $('img', preview);

        var reader = new FileReader();

        image.width = 100;
        image.height = 100;

        reader.onload = function(e) {

          image.attr('src', e.target.result);

        };

        reader.readAsDataURL(file);

        message.hide();
        preview.appendTo(dropbox);

        $.data(file, preview);
      }

      function showMessage(msg) {
        message.html(msg);
      }


      var anc = window.location.hash.replace("#", "");
      if (anc == "group") {
        $('.js-group').addClass('active');
        $('.js-nogroup').removeClass('active');
        $('.js-notab').removeClass('active');
        $('.js-tab').addClass('active');
      }

      $(".js-gogroup").on('click', function() {
        $('.js-group').addClass('active');
        $('.js-nogroup').removeClass('active');
        $('.js-notab').removeClass('active');
        $('.js-tab').addClass('active');
      });

      if (!$.cookie('show')) {
        $.cookie('show', 'grid', {
          path: '/'
        });
      }

      $('.js-send-review').on('click', function() {
        $.ajax({
          url: "/catalog/add_review.php",
          data: $(this).parent('.js-review').serializeArray(),

          success: function(data) {
            var result = jQuery.parseJSON(data);
            if (result.status == 0) {
              $('.js-review_error').html(result.error);
            } else if (result.status == 1) {
              $('.js-review').html('<div class="b-review__success">Ваш отзыв успешно добавлен</div>');
            }
          },
          error: function() {
            alert("Не удалось");
          }

        });
      });
      if ($.fn.barrating) {
        $('#product_stars').barrating({
          theme: 'fontawesome-stars'
        });
      }


      $('.js-sale-one').on('click', function() {

        if (typeof window.ajaxProcessed == 'undefined' || window.ajaxProcessed != true) {
          var action = $(this).data('action');
          var checked = [];
          $.each($("input[name='groupid[]']:checked"), function(key, val) {

            checked.push($(this).val());
          });
          if (!checked.length) {
            alert('Не выбраны товары');
          } else {

            window.ajaxProcessed = true;
            $.ajax({
              url: "/personal/shop/mycatalog/ajax-items-sale-one.php",
              data: {
                "ID": checked,
                "action": action,
                "all": $("#js-all-checked").val(),
                "group": $('#js-group-checked').val()
              },
              success: function(data) {
                alert(data);
                location.href = location.href;
              },
              error: function() {
                alert("Ошибка выполнения запроса");
                window.ajaxProcessed = false;
              }

            });

          }
        } else alert('Дождитесь выполнения запроса');
      });

      $('.js-deleteall').on('click', function() {
        var checked = [];
        $.each($("input[name='groupid[]']:checked"), function(key, val) {

          checked.push($(this).val());
        });
        if (!checked.length) {
          alert('Не выбраны товары');
        } else {
          if (confirm('Вы уверены, что хотите удалить выбранные товары?')) {
            $.ajax({
              url: "/personal/shop/mycatalog/ajax-items-delete.php",
              data: {
                "ID": checked,
                "all": $("#js-all-checked").val(),
                "group": $('#js-group-checked').val()
              },
              success: function(data) {
                location.href = location.href;
              },
              error: function() {
                alert("Не удалось удалить товары");
              }

            });
          } else return false;
        }
      });

      $('.js-delete').on('click', function() {
        var id = $(this).data('delete');
        if (confirm('Вы уверены, что хотите удалить выбранный товар?')) {
          $.ajax({
            url: "/personal/shop/mycatalog/ajax-items-delete.php",
            data: {
              "ID": id
            },
            success: function(data) {
              location.href = location.href;
            },
            error: function() {
              alert("Не удалось удалить товар");
            }

          });
        } else return false;
      });

      $('.js-allcheck').on('click', function() {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
          $('.js-check').addClass('active');
          $('.js-cbox').prop("checked", true);
          if ($(this).attr('data-source') == 'catalog')
            $('#js-all-checked').val('1');
          else $('#js-all-checked').val('');

          $('.js-allcheck').removeClass('active');
          $(this).addClass('active');
        } else {
          $('.js-allcheck').removeClass('active');
          $('.js-check').removeClass('active');
          $('.js-cbox').prop("checked", false);
          $('#js-all-checked').val('');
        }
      });

      $('.js-check-group').on('click', function() {
        $(this).toggleClass('active');

        if ($(this).hasClass('active')) {
          $('.js-allcheck').removeClass('active');
          $('.js-check').removeClass('active');
          $('.js-cbox').prop("checked", false);
          $('#groupItems').foundation('reveal', 'open');

        } else {
          $('#js-group-checked').val('');
          $('#group-select-form-uncheck').submit();
        }
      });

      $('.js-manygroup').on('click', function() {

        var checked = [];
        $.each($("input[name='groupid[]']:checked"), function(key, val) {
          checked.push($(this).val());
        });

        if (!checked.length) {
          alert('Не выбраны товары');
        } else {
          $.each($('.js-many-replace'), function(key, val) {
            var label = $(this).children('label').html();

            $(this).html('<div class="b-radio">' + '<input id="PERSON_TYPE_' + $(this).data("prodid") + '" type="radio" class="b-radio__inp" name="gridID[]" value="' + $(this).data("prodid") + ' ">' + ' <label for="PERSON_TYPE_' + $(this).data("prodid") + '" class="b-radio__label">' + label + '</label>' + '</div>');
          });
          $.ajax({
            url: '/ajax/goodslist.php',
            data: {
              "IDS": checked,
              "all": $('#js-all-checked').val(),
              "group": $('#js-group-checked').val()
            },
            success: function(data) {
              $(data).insertBefore('.js-buttons');
            }
          });
          $('.js-hide').hide();
          $('#GroupModal').foundation('reveal', 'open');

          $('.js-save').on('click', function(e) {
            e.preventDefault();
            var checked = {
              ID: []
            };
            var url = "/personal/shop/groups/ajax-items-add.php";
            var IDS = [];
            var PRICES = [];

            $.each($("input[name='product_id[]']"), function(key, val) {
              IDS[key] = $(this).val();

              if ($("#pr" + $(this).val()).length > 0) {
                if ($("#pr" + $(this).val()).val().length) {
                  PRICES[key] = $("#pr" + $(this).val()).val();
                }
              }
            });

            $.ajax({
              url: url,
              type: "POST",
              data: {
                ID: IDS,
                PRICE: PRICES,
                GROUP: $("input[name='gridID[]']:checked").val()
              },
              success: function(data) {
                if (data == '1') {
                  $('#GroupModal').foundation('reveal', 'close');
                  alert("Добавлено к совместной покупке.");
                } else alert("Ошибка добавления.");
              }
            });

            return false;
          });
        }
      });

      $('.js-manygroup-opt').on('click', function() {

        var checked = [];
        $.each($("input[name='groupid[]']:checked"), function(key, val) {
          checked.push($(this).val());
        });

        if (!checked.length) {
          alert('Не выбраны товары');
        } else {
          $.each($('.js-many-replace-opt'), function(key, val) {
            var label = $(this).children('label').html();

            $(this).html('<div class="b-radio">' + '<input id="PERSON_TYPE_' + $(this).data("prodid") + '" type="radio" class="b-radio__inp" name="gridID[]" value="' + $(this).data("prodid") + ' ">' + ' <label for="PERSON_TYPE_' + $(this).data("prodid") + '" class="b-radio__label">' + label + '</label>' + '</div>');
          });
          $.ajax({
            url: '/ajax/goodslist.php',
            data: {
              "IDS": checked,
              "all": $('#js-all-checked').val(),
              "group": $('#js-group-checked').val()
            },
            success: function(data) {
              $(data).insertBefore('.js-buttons');
            }
          });
          $('.js-hide').hide();
          $('#GroupModalOpt').foundation('reveal', 'open');

          $('.js-save-opt').on('click', function(e) {
            e.preventDefault();
            var checked = {
              ID: []
            };
            var url = "/ajax/add-product-to-opt-group.php";
            var IDS = [];
            var PRICES = [];

            $.each($("input[name='product_id[]']"), function(key, val) {
              IDS[key] = $(this).val();

              if ($("#pr" + $(this).val()).length > 0) {
                if ($("#pr" + $(this).val()).val().length) {
                  PRICES[key] = $("#pr" + $(this).val()).val();
                }
              }
            });

            $.ajax({
              url: url,
              type: "POST",
              data: {
                ID: IDS,
                PRICE: PRICES,
                GROUP: $("input[name='gridID[]']:checked").val()
              },
              success: function(data) {
                if (data == '1') {
                  $('#GroupModalOpt').foundation('reveal', 'close');
                  alert("Добавлено к оптовой покупке.");
                } else alert("Ошибка добавления.");
              }
            });

            return false;
          });
        }
      });


      $('.js-group').on('click', function() {
        var grid = $(this).data('grid');
        $('.js-hide').show();
        $('#GroupModal').foundation('reveal', 'open');
        /*$.getJSON('/personal/shop/groups/ajax-get-user-purhaise-list.php', function(data){
         console.log(data);
         });*/
        $('.js-save').on('click', function(e) {
          e.preventDefault();

          var checked = {
            ID: []
          };
          var urls = [];
          var url = "/personal/shop/groups/ajax-items-add.php";
          var IDS = [];
          var PRICES = [];

          $.each($("input[name='gridID[]']:checked"), function(key, val) {

            checked.ID.push($(this).val());

            IDS[0] = grid;

            if ($("#pr" + $(this).val()).length > 0) {
              if ($("#pr" + $(this).val()).val().length) {
                PRICES[0] = $("#pr" + $(this).val()).val();
              }
            }

            $.ajax({
              url: url,
              type: "POST",
              data: {
                ID: IDS,
                PRICE: PRICES,
                GROUP: $(this).val()
              },
              success: function(data) {
                if (data == 1) {
                  alert("Добавлено к совместной покупке.");
                  location.href = location.href;
                  $(this).removeAttr('checked');
                  $("#pr" + $(this).val()).val('');
                  if (checked.ID.length) {
                    $('#GroupModal').foundation('reveal', 'close');
                    // location.href = location.href
                    //var recursiveDecoded = decodeURIComponent($.param(checked));
                    /**/
                  }
                } else alert("Ошибка добавления.");


              }
            });


          });


        });
      });

      $('.js-cancel').on('click', function() {
        $('#GroupModal').foundation('reveal', 'close');
      });

      $('.js-check').on('click', function() {
        var id = $(this).data('check');
        $('[data-check="' + id + '"]').toggleClass('active');
        $('[data-checkbox="' + id + '"]').toggleChecked();
        $('.js-allcheck').removeClass('active');

      });

      $('.js-print-all').on('click', function() {
        $.each($("input[name='order']"), function() {
          $(this).closest("tr").removeClass("no-print");
        });
        window.print();
      });

      $('.js-print-selected').on('click', function() {
        $.each($("input[name='order']"), function() {
          $(this).closest("tr").removeClass("no-print");
        });
        var checked = [];
        $.each($("input[name='order']:not(:checked)"), function() {
          $(this).closest("tr").addClass("no-print");
        });
        $.each($("input[name='order']:checked"), function() {
          checked.push($(this).val());
        });
        if (!checked.length) {
          alert('Не выбраны товары');
        } else {
          window.print();
        }
      });

      $('.js-import-excel').on('click', function() {
        var orders = {};
        var html = '';
        var ordersCnt = 0;

        var rows = $('.b-orders-table').find('tr');
        for (var i = 1; i < rows.length; i++) {
          orders[i - 1] = {};

          var content = [];
          var orderContent = $(rows[i]).find('td:eq(3)').find('p');
          for (var j = 0; j < orderContent.length; j++) {
            html = $(orderContent[j]).find('a:eq(0)').html();
            if (typeof html != 'undefined' && html != '') {
              content.push(html);
            }

          }

          var properties = [];
          var orderProperties = $(rows[i]).find('td:eq(7)').find('p');
          for (var j = 0; j < orderProperties.length; j++) {
            html = $(orderProperties[j]).html();
            if (typeof html != 'undefined' && html != '')
              properties.push(html);
          }

          var buytype = [];
          var orderBuytype = $(rows[i]).find('td:eq(8)').find('p');
          for (var j = 0; j < orderBuytype.length; j++) {
            buytype[j] = $(orderBuytype[j]).html();
          }

          if (content.length > 0) {

            orders[ordersCnt]['id'] = $(rows[i]).find('td:eq(1)').html();
            orders[ordersCnt]['date'] = $(rows[i]).find('td:eq(2)').html();
            orders[ordersCnt]['content'] = content;
            orders[ordersCnt]['price'] = $(rows[i]).find('td:eq(4)').html();
            orders[ordersCnt]['delivery'] = $(rows[i]).find('td:eq(5)').find('p:eq(0)').html();
            orders[ordersCnt]['status'] = $(rows[i]).find('td:eq(6)').html();
            orders[ordersCnt]['properties'] = properties;
            orders[ordersCnt]['buytype'] = buytype;

            ordersCnt++;
          }
        }

        $.ajax({
          url: "/personal/shop/orders/ajax-items-import-excel.php",
          type: "POST",
          data: {
            "orders": JSON.stringify(orders)
          },
          success: function(output) {
            var data = $.parseJSON(output);
            document.location.href = (data.url);
          },
          error: function() {
            alert("не удалось");
          }
        })
      });

      $('.js-set-status').on('click', function() {
        var status = $(this).data("id");
        if (status == "SO") {
          $("#tracking_code").show();
          var track = $("#tracking_code").val();
          if (track.length) {
            var checked = [];
            var elemIds = [];
            $.each($("input[name='order']:checked"), function(key, val) {
              checked.push($(this).val());
              elemIds.push($(this).data("elem-id"));
            });
            if (!checked.length) {
              alert('Не выбраны товары');
            } else {
              console.log(elemIds);
              console.log(checked);
              $.ajax({
                url: "/personal/shop/orders/ajax-items-set-status.php",
                data: {
                  "ID": checked,
                  "status": status,
                  "track": track,
                  "elements": elemIds
                },
                success: function(data) {
                  if (data == '')
                    alert("успешно");
                  else alert(data);
                  location.href = location.href;
                },
                error: function() {
                  alert("Не удалось");
                }

              });
            }
          }
        } else {
          var checked = [];
          $.each($("input[name='order']:checked"), function(key, val) {
            checked.push($(this).val());
          });
          if (!checked.length) {
            alert('Не выбраны товары');
          } else {
            $.ajax({
              url: "/personal/shop/orders/ajax-items-set-status.php",
              data: {
                "ID": checked,
                "status": status
              },
              success: function(data) {
                if (data == '')
                  alert("успешно");
                else alert(data);

                location.href = location.href;
              },
              error: function() {
                alert("Не удалось");
              }

            });
          }
        }
      });

      $('.js-generate-invoice').on('click', function() {
        var invoice_id = $(this).data("invoice-id");
        var invoice_rsid = $(this).data("invoice-rsid");

        $.ajax({
          url: "/personal/shop/orders/ajax-generate-invoice.php",
          type: "POST",
          data: {
            "invoice_id": invoice_id,
            "invoice_rsid": invoice_rsid
          },
          success: function(output) {
            var data = $.parseJSON(output);
            document.location.href = (data.url);
          },
          error: function() {
            alert("не удалось");
          }
        })
      });

      //begin of change color of a in  button on hover
      $('.b-catalog-main-items-hover>button').mouseenter(function() {
        $('a', this).addClass("js-white-link");
      }).mouseleave(function() {
        $('a', this).removeClass("js-white-link");
      });
      //end of change color of a in  button on hover
      $('.goto').on('click', function() {
        location.href = $(this).data('goto');
      });

      $('.js-sort').on('change', function() {
        location.href = $(this).val();
      });

      function addProductToCart(id, name, price, params, group) {
        if (typeof window.isAjaxRequest != 'undefined' && window.isAjaxRequest)
          return;

        window.isAjaxRequest = true;

        $.ajax({
          type: "post",
          url: '/ajax/smallbasket.php',
          data: {
            id: id,
            quantity: 1,
            name: name,
            price: price,
            group: group,
            params: params
          },
          dataType: "html",
          success: function(out) {
            window.isAjaxRequest = false;
            location.href = "/personal/basket";
          }
        });
      }

      // Добавление в корзину по цене совместной покупки
      $('.js-add-to-cart-group').on('click',
        function() {
          var productID = $(this).attr('data-id');
          var productName = $(this).attr('data-name');
          var productPrice = $(this).attr('data-price');
          var productGroup = $(this).attr('data-group');
          var productParams = {};

          if ($('.color-picker.selected').length > 0)
            productParams.productColor = $('.color-picker.selected').attr('data-color');

          if ($('#js-product-size').length > 0)
            productParams.productSize = $('#js-product-size').val();

          addProductToCart(productID, productName, productPrice, productParams, productGroup);

          return false;
        }
      );

      function activateGroupProducts(step, element) {
        $.ajax({
          type: "post",
          url: '/ajax/group-actions.php',
          data: {
            group: $(element).attr('data-group'),
            action: "activate-group",
            step: step
          },
          dataType: "html",
          success: function(out) {
            if (out == 'Y')
              location.href = "/personal/shop/groups/";
            else activateGroupProducts(out, element);
          }
        });
      }

      $('.js-activate-group').on('click',
        function() {
          $(this).html('Идет публикация, дождитесь завершения...');
          activateGroupProducts(0, this);
          return false;
        }
      );

      function activateGroupOptProducts(step, element) {
        $.ajax({
          type: "post",
          url: '/ajax/group-actions.php',
          data: {
            group: $(element).attr('data-group'),
            action: "activate-group-opt",
            step: step
          },
          dataType: "html",
          success: function(out) {
            if (out == 'Y')
              location.href = "/personal/shop/opt/";
            else activateGroupOptProducts(out, element);
          }
        });
      }

      $('.js-activate-group-opt').on('click',
        function() {
          $(this).html('Идет публикация, дождитесь завершения...');
          activateGroupOptProducts(0, this);
          return false;
        }
      );

      $(document).on('click', '.js-add-cart',
        function(e) {
          e.preventDefault();
          e.stopPropagation();

          var productID = $(this).siblings('#js-id').val();
          var productName = $(this).siblings('#js-product-name').val();
          var productPrice = $(this).siblings('#js-product-price').val();
          var productParams = {};

          if ($('.color-picker.selected').length > 0)
            productParams.productColor = $('.color-picker.selected').attr('data-color');

          if ($('#js-product-size').length > 0)
            productParams.productSize = $('#js-product-size').val();

          addProductToCart(productID, productName, productPrice, productParams, '');

          return false;
        }
      );

      $('.b-search__close').bind('click', function() {
        $('#form__search').removeClass("active");
        $('.b-main-menu__item_form').css("width", "50%");
        $('.b-main-menu__item_my').show();
        $('#form__search').val('');
        $('.b-main-menu__item_form__search button').hide();
      });

      $('#form__search').bind('focus', function() {
        $(this).addClass("active");
        $('.b-main-menu__item_form').css("width", "75%");
        $('.b-main-menu__item_my').hide();
        $('.b-main-menu__item_form__search button').show();
      });

      $(function() {
        $('.js-item').each(function(event) {
          if ($(this).hasClass('active')) {

            $(this).children('.js-arrow').rotate({
              animateTo: 180
            });
            $(this).children('.js-menu').slideDown('slow');
          }
        });

        // Выбор активного пункта меню для страниц Быстрых ссылок
        $('.js-menu-quickpage .b-catalog-menu-item').each(function() {
          if ($(this).hasClass('active')) {
            var $parents = $(this).parents('.js-menu');

            $parents.each(function() {
              $(this).slideDown('slow');
              $(this).parents('.js-item').addClass('active');
              $(this).siblings('.js-arrow').rotate({
                animateTo: 180
              });
            });
          }
        });

        $('.b-edit-product .js-arrow').on('click', function() {
          if ($(this).parent('.js-item').hasClass('active')) {
            $(this).parent('.js-item').removeClass('active');
            $(this).rotate({
              animateTo: 0
            });
            $(this).siblings('.js-menu').slideUp('slow');
          } else {
            $(this).parent('.js-item').addClass('active');
            $(this).rotate({
              animateTo: 180
            });
            $(this).siblings('.js-menu').slideDown('slow');
          }
        });

        $('.js-menu .js-arrow').on('click', function() {
          $('.js-menu').uniqueId();

          var $this = $(this),
            stateOpened = $(this).parent().hasClass('active'),
            $parentItems = $this.parents('.js-item'),
            $parentMenu = $this.parents('.js-menu'),
            parentMenuIDs = [];

          $parentMenu.each(function() {
            parentMenuIDs.push($(this).attr('id'));
          });

          $('.js-menu .js-menu .js-item').removeClass('active');

          $('.js-menu .js-menu .js-menu').each(function() {
            if (parentMenuIDs.indexOf($(this).attr('id')) == -1)
              $(this).slideUp('slow');
          });
          $('.js-menu .js-menu .js-arrow').rotate({
            animateTo: 0
          });

          $parentItems.addClass('active');
          $parentMenu.show();
          $parentItems.children('.js-arrow').rotate({
            animateTo: 180
          });

          if (!stateOpened) {
            $this.rotate({
              animateTo: 180
            });
            $this.siblings('.js-menu').slideDown('slow');
          } else {
            $this.rotate({
              animateTo: 0
            });
            $(this).parent().removeClass('active');
            $this.siblings('.js-menu').slideUp('slow');
          }
        });

        $('.js-link').on('click', function() {
          if ($(this).parent('.js-item').hasClass('active')) {
            $(this).parent('.js-item').removeClass('active');
            $(this).siblings('.js-arrow').rotate({
              animateTo: 0
            });
            $(this).siblings('.js-menu').slideUp('slow');
          } else {
            $(this).parent('.js-item').addClass('active');
            $(this).siblings('.js-arrow').rotate({
              animateTo: 180
            });
            $(this).siblings('.js-menu').slideDown('slow');
          }
        });
        // Проверка полей на валидность форма "Стать продавцом"
        $('#js-trade-on').off('submit').on('submit', function() {
          var fError = false;
          $('.b-lk-content__error').remove();
          if (!$("[name='user_agrmnt']").is(":checked")) {
            alert("Примите условия соглашения!");
            return false;
          }
          $.each($(this).serializeArray(), function(index, field) {
            $('[name="' + field.name + '"]').removeClass('error');

            if (field.value.length < 1 && field.name != 'UF_KPP' && field.name != 'gridPRICE[]' && field.name != 'UF_TARIFFLIST') {
              fError = true;
              $('[name="' + field.name + '"]').addClass('error');
              $('[name="' + field.name + '"]').after('<div class="b-lk-content__error">Поле не заполнено</div>');
            } else {
              if (field.name == "WORK_MAILBOX") {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(field.value)) {
                  $('[name="' + field.name + '"]').after('<div class="b-lk-content__error">Email некорректен</div>');
                  fError = true;
                }
              }
            }
          });

          if (fError == true)
            return false;
          else return true;
        });
        //begin of vsplivaushaa korzina
        $('.b-main-menu__item_basket').mouseenter(function() {
          $('.b-vipa').attr("style", "display:block");
          $('.b-vipa').mouseenter(function() {
            $('.b-vipa').attr("style", "display:block");
          }).mouseleave(function() {
            $('.b-vipa').attr("style", "display:none");
          });

        }).mouseleave(function() {
          $('.b-vipa').attr("style", "display:none");
        });
        //end of vsplivaushaa korzina

        $('.js-carousel-hots-main').on('jcarousel:create jcarousel:reload', function() {
          var element = $(this),
            width = element.innerWidth();

          if (width > 937) {
            width = width / 4;
          } else if (width < 617) {
            width = width / 2;
          } else {
            width = width / 3;
          }

          element.jcarousel('items').css('width', width + 'px');
        }).jcarousel({});

        $('.js-carousel-hots-main-prev')
          .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
          })
          .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
          })
          .jcarouselControl({
            target: '-=1'
          });
        $('.js-carousel-hots-main-next')
          .on('jcarouselcontrol:active', function() {
            $(this).removeClass('inactive');
          })
          .on('jcarouselcontrol:inactive', function() {
            $(this).addClass('inactive');
          })

          .jcarouselControl({
            target: '+=1'
          });

      });

      $("body").on("click", "li#x-catalog-main-select__item-table", function() {
        $(this).addClass('b-catalog-main-select__item-table-active');
        $('.b-catalog-main-select__item-spisok').removeClass('b-catalog-main-select__item-spisok-active');
        $('.b-catalog-main-items-spisok').hide();
        $('.b-catalog-main-items-table').show();
        $.cookie('show', 'grid', {
          path: '/'
        });
        $('.b-sort__rile').hide();
        $('.b-sort__tile').show()
      });
      $("body").on("click", "li#x-catalog-main-select__item-spisok", function() {
        $(this).addClass('b-catalog-main-select__item-spisok-active');
        $('.b-catalog-main-select__item-table').removeClass('b-catalog-main-select__item-table-active');
        $('.b-catalog-main-items-spisok').show();
        $('.b-catalog-main-items-table').hide();
        $.cookie('show', 'list', {
          path: '/'
        });
        $('.b-sort__tile').hide();
        $('.b-sort__rile').show()
      });

      //begin of switch catalog type in the top menu
      $("body").on("click", ".b-sort__rile", function() {
        $('li#x-catalog-main-select__item-table').addClass('b-catalog-main-select__item-table-active');
        $('.b-catalog-main-select__item-spisok').removeClass('b-catalog-main-select__item-spisok-active');

        $(this).hide();
        $('.b-sort__tile').show()
        $('.b-catalog-main-items-spisok').hide();
        $('.b-catalog-main-items-table').show();
        $.cookie('show', 'grid', {
          path: '/'
        });
      });

      $("body").on("click", ".b-sort__tile", function() {
        $('li#x-catalog-main-select__item-spisok').addClass('b-catalog-main-select__item-spisok-active');
        $('.b-catalog-main-select__item-table').removeClass('b-catalog-main-select__item-table-active');

        $(this).hide();
        $('.b-sort__rile').show()
        $('.b-catalog-main-items-spisok').show();
        $('.b-catalog-main-items-table').hide();
        $.cookie('show', 'list', {
          path: '/'
        });
      });
      //end of switch catalog type in the top menu

      //begin of filter opening on mobile
      $('.b-sort__filter').click(function() {
        $(".b-catalog-sidebar-filter").toggleClass('js-opening');
      });
      $('.b-catalog-sidebar-filter__close').click(function() {
        $('.b-catalog-sidebar-filter').removeClass('js-opening');
      });
      //end of filter opening on mobile

      $('#myTabs').on('toggled', function(event, tab) {
        console.log(tab);
      });

      $('.js-impinfo').on('click', function(e) {
        e.preventDefault()
        $('#js-import-additional-info').slideToggle();
      });

      $('.js-select-section').on("change", function() {
        $.post("/personal/shop/catalog/new-product/", {
          iblocksection_ajax: $(this).val(),
          ajax_request: 1
        }, function(data) {
          $('.js-props-list').html(data);
        });
      });

      initDropDown();

      /* Нано-технологии для подсказки */
      $('.b-lk-content__input-label').on("mouseenter", function() {
        clearTimeout($(this).parent().find('.b-lk-content__tool').attr('timerid'));
        $(this).parent().find('.b-lk-content__tool').show();
      });
      $('.b-lk-content__input-label').on("mouseleave", function() {
        clearTimeout($(this).parent().find('.b-lk-content__tool').attr('timerid'));
        $(this).parent().find('.b-lk-content__tool').attr('timerid', setTimeout("$('.b-lk-content__tool').hide()", 1000));
      });
      $('.b-lk-content__tool').on("mouseenter", function() {
        clearTimeout($(this).attr('timerid'));
      });
      $('.b-lk-content__tool').on("mouseleave", function() {
        $(this).hide();
        clearTimeout($(this).attr('timerid'));
      });

      // Подгрузка размеров упаковки
      if ($('.js-package-standart-size select'))
        loadPackageSizesList($('.js-package-standart-size select'));

    });
  })(jQuery);


  (function($) {
    var connector = function(itemNavigation, carouselStage) {
      return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };
    /*
     * Карусель на странице товара
     */

    var jcarousel = $('.jcarousel');

    jcarousel
      .on('jcarousel:reload jcarousel:create', function() {
        var carousel = $(this),
          width = carousel.innerWidth();
        carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
      })
      .jcarousel({
        wrap: 'circular'
      });

    $('.jcarousel-slider-tovar-pagination')
      .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');

        var prev_height = $('.jcarousel-slider-tovar-control-prev').height();
        var pagination_height = $(this).parent().parent().height() - prev_height;
        var top_item = $(this).offset().top - $(this).parent().offset().top + parseInt($(this).parent().css('margin-top'));
        var top_height = $('.jcarousel-slider-tovar-pagination').width() + parseInt($('.jcarousel-slider-tovar-pagination a:first').css('margin-top'));
        if (pagination_height < top_item)
          $(this).parent().css("margin-top", parseInt($(this).parent().css('margin-top')) - top_height);
        else if (0 > top_item)
          $(this).parent().css("margin-top", parseInt($(this).parent().css('margin-top')) + top_height);


      })
      .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
      })
      .jcarouselPagination({
        item: function(page) {

          return '<a href="#' + page + '"><img src="' + $('.jcarousel ul li').eq(page - 1).attr('attr-image-small') + '" alt=""/></a>';
        }
      });
    $('.jcarousel-control-prev')
      .jcarouselControl({
        target: '-=1'
      });

    $('.jcarousel-control-next')
      .jcarouselControl({
        target: '+=1'
      });
    $('.jcarousel-slider-tovar-control-prev')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '-=1'
      });
    $('.jcarousel-slider-tovar-control-next')
      .on('jcarouselcontrol:active', function() {
        $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
        $(this).addClass('inactive');
      })
      .jcarouselControl({
        target: '+=1'
      });

    if (typeof window.paymentRedirect != 'undefined' && window.paymentRedirect) {
      $('.b-access__oplata').click();
    }

  })(jQuery);
});

$(document).ready(function() {
  if ($.fn.fancybox != undefined) {
    $("a.group").fancybox({
      'transitionIn': 'elastic',
      'transitionOut': 'elastic',
      'speedIn': 600,
      'speedOut': 200,
      'overlayShow': false
    });
  }


  equalizeZhela();
  equalizeJcar();
  //responseWidthDropMenu();
  openedCatMenu();
});
$(window).resize(function() {
  equalizeZhela();
  equalizeJcar();
  //responseWidthDropMenu();
  openedCatMenu();
});

window.onload = function() {

  var target_1 = document.querySelector('.pay-card-1');
  var goal_1 = document.querySelector('#pay-card-full-1');
  if (target_1 && goal_1) {
    target_1.onmouseover = function() {
      goal_1.style.display = 'block';
    }

    target_1.onmouseout = function() {
      goal_1.style.display = 'none';
    }
  }


  var target_2 = document.querySelector('.pay-card-2');
  var goal_2 = document.querySelector('#pay-card-full-2');
  if (target_2 && goal_2) {
    target_2.onmouseover = function() {
      goal_2.style.display = 'block';
    }

    target_2.onmouseout = function() {
      goal_2.style.display = 'none';
    }
  }


  var target_3 = document.querySelector('.pay-card-3');
  var goal_3 = document.querySelector('#pay-card-full-3');
  if (target_3 && goal_3) {
    target_3.onmouseover = function() {
      goal_3.style.display = 'block';
      // target_3.style.display = 'none';
    }

    target_3.onmouseout = function() {
      goal_3.style.display = 'none';
    }
  }


  var target_4 = document.querySelector('.pay-card-4');
  var goal_4 = document.querySelector('#pay-card-full-4');
  if (target_4 && goal_4) {
    target_4.onmouseover = function() {
      goal_4.style.display = 'block';
    }

    target_4.onmouseout = function() {
      goal_4.style.display = 'none';
    }
  }

}


function f(k, v) {
  var obg = {}
  obg[k] = v;
  return obg;
}


/**
 * Изменение варианта посылки (скрытие стандартной/нестандартной)
 * @param el
 */
function changePackage(el) {
  $('.js-weight-property').show();
  $('.js-weight-property input').removeAttr('readonly').val('');
  $('.js-package-standart-size').hide();
  $('#package-sizes-list').val('');
  $('#js-packages').val('');
  $('#property_207').hide();
  $('#property_189').hide();

  if ($(el).val() == 129) {
    $('#property_189').show();
  } else if ($(el).val() == 128) {
    $('#property_207').slideDown();
    $('.js-weight-property input').attr('readonly', 'true');
  }
}

/**
 * Изменение стандартных размеров посылки при выборе из списка
 */
function changePackageSizes(el) {
  $('.js-weight-property input').val('').removeAttr('readonly');

  if ($(el).val() == 122 || $(el).val() == 123) // если выбран конверт или бандероль, необходимо скрыть размеры товара
  {
    $('.js-weight-property').hide();
    $('.js-package-standart-size').hide();
    $('#package-sizes-list').val('');
  } else {
    $('.js-weight-property input').attr('readonly', 'true');
    $('.js-weight-property').show();

    $.ajax({
      url: "/ajax/delivery-package.php",
      data: {
        package: $(el).find("option:selected").text()
      },
      error: function() {
        alert("Не удалось выполнить запрос");
      },
      success: function(data) {
        var result = jQuery.parseJSON(data),
          options = '<option value="">выберите размер упаковки</option>';

        $.each(result, function() {
          options += '<option value="' + this['NAME'] + '" data-width="' + this['PROPERTY_WIDTH_VALUE'] + '" data-height="' + this['PROPERTY_HEIGHT_VALUE'] + '" data-length="' + this['PROPERTY_LENGTH_VALUE'] + '">' + this['NAME'] + "</option>";
        });

        $('.js-package-standart-size select').html(options);
        $('.js-package-standart-size').show();
      }
    });

  }
}

function loadPackageSizesList(el) {
  $.ajax({
    url: "/ajax/delivery-package.php",
    data: {
      package: $('#js-packages').find("option:selected").text()
    },
    success: function(data) {
      if (data == '') return;
      var result = jQuery.parseJSON(data),
        options = '<option value="">выберите размер упаковки</option>';

      var selectedValue = $('.js-package-standart-size select').attr('data-value');
      var optionSelected = '';

      $.each(result, function() {
        optionSelected = '';
        if (this['NAME'] == selectedValue)
          optionSelected = ' selected ';

        options += '<option' + optionSelected + ' value="' + this['NAME'] + '" data-width="' + this['PROPERTY_WIDTH_VALUE'] + '" data-height="' + this['PROPERTY_HEIGHT_VALUE'] + '" data-length="' + this['PROPERTY_LENGTH_VALUE'] + '">' + this['NAME'] + "</option>";
      });

      $('.js-package-standart-size select').html(options);
    }
  });
}

function changePackageSizeSelected(el) {
  $('#js-product-length').val($(el).find("option:selected").attr('data-length')).attr('readonly', 'true');
  $('#js-product-width').val($(el).find("option:selected").attr('data-width')).attr('readonly', 'true');
  $('#js-product-height').val($(el).find("option:selected").attr('data-height')).attr('readonly', 'true');
}

function equalizeZhela() {
  if ($(window).width() > 623) {
    $(".b-zhela__block").each(function(indx, element) {
      $(element).find('.b-zhela__yeah, .b-zhela__img,.b-zhela__name').attr('style', '');
      var nameHeight = $(element).find('.b-zhela__name').outerHeight();
      var imgHeight = $(element).find('.b-zhela__img').outerHeight();
      var maxHeight = Math.max.apply(null, [nameHeight, imgHeight]);
      $(element).find('.b-zhela__yeah, .b-zhela__img, .b-zhela__name').innerHeight(maxHeight);
    });
  } else {
    $('.b-zhela__yeah, .b-zhela__img,.b-zhela__name').attr('style', '');
    $(".b-zhela__block").each(function(indx, element) {
      var blockHeight = $(element).height();
      $(element).find('.b-zhela__img').height(blockHeight);
    });
  }


}

//end of equalize of b-zhela__block
//begin of reveal modal jcarousel equalizer function
var flagJs = true;

function equalizeJcar() {
  if (flagJs) {
    flagJs = false;
    setTimeout(function() {
      var heig = $('.jcarousel-wrap').height();
      $(".jcarousel-slider-tovar-control-pagination").height(heig);
      $(".jcarousel-slider-tovar-pagination-block").height(heig - 45);
      flagJs = true;
    }, 300);
  }


}
//end of reveal modal jcarousel equalizer function
/*
function responseWidthDropMenu() {
    if ($('.b-nav_level-1').length !== 0) {
        var windowWid = $(window).width();
        if (windowWid < 1217) {
            $('.b-nav_level-1').attr('style', 'width:' + (windowWid - 275) + 'px;')
        } else {
            $('.b-nav_level-1').attr('style', '')
        }
    }
}
*/

function openedCatMenu() {
  if ($(window).width() < 623) {
    $('.b-nav-first').parent().click(function() {
      if (flagJs) {
        flagJs = false;
        $(this).siblings().slideToggle();
        setTimeout(function() {

          flagJs = true;
        }, 300);
      }

    });
  } else {
    $('.b-nav-first').parent().siblings().slideDown();
  }
}

function updateFavor(el) {
  var id = $(el).data('id');

  if ($(el).attr('data-type') == 'add') {
    $.ajax({
      type: "post",
      url: '/ajax/favor.php',
      data: {
        favor: id
      },
      dataType: "html",
      success: function(out) {
        $(el).addClass('active');
        $(el).attr('data-type', 'del');
        $(el).attr('title', 'Удалить из избранного');
      }

    });
  } else {
    $.ajax({
      type: "post",
      url: '/ajax/favor.php',
      data: {
        delfavor: id
      },
      dataType: "html",
      success: function(out) {
        $(el).removeClass('active');
        $(el).attr('data-type', 'add');
        $(el).attr('title', 'В избранное');
      }
    });
  }
}

/**
 * Раскрытие/скрытие пунктов кастомного select
 *
 * @param el
 */
function toggleSubMenuLevelInCustomSelect(el) {
  if ($(el).parent('.js-item').hasClass('active')) {
    $(el).parent('.js-item').removeClass('active');
    $(el).rotate({
      animateTo: 0
    });
    $(el).siblings('.js-menu').slideUp('slow');
  } else {
    $(el).parent('.js-item').addClass('active');
    $(el).rotate({
      animateTo: 180
    });
    $(el).siblings('.js-menu').slideDown('slow');
  }
}

/**
 * Выбор/отмена активного пункта кастомного select
 *
 * @param el
 * @param id
 */
function toggleMenuItemInCustomSelect(el, id) {
  if ($(el).hasClass('active')) {
    $('.js-section-' + id).removeClass('active');
    $('.js-in-razd-' + id).val('');
  } else {
    $('.js-section-' + id).removeClass('active');
    $('.js-in-razd-' + id).val($(el).data('sect'));
    $(el).addClass('active');
  }
}

$(document).ready(function() {

  if ($('#celistat input').length) {
    $('#celistat input').on('click', function(e) {
      ga('send', 'event', 'statpartner', 'onsubmit');
      yaCounter32844132.reachGoal('statpartner');
      return true;
    });
  }
  if ($('#bayopt a').length) {
    $('#bayopt a').on('click', function(e2) {
      ga('send', 'event', 'sovmestshop', 'click');
      yaCounter32844132.reachGoal('sovmest');
      return true;
    });
  }

  $(".single_image").fancybox();

  // Обрезка логотипа компании при загрузке
  if ($('#croppic'))
    var cropper = new Croppic('croppic', window.croppicContaineroutputMinimal);

});

function cropAndSave(e) {
  if ($('#js-submitted').val() == '' && $('.cropImgWrapper').length) {
    e.preventDefault();
    $('#js-submitted').val('1');
    $('.cropControlCrop').click();
    return false;
  }

  return true;
}

/**
 * Функционал календаря
 */
$(document).ready(function() {
  $('.datp').on('click', '.b-news-calendar-items .default', function() {
    var str = $(this).attr('class');
    var from = str.search('dp') + 2;
    var to = str.search(' ');
    str = str.substring(from, to);
    var date = new Date(parseInt(str));
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1;
    var curr_year = date.getFullYear();
    var dat = curr_date + "-" + curr_month + "-" + curr_year;
    location.href = '/news/?date=' + dat;
  })
});

/**
 * Подписка на новости
 */
$(document).ready(function() {
  $('.js-subscribe').click(function() {
    var button = $(this);
    if (!(button.hasClass("subscribe-error") || button.hasClass("subscribe-success"))) {
      $.getJSON('/news/ajax-subscribe.php', {
        email: $('input[name="email"]').val()
      }, function(data) {
        if (data.status == 'ok') {
          button.addClass("subscribe-success");
          button.html("Успешно");
        } else {
          button.addClass("subscribe-error");
          button.html("Ошибка");
          console.log(data.msg);
        }
      });
    }
  });
});

/**
 * Выбор цвета в карточке товара
 * @param el
 */
function colorPick(el) {
  $('.color-picker').removeClass('selected');
  $(el).addClass('selected');
}

/**
 * Отправка кода для СМС-подтверждения согласия с пользовательским соглашением
 */
function sendAgreementSMSValidation() {
  $('#js-sms-response').slideUp();

  $.ajax({
    url: "/ajax/send_sms_code.php",
    data: {
      "phone": $('#ORDER_PROP_3').val()
    },
    success: function(data) {
      if (data == 'OK') {
        $('#js-sms-send-button').hide();
        $('#js-sms-response').slideDown();
      } else {
        alert('Ошибка отправки сообщения. Повторите попытку позже.');
      }
    },
    error: function() {
      alert("Не удалось");
    }
  });
}

/**
 * Проверка кода из СМС
 */
function checkSMSCode() {
  $.ajax({
    url: "/ajax/check_sms_code.php",
    data: {
      "CODE": $('#js-sms-code').val()
    },
    success: function(data) {
      if (data == 'OK') {
        generateAgreementDocs(); // Заполняем шаблоны документов и отправляем клиенту и администратору
      } else {
        alert(data);
      }
    },
    error: function() {
      alert("Не удалось");
    }
  });
}

/**
 * Заполнение шаблонов документов и отправка клиенту и администратору
 */
function generateAgreementDocs() {
  $.ajax({
    url: "/ajax/generate_agreement_docs.php",
    data: {
      "NAME": $('#ORDER_PROP_1').val(),
      "BIRTHDAY": $('#ORDER_PROP_20').val(),
      "EMAIL": $('#ORDER_PROP_2').val(),
      "PHONE": $('#ORDER_PROP_3').val(),
      "LOCATION": $("input[name='ORDER_PROP_6']").val(),
      "ZIP": $('#ORDER_PROP_4').val(),
      "ADDRESS": $('#ORDER_PROP_7').val()
    },
    success: function(data) {
      if (data == 'OK') {
        alert('Вы успешно подтвердили согласие с пользовательским соглашением. Вам на почту отправлен пакет документов.');
        $('#myModal').foundation('reveal', 'close');
        submitForm('Y');
      } else {
        alert(data);
      }
    },
    error: function() {
      alert("Не удалось связаться с сервером. Попробуйте повторить запрос.");
    }
  });
}

/**
 * Кастомный мультиселект
 */
$(document).ready(function() {
  $(".select2").select2();
});

/**
 * Добавить точку самовывоза или собственную курьерскую службу
 */
$(document).ready(function() {
  $('.js-add-delivery').click(function() {
    var delivery_num = $('.seller_delivery').length ? $('.seller_delivery').last().data("id") + 1 : 0;
    var delivery_template = '<div class="seller_delivery add" data-id="' + delivery_num + '">' +
      '<div class="row b-lk-content__item knob">' +
      '<div class="b-lk-content__label columns"></div>' +
      '<div class="b-lk-content__info columns end knob__row">' +
      '<div class="seller_delivery-add-back" style="display:none; text-align:center;">' +
      '<a class="js-add-back-delivery">Вернуть</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="seller_delivery-content">' +
      '<div class="row b-lk-content__item knob">' +
      '<div class="b-lk-content__label columns"></div>' +
      '<div class="b-lk-content__info columns end knob__row">' +
      '<input type="radio" id="delivery-' + delivery_num + '-vivoz" name="delivery[' + delivery_num + '][DELIVERY_TYPE]" value="0" class="knob__input knob__input_address">' +
      '<label for="delivery-' + delivery_num + '-vivoz" class="knob__lab" data-lab="address">Самовывоз</label>' +
      '<input type="radio" id="delivery-' + delivery_num + '-courier" name="delivery[' + delivery_num + '][DELIVERY_TYPE]" value="1" class="knob__input knob__input_region">' +
      '<label for="delivery-' + delivery_num + '-courier" class="knob__lab" data-lab="region">Курьерская служба</label>' +
      '<button class="knob__close js-delete-delivery" onclick="return false"></button>' +
      '</div>' +
      '</div>' +
      '<div class="row b-lk-content__item knob">' +
      '<div class="b-lk-content__label columns"></div>' +
      '<div class="b-lk-content__info columns end ">' +
      '<input type="text" class="knob__name knob__name_address" name="delivery[' + delivery_num + '][DELIVERY_NAME_ADDRESS]" placeholder="Название и адрес">' +
      '<input type="text" class="knob__name knob__name_region" name="delivery[' + delivery_num + '][DELIVERY_NAME_REGION]" placeholder="Название и область работы">' +
      '<input type="text" class="knob__price" name="delivery[' + delivery_num + '][DELIVERY_PRICE]" placeholder="Цена доставки">' +
      '<input type="text" class="knob__price" name="delivery[' + delivery_num + '][DELIVERY_WORKTIME]" placeholder="Время работы">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    $("#add_delivery").before(delivery_template);
  });

  $('body').on('click', '.knob__lab', function() {
    if ($(this).data("lab") == "address") {
      $(this).parent().parent().next().find('.knob__name_address').show();
      $(this).parent().parent().next().find('.knob__name_region').hide();
    }

    if ($(this).data("lab") == "region") {
      $(this).parent().parent().next().find('.knob__name_address').hide();
      $(this).parent().parent().next().find('.knob__name_region').show();
    }
  });

  $('body').on('click', '.js-delete-delivery', function() {
    if ($(this).closest(".seller_delivery").hasClass("add")) {
      $(this).closest(".seller_delivery").removeClass("add");
      $(this).closest(".seller_delivery").find("input").each(function() {
        var name = $(this).attr("name");
        $(this).attr("name", "");
        $(this).data("name", name);
      });
    } else {
      $(this).closest(".seller_delivery").addClass("delete");
      var name = $(this).closest(".seller_delivery").find("input[type=hidden]").attr("name");
      $(this).closest(".seller_delivery").find("input[type=hidden]").attr("name", name.replace("DELIVERY_ID", "DELETE"));
    }
    $(this).closest(".seller_delivery-content").hide();
    $(this).closest(".seller_delivery").find(".seller_delivery-add-back").show();
  });

  $('body').on('click', '.js-add-back-delivery', function() {
    if ($(this).closest(".seller_delivery").hasClass("delete")) {
      $(this).closest(".seller_delivery").removeClass("delete");
      var name = $(this).closest(".seller_delivery").find("input[type=hidden]").attr("name");
      $(this).closest(".seller_delivery").find("input[type=hidden]").attr("name", name.replace("DELETE", "DELIVERY_ID"));
    } else {
      $(this).closest(".seller_delivery").addClass("add");
      $(this).closest(".seller_delivery").find("input").each(function() {
        var name = $(this).data("name");
        $(this).attr("name", name);
        $(this).data("name", "");
      });
    }
    $(this).closest(".seller_delivery").find(".seller_delivery-content").show();
    $(this).closest(".seller_delivery-add-back").hide();
  });
});

/**
 * Отображение окна согласия с пользовательским соглашением
 * @param userPhone
 * @returns {boolean}
 */
function showUserAgreePopup() {
  var userPhone = '';

  if (!$('#js-user-rules-agree').is(':checked')) {
    alert('Необходимо согласие с пользовательским соглашением');
    return false;
  }

  $('#myModal').html('');

  if ($('#ORDER_PROP_3').val() != '')
    userPhone = $('#ORDER_PROP_3').val();

  if (userPhone == '')
    $('#myModal').append('<p><span style="color: red">ВНИМАНИЕ: не указан номер телефона!</span></p>');

  $('#myModal').append('Внести изменения в данные, указанные при регистрации, Вы можете на странице <a href="/personal/info/">Личные данные</a>.');

  // Если заполнено поле телефон (автоматически заполняется из свойств пользователя при отображении,
  // но может быть изменено в процессе оформления заказа)
  if (userPhone != '') {
    $('#myModal').append('<p>На Ваш номер <b>' + userPhone + '</b> будет отправлено СМС-сообщение с кодом.</p>');

    $('#myModal').append('\
            <div class="row"> \
                 <div class="columns large-centered large-6 text-center"> \
                    <a href="javascript:void(0)" id="js-sms-send-button" onclick="sendAgreementSMSValidation()" class="b-pereshet__podtv-link">Отправить СМС</a> \
                </div> \
            </div> \
            <div id="js-sms-response" style="display: none;"> \
                <div class="row"> \
                    <div class="b-lk-content__info columns end"> \
                        <input id="js-sms-code" type="text" placeholder="Введите код из СМС"/> \
                        <small>Указывая код Вы подтверждаете согласие с <a href="/user_agreement/additional/" target="_blank">Дополнительным соглашением</a></small> \
                    </div> \
                </div> \
                <div class="row"> \
                    <div class="b-lk-content__button columns b-orders__buttons "> \
                        <a href="javascript:void(0);" onclick="checkSMSCode()" class="b-orders__buttons-repeat">Подтвердить согласие</a> \
                        <a href="javascript:void(0);" onclick="sendAgreementSMSValidation()" class="b-orders__buttons-cancel">Отправить код повторно</a> \
                    </div> \
                </div> \
            </div>');
  }

  $('#myModal').foundation('reveal', 'open');
}

/**
 * Калькулятор стоимости услуг
 */
/**$(document).ready(function () {
    $('.datp').on('click', '.b-news-calendar-items .default', function () {
        var str = $(this).attr('class');
        var from = str.search('dp') + 2;
        var to = str.search(' ');
        str = str.substring(from,to);
        var date = new Date(parseInt(str));
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        var curr_year = date.getFullYear();
        var dat = curr_date + "-" + curr_month + "-" + curr_year;
        location.href = '/news/?date='+dat;
    })
});**/

function partnershipCalc() {
  $('.b-partnership__content-item-form-loading').show();

  var result;

  if ($('#partnershipCalcProceeds').val().match(/^\d+$/)) {
    var proceeds = parseInt($('#partnershipCalcProceeds').val());
    if ($('input:radio[name=complex]:checked').val() == "1") {
      result = proceeds * 0.01 + 200;
    } else {
      result = proceeds * 0.05;
    }
    result += "руб."
  } else {
    result = "Ошибка";
  }

  $('#partnershipCalcResult').val(result);

  $('.b-partnership__content-item-form-loading').hide();
}

function initDropDown() {
  $('.b-vertical-dropdown__head').on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');

    // Открытие карты для выбора пункта выдачи Boxberry
    if ($(this).hasClass('js-boxberry-pickup') && $(this).parent().hasClass('active')) {
      $(this).parent().find('.bx_result_price a').click(); // (программный клик по ссылке)
    }
  });
}

/**
 * Изменение количества товара при оптовом заказе
 *
 * @param el
 * @param direction
 */
function updateQuantity(el, direction) {

  var element = $(el).parent().find('input');

  switch (direction) {
    case 'up':
      if (parseInt(element.attr('data-max-quantity')) > parseInt(element.val()))
        element.val(parseInt(element.val()) + 1);
      break;
    case 'down':
      if (parseInt(element.val()) > 0)
        element.val(parseInt(element.val()) - 1);
      break;
  }
  if ($('#group_id').length > 0) {
    saveProductQuantityToSession(element);
  }
}

/**
 * Проверка введенного количества при оптовом заказе
 *
 * @param el
 */
function checkQuantity(el) {
  var element = $(el);

  if (parseInt(element.val()) > parseInt(element.attr('data-max-quantity'))) {
    element.val(element.attr('data-max-quantity'));
  }

  if ($('#group_id').length > 0) {
    saveProductQuantityToSession(element);
  }
}

/**
 * Сохранение количества добавленных товаров в сессии пользователя
 *
 * @param element
 */
function saveProductQuantityToSession(element) {

  document.body.style.cursor = 'wait';
  $.ajax({
    url: "/personal/opt/?AJAX_CALL=Y&group_id=" + $('#group_id').val(),
    dataType: 'json',
    data: {
      "group_id": $('#group_id').val(),
      "product_id": element.attr('data-product-id'),
      "quantity": element.val()
    },
    success: function(jsondata) {
      $('#js-opt-short-info').html(jsondata.optShortInfoHTML);
      $('#js-opt-products-list').html(jsondata.productsListHTML);
      document.body.style.cursor = 'auto';
    },
    error: function() {
      document.body.style.cursor = 'auto';
      alert("Не удалось применить изменения. Попробуйте повторить операцию.");
    }

  });
}

/**
 * Оформление оптового заказа (если пользователь авторизован)
 *
 * @param el
 * @returns {boolean}
 */
function makeOptOrder(el) {
  document.body.style.cursor = 'wait';

  $.ajax({
    url: "/ajax/check-user-auth.php",
    dataType: 'json',
    async: false,
    success: function(jsondata) {
      document.body.style.cursor = 'auto';

      if (typeof jsondata.RESULT != 'undefined' && jsondata.RESULT == 'Y') {
        // Пользователь авторизован
        $(el).parent().submit();
        return true;
      } else {
        // Пользователь не авторизован
        $('#myModal').html('<iframe src="/login/?ajax=Y" width="100%" height="570" style="border:none;"></iframe>');
        $('#myModal').foundation('reveal', 'open');
      }
    }
  });

  return false;
}

/**
 * Оформление заказа если пользователь пришел с авторизации во фрейме
 *
 */
function makeOptOrderInFrame() {
  $('#myModal').foundation('reveal', 'close');
  $('#myModal').html('');

  $('#js-make-opt-order').parent().submit();
}

$(window).load(function() {

  $(function() { // Слайдеры на главной странице

    if ($('.jcarousel-slider1').length) {

      $('.jcarousel-slider1').on('jcarousel:create jcarousel:reload', function() {
        var element = $(this),
          width = element.innerWidth();

        // This shows 1 item at a time.
        // Divide `width` to the number of items you want to display,
        // eg. `width = width / 3` to display 3 items at a time.
        element.jcarousel('items').css('width', width + 'px');
        $('.jcarousel-slider1').show();
      }).jcarousel({
        wrap: 'both'
      }).jcarouselAutoscroll({
        interval: 5000,
        target: '+=1',
        autostart: true
      });

      $('.jcarousel-slider1-pagination')
        .on('jcarouselpagination:active', 'a', function() {
          $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
          $(this).removeClass('active');
        })
        .jcarouselPagination({
          item: function(page) {
            return '<a href="#' + page + '">' + '</a>';
          }
        });
    }

    if ($('.jcarousel-slider2').length) {
      $('.jcarousel-slider2').jcarousel()
        .on('jcarousel:create jcarousel:reload', function() {
          var element = $(this),
            width = element.innerWidth();
        });

      $('.jcarousel-slider2-pagination')
        .on('jcarouselpagination:active', 'a', function() {
          $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
          $(this).removeClass('active');
        })
        .jcarouselPagination({
          item: function(page) {
            return '<a href="#' + page + '">' + '</a>';
          }
        });
    }

    if ($('.jcarousel-slider3').length) {
      $('.jcarousel-slider3').on('jcarousel:create jcarousel:reload', function() {
        var element = $(this),
          width = element.innerWidth();
      }).jcarousel({});

      $('.jcarousel-slider3-pagination')
        .on('jcarouselpagination:active', 'a', function() {
          $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
          $(this).removeClass('active');
        })
        .jcarouselPagination({
          item: function(page) {
            return '<a href="#' + page + '">' + '</a>';
          }
        });
    }
  });


});

$(document).ready(function() {
  /**
   * Отложенная загрузка блоков
   */
  $(function() {
    if ($('.lazy-load').length) {
      $.each($(".lazy-load"), function(key, value) {
        var loadURL = $(value).attr('data-load');
        var callBackFunction = $(value).attr('data-callback');

        if (loadURL != '') {
          $.ajax({
            url: loadURL,
            success: function(data) {
              $(value).html(data);
              window[callBackFunction]();
            }
          });
        }
      });
    }
  });
});

/**
 * Перезагрузка каруселей оптовых покупок на главной странице
 */
function reloadCarousels() {
  $('.js-carousel-group-opt-main').on('jcarousel:create jcarousel:reload', function() {
    var element = $(this),
      width = element.innerWidth();

    if (width > 937) {
      width = width / 4;
    } else if (width < 617) {
      width = width / 2;
    } else {
      width = width / 3;
    }

    element.jcarousel('items').css('width', width + 'px');
  }).jcarousel({});
  $('.js-carousel-group-opt-main-prev')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })
    .jcarouselControl({
      target: '-=1'
    });
  $('.js-carousel-group-opt-main-next')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })

    .jcarouselControl({
      target: '+=1'
    });

  $('.js-carousel-group-main').on('jcarousel:create jcarousel:reload', function() {
    var element = $(this),
      width = element.innerWidth();

    if (width > 937) {
      width = width / 4;
    } else if (width < 617) {
      width = width / 2;
    } else {
      width = width / 3;
    }

    element.jcarousel('items').css('width', width + 'px');
  }).jcarousel({});
  $('.js-carousel-group-main-prev')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })
    .jcarouselControl({
      target: '-=1'
    });
  $('.js-carousel-group-main-next')
    .on('jcarouselcontrol:active', function() {
      $(this).removeClass('inactive');
    })
    .on('jcarouselcontrol:inactive', function() {
      $(this).addClass('inactive');
    })

    .jcarouselControl({
      target: '+=1'
    });

  $(document).foundation('equalizer', 'reflow');

}


//begin of .jcarousel-wrapper_high equalize
function productImageEqualize() {
  var productImageHeight = $('.jcarousel-wrapper_high').height();
  var productImageInsideHeight = $('.jcarousel-wrapper_high > .jcarousel').height();
  var productInfoHeight = $('.b-catalog-item-data').height();
  if ($(window).width() > 1024) {
    if (productImageHeight < productInfoHeight) {
      $('.jcarousel-wrapper_high').height(productInfoHeight - 40);
      if (productImageInsideHeight < productInfoHeight - 40) {
        var marginTop = (productInfoHeight - 40 - productImageInsideHeight) / 2;
        $('.jcarousel-wrapper_high >.jcarousel').attr('style', 'margin-top:' + marginTop + "px;");
      }
    }
  } else {
    $('.jcarousel-wrapper_high').attr('style', '');
    $('.jcarousel-wrapper_high >.jcarousel').attr('style', '');
  }


}
$(window).resize(function() {
  productImageEqualize();
});
$(window).load(function() {
  productImageEqualize();
});

//end of .jcarousel-wrapper_high equalize

/**
 * Отображение карты выбора точки самовывоза Боксберри
 * @param el
 */
function showBoxberryMap(el) {
  $('#confirmorder').val('N');
  $(el).parents('.delivery-item').find('.bx_result_price a').click();
  $(el).hide();
}
