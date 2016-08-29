$(document).ready(function() {
    (function($) {
        $(function() {
            "use strict";

            $(document).foundation({
                equalizer: {
                    equalize_on_stack: true
                }
            });

            //begin of footer open list
            $('.b-footer-links__item h3').click(function(e) {
                if ($(this).hasClass('js-opened')) {
                    $(this).toggleClass('js-opened');
                } else {
                    $(this).toggleClass('js-opened');
                }
            });
            //end of footer open list
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
            //$('.js-razv').on('click', function(){
            //  $(this).siblings('ul').toggle();
            //});
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
                $.each($(".js-preview"), function(key, value) {
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
                    url: '/post_file.php',

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
                    },

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
                var action = $(this).data('action');
                var checked = [];
                $.each($("input[name='groupid[]']:checked"), function(key, val) {

                    checked.push($(this).val());
                });
                if (!checked.length) {
                    alert('Не выбраны товары');
                } else {

                    $.ajax({
                        url: "/personal/shop/mycatalog/ajax-items-sale-one.php",
                        data: {
                            "ID": checked,
                            "action": action,
                            "all": $("#js-all-checked").val()
                        },
                        success: function(data) {
                            alert("успешно");
                            location.href = location.href;
                        },
                        error: function() {
                            alert("Не удалось");
                        }

                    });

                }
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
                                "all": $("#js-all-checked").val()
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
                    if($(this).attr('data-source') == 'catalog')
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
                        url: '/goodslist.php',
                        data: {
                            "IDS": checked,
                            "all": $('#js-all-checked').val()
                        },
                        success: function(data) {
                            $(data).insertBefore('.js-buttons');
                        }
                    });
                    $('.js-hide').hide();
                    $('#GroupModal').foundation('reveal', 'open');
                    $('.js-save').off('click').on('click', function() {
                        var checked = {
                            ID: []
                        };
                        var url = "/personal/shop/groups/ajax-items-add.php?";
                        $.each($("input[name='product_id[]']"), function(key, val) {
                            if (key != 0)
                                url = url + "&";
                            url = url + "ID[" + key + "]=" + $(this).val();
                            if ($("#pr" + $(this).val()).val().length) {
                                url = url + "&PRICE[" + key + "]=" + $("#pr" + $(this).val()).val();
                            }
                        });



                        url = url + "&GROUP=" + $("input[name='gridID[]']:checked").val();

                        $.ajax({
                            url: url,
                            success: function(data) {
                                if (data == '1')
                                    alert("Добавлено к групповой покупке.");
                                else alert("Ошибка добавления.");
                            }
                        });

                        $('#GroupModal').foundation('reveal', 'close');

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
                $('.js-save').off('click').on('click', function() {
                    /*var checked = {
                     ID: []
                     };
                     var url = "/personal/shop/groups/ajax-items-add.php?";
                     $.each( $("input[name='gridID[]']:checked"),function (key,val)
                     {

                     checked.ID.push($(this).val());
                     if(key!=0)
                     url = url + "&";
                     url = url + "ID["+key+"]="+$(this).val();
                     if($("#pr"+ $(this).val()).val().length){
                     url = url + "PRICE["+key+"]="+$("#pr"+ $(this).val()).val();
                     }


                     });
                     url = url + "&GROUP="+grid;*/
                    var checked = {
                        ID: []
                    };
                    var urls = [];
                    var url = "/personal/shop/groups/ajax-items-add.php?";
                    $.each($("input[name='gridID[]']:checked"), function(key, val) {

                        checked.ID.push($(this).val());
                        var newurl = url + "ID[0]=" + grid;


                        if ($("#pr" + $(this).val()).val().length) {
                            newurl = newurl + "&PRICE[0]=" + $("#pr" + $(this).val()).val();
                        }
                        newurl = newurl + "&GROUP=" + $(this).val();
                        $.ajax({
                            url: newurl,
                            success: function(data) {
                                if (data == 1)
                                    alert("Добавлено к групповой покупке.");
                                else alert("Ошибка добавления.");
                            }
                        });
                        location.href = location.href;
                        $(this).removeAttr('checked');
                        $("#pr" + $(this).val()).val('');

                    });

                    if (checked.ID.length) {
                        $('#GroupModal').foundation('reveal', 'close');
                        // location.href = location.href
                        //var recursiveDecoded = decodeURIComponent($.param(checked));
                        /**/
                    }
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
                var price = 0;
                $.each($("input[name='order']"), function () {
                    price += parseFloat($(this).closest("tr").find('td:eq(4)').html());
                });
                $('.js-cost').html(price + " руб.");
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
                var price = 0;
                $.each($("input[name='order']:checked"), function () {
                    checked.push($(this).val());
                    price += parseFloat($(this).closest("tr").find('td:eq(4)').html());
                });
                $('.js-cost').html(price + " руб.");
                if (!checked.length) { 
                    alert('Не выбраны товары'); 
                } else {
                    window.print();
                } 
            });

            $('.js-import-excel').on('click', function() {
                var orders = {};
                var rows = $('.b-orders-table').find('tr');
                for (var i = 1; i < rows.length; i++){
                    orders[i-1] = {};

                    var content = [];
                    var orderContent = $(rows[i]).find('td:eq(3)').find('p');
                    for (var j = 0; j < orderContent.length; j++) {
                        content[j] = $(orderContent[j]).find('a:eq(0)').html();
                    }

                    var properties = [];
                    var orderProperties = $(rows[i]).find('td:eq(7)').find('p');
                    for (var j = 0; j < orderProperties.length; j++) {
                        properties[j] = $(orderProperties[j]).html();
                    }

                    var buytype = [];
                    var orderBuytype = $(rows[i]).find('td:eq(8)').find('p');
                    for (var j = 0; j < orderBuytype.length; j++) {
                        buytype[j] = $(orderBuytype[j]).html();
                    }

                    orders[i-1]['id'] = $(rows[i]).find('td:eq(1)').html();
                    orders[i-1]['date'] = $(rows[i]).find('td:eq(2)').html();
                    orders[i-1]['content'] = content;
                    orders[i-1]['price'] = $(rows[i]).find('td:eq(4)').html();
                    orders[i-1]['delivery'] = $(rows[i]).find('td:eq(5)').find('p:eq(0)').html();
                    orders[i-1]['status'] = $(rows[i]).find('td:eq(6)').html();
                    orders[i-1]['properties'] = properties;
                    orders[i-1]['buytype'] = buytype;
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
                if (status == "T") {
                    $("#tracking_code").show();
                    var track = $("#tracking_code").val();
                    if (track.length) {
                        var checked = [];
                        var elemIds = [];
                        $.each($("input[name='order']:checked"), function (key, val) {
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
                                    "track" : track,
                                    "elements" : elemIds
                                },
                                success: function (data) {
                                    alert("успешно");
                                    location.href = location.href;
                                },
                                error: function () {
                                    alert("Не удалось");
                                }

                            });
                        }
                    }
                } else {
                    var checked = [];
                    $.each($("input[name='order']:checked"), function (key, val) {
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
                            success: function (data) {
                                alert("успешно");
                                location.href = location.href;
                            },
                            error: function () {
                                alert("Не удалось");
                            }

                        });
                    }
                }
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

            function addProductToCart(id, name, price, group, empty_cart) {
                $.ajax({
                    type: "post",
                    url: '/smallbasket.php',
                    data: {
                        id: id,
                        quantity: 1,
                        name: name,
                        price: price,
                        group: group,
                        empty_cart: empty_cart
                    },
                    dataType: "html",
                    success: function(out) {
                        location.href = "/personal/basket";
                    }
                });
            }

            // Добавление в корзину по цене групповой покупки
            $('.js-add-to-cart-group').on('click',
                function() {
                    var productID = $(this).attr('data-id');
                    var productName = $(this).attr('data-name');
                    var productPrice = $(this).attr('data-price');
                    var productGroup = $(this).attr('data-group');

                    $.ajax({
                        type: "post",
                        url: '/smallbasket.php',
                        data: {
                            id: productID,
                            check_basket: true
                        },
                        dataType: "html",
                        success: function(out) {
                            if (out == '1') // можно добавить товар
                                addProductToCart(productID, productName, productPrice, productGroup, '');
                            else {
                                if (confirm('В корзине есть товары другого продавца. Очистить корзину и добавить этот товар?'))
                                    addProductToCart(productID, productName, productPrice, productGroup, 'Y');
                            }

                        }
                    });
                    return false;
                }
            );

            $('.js-activate-group').on('click',
                function() {
                    $.ajax({
                        type: "post",
                        url: '/ajax/group-actions.php',
                        data: {
                            group: $(this).attr('data-group'),
                            action: "activate-group"
                        },
                        dataType: "html",
                        success: function(out) {
                            location.href = "/personal/shop/groups/";
                        }
                    });
                    return false;
                }
            );

            $(document).on('click', '.js-add-cart',
                function() {
                    var productID = $(this).siblings('#js-id').val();
                    var productName = $(this).siblings('#js-product-name').val();
                    var productPrice = $(this).siblings('#js-product-price').val();

                    $.ajax({
                        type: "post",
                        url: '/smallbasket.php',
                        data: {
                            id: productID,
                            check_basket: true
                        },
                        dataType: "html",
                        success: function(out) {
                            if (out == '1') // можно добавить товар
                                addProductToCart(productID, productName, productPrice, '', '');
                            else {
                                if (confirm('В корзине есть товары другого продавца. Очистить корзину и добавить этот товар?'))
                                    addProductToCart(productID, productName, productPrice, '', 'Y');
                            }
                        }
                    });

                    return false;
                }
            );

            $('.b-search__close').bind('click', function() {
                $('#form__search').removeClass("active");
                $('.b-main-menu__item_form').width('228px');
                $('.b-main-menu__item_mod').show();
                $('#form__search').val('');
                $('.b-main-menu__item_form__search button').hide();
            });

            $('#form__search').bind('focus', function() {
                $(this).addClass("active");
                $('.b-main-menu__item_form').width('355px');
                $('.b-main-menu__item_mod').hide();
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

                $('.b-edit-product .js-arrow, .js-menu .js-arrow').on('click', function() {
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
						if(!$("[name='user_agrmnt']").is(":checked")) {
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

                //begin of input number krasiviy
                $(function() {
                    //var spinner = $('.b-input-number').spinner();
                });
                //end of input number krasiviy
                $('.jcarousel-hots').on('jcarousel:create jcarousel:reload', function() {
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
                $('.jcarousel-hots-prev')
                    .on('jcarouselcontrol:active', function() {
                        $(this).removeClass('inactive');
                    })
                    .on('jcarouselcontrol:inactive', function() {
                        $(this).addClass('inactive');
                    })
                    .jcarouselControl({
                        target: '-=1'
                    });
                $('.jcarousel-hots-next')
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

            $('.jcarousel-slider1').on('jcarousel:create jcarousel:reload', function() {
                var element = $(this),
                    width = element.innerWidth();

                // This shows 1 item at a time.
                // Divide `width` to the number of items you want to display,
                // eg. `width = width / 3` to display 3 items at a time.
                element.jcarousel('items').css('width', width + 'px');
            }).jcarousel({wrap: 'both'}).jcarouselAutoscroll({
                interval: 5000,
                target: '+=1',
                autostart: true
            });
            $(function() {
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
            });

            $(function() {
                $('.jcarousel-slider2').on('jcarousel:create jcarousel:reload', function() {
                    var element = $(this),
                        width = element.innerWidth();

                    // This shows 1 item at a time.
                    // Divide `width` to the number of items you want to display,
                    // eg. `width = width / 3` to display 3 items at a time.
                    element.jcarousel('items').css('width', width + 'px');
                }).jcarousel({});
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
            });

            $(function() {
                $('.jcarousel-slider3').on('jcarousel:create jcarousel:reload', function() {
                    var element = $(this),
                        width = element.innerWidth();

                    // This shows 1 item at a time.
                    // Divide `width` to the number of items you want to display,
                    // eg. `width = width / 3` to display 3 items at a time.
                    element.jcarousel('items').css('width', width + 'px');
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

            $('.js-impinfo').on('click',function(e){
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
            if($('.js-package-standart-size select'))
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
    responseWidthDropMenu();
    openedCatMenu();
});
$(window).resize(function() {
    equalizeZhela();
    equalizeJcar();
    responseWidthDropMenu();
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

    if ($(el).val() == 129)
    {
        $('#property_189').show();
    }
    else if ($(el).val() == 128)
    {
        $('#property_207').slideDown();
        $('.js-weight-property input').attr('readonly', 'true');
    }
}

/**
 * Изменение стандартных размеров посылки при выборе из списка
 */
function changePackageSizes(el)
{
    $('.js-weight-property input').val('').removeAttr('readonly');

    if($(el).val() == 122 || $(el).val() == 123) // если выбран конверт или бандероль, необходимо скрыть размеры товара
    {
        $('.js-weight-property').hide();
        $('.js-package-standart-size').hide();
        $('#package-sizes-list').val('');
    }
    else {
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
                var result = jQuery.parseJSON(data), options = '<option value="">выберите размер упаковки</option>';

                $.each(result, function() {
                    options += '<option value="' + this['NAME'] + '" data-width="' + this['PROPERTY_WIDTH_VALUE'] + '" data-height="' + this['PROPERTY_HEIGHT_VALUE'] + '" data-length="' + this['PROPERTY_LENGTH_VALUE'] + '">' + this['NAME'] + "</option>";
                });

                $('.js-package-standart-size select').html(options);
                $('.js-package-standart-size').show();
            }
        });

    }
}

function loadPackageSizesList(el)
{
    $.ajax({
        url: "/ajax/delivery-package.php",
        data: {
            package: $('#js-packages').find("option:selected").text()
        },
        error: function() {
            alert("Не удалось выполнить запрос");
        },
        success: function(data) {
            if(data == '') return;
            var result = jQuery.parseJSON(data), options = '<option value="">выберите размер упаковки</option>';

            var selectedValue = $('.js-package-standart-size select').attr('data-value');
            var optionSelected = '';

            $.each(result, function() {
                optionSelected = '';
                if(this['NAME'] == selectedValue)
                    optionSelected = ' selected ';

                options += '<option' + optionSelected + ' value="' + this['NAME'] + '" data-width="' + this['PROPERTY_WIDTH_VALUE'] + '" data-height="' + this['PROPERTY_HEIGHT_VALUE'] + '" data-length="' + this['PROPERTY_LENGTH_VALUE'] + '">' + this['NAME'] + "</option>";
            });

            $('.js-package-standart-size select').html(options);
        }
    });
}
function changePackageSizeSelected(el)
{
    $('#js-product-length').val($(el).find("option:selected").attr('data-length')).attr('readonly','true');
    $('#js-product-width').val($(el).find("option:selected").attr('data-width')).attr('readonly','true');
    $('#js-product-height').val($(el).find("option:selected").attr('data-height')).attr('readonly','true');
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
function responseWidthDropMenu() {
    if ($('.b-nav_level-1').length !== 0) {
        var windowWid = $(window).width();
        if (windowWid < 1217) {
            $('.b-nav_level-1').attr('style', 'width:' + (windowWid - 233) + 'px;')
        } else {
            $('.b-nav_level-1').attr('style', '')
        }
    }
}

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
            url: '/favor.php',
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
            url: '/favor.php',
            data: {
                delfavor: id
            },
            dataType: "html",
            success: function (out) {
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
function toggleSubMenuLevelInCustomSelect(el)
{
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
function toggleMenuItemInCustomSelect(el, id)
{
    if($(el).hasClass('active'))
    {
        $('.js-section-' + id).removeClass('active');
        $('.js-in-razd-' + id).val('');
    }
    else
    {
        $('.js-section-' + id).removeClass('active');
        $('.js-in-razd-' + id).val($(el).data('sect'));
        $(el).addClass('active');
    }
}

$(document).ready(function() {

    $(".single_image").fancybox();

    if($('#croppic'))
        var cropper = new Croppic('croppic', window.croppicContaineroutputMinimal);

});
