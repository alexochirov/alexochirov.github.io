/**
 * @package   Favourites
 */

'use strict';
var Favourites = {
    self: {},
    //инициализация
    init: function (options) {
        Favourites.self = this;
        Favourites.addBindings();
        Favourites.delBindings();
        //Favourites.delBindingsPage();
        return this;
    },
    //все обработчики
    addBindings: function () {
        this.bindAdd2Favourites();
    },
    delBindings: function () {
        this.bindDel2Favourites();
    },
  /*  delBindingsPage: function () {
        this.bindDel2FavouritesPage();
    },*/
    bindAdd2Favourites: function () { 
        // добавление в любимые товары
        $(document).on("click", ".js-add2fav", function (e) {
        	
            e.preventDefault();
            var date = new Date(),
                timestamp = date.getTime(),
                $pThis = $(this),
                id = $pThis.data("product-id"),
                //addHtml = $pThis.data("html"),
                //addHtmlSmall = $pThis.data("html-small"),
                favDelTilte = 'Удалить из любимых товаров'; 
            //if (addHtmlSmall) {
            //    favDelHtml = 'Удалить';
            //}
            if (!id) return false;
            $.ajax({
                type: "POST",
                url: "/ajax/add2fav.php?timestamp=" + timestamp,
                data: {
                    item_id: id
                },
                dataType: "json"
            }).done(function (data) {
                if (data.success == 'ADD') {
                    $pThis.removeClass('js-add2fav');
                    $pThis.addClass('js-del2fav');
                    //if (addHtml) {
                    //    $pThis.find('.js-product-line__favorite-html').html(favDelHtml);
                    //}
                    $pThis.prop('title', favDelTilte);
                    $pThis.find('.js-favorite-label').html(' Добавлено');
                    $pThis.find('i').removeClass('fa-heart-o').addClass('fa-heart');
                    var html = data.html;
                    //var countProd = data.countProd;
                    Favourites.showPopup(html);
                    //Favourites.updateHeader(countProd);
                } else if (data.success == 'AUTH') {
                    var html = data.html;
                    Favourites.showPopup(html);
                }
            });
        });
    },
    bindDel2Favourites: function () {
        // Удаление из списка
        $(document).on("click", ".js-del2fav", function (e) {
            e.preventDefault();
            var date = new Date(),
                timestamp = date.getTime(),
                $pThis = $(this),
                id = $pThis.data("product-id");
                //addHtml = $pThis.data("html");
            if (!id) return false;
            $.ajax({
                type: "POST",
                url: "/ajax/del2fav.php?timestamp=" + timestamp,
                data: {
                    item_id: id
                },
                dataType: "json"
            }).done(function (data) {
                $pThis.removeClass('js-del2fav');
                $pThis.addClass('js-add2fav');
                /*if (addHtml) {
                    $pThis.find('.js-product-line__favorite-html').html('Запомнить');
                }*/
                $pThis.prop('title','Запомнить');
                $pThis.find('.js-favorite-label').html(' Запомнить');
                $pThis.find('i').removeClass('fa-heart').addClass('fa-heart-o');
                if (data) {
                    var html = data.html;
                    //var countProd = data.countProd;
                    Favourites.showPopup(html);
                    //Favourites.updateHeader(countProd);
                }
            });
        });
    },
    bindDel2FavouritesPage: function () {
        // Удаление из списка
        $(document).on("click", ".js-page-del2fav", function (e) {
            e.preventDefault();
            var date = new Date(),
                timestamp = date.getTime(),
                $pThis = $(this),
                id = $pThis.data("product-id"),
                page = $pThis.data('page');
            if (!id) return false;
            $.ajax({
                type: "POST",
                url: "/ajax/del2fav.php?timestamp=" + timestamp,
                data: {
                    item_id: id
                },
                dataType: "json"
            }).done(function (data) {
                $.get(page, {'AJAX_PAGE' : 'Y'}, function(data) {
                    $('.js-list-favorite').html(data);
                })
                .always(function() {
                    setHeightProduct();
                });
                if (data) {
                    var countProd = data.countProd;
                    Favourites.updateHeader(countProd);
                }
            });
        });
    },

    //обновить блок
   /* updateHeader: function (html) {
        if ((html != 0)&&(!html)) {
            var json = $.getJSON("/ajax/add2fav.php", function () {
            });
            html = json.countProd;
        }
        $(".js-box-add2fav").html('(' + html + ')');
    },*/
    // всплывающее окно
    showPopup: function (html) {
        if (html) {
            $("#add-to-favourites-auth-popup").html(html).foundation('open');
        }
    }
};
Favourites.init();