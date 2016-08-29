// Шинина элементов сладера городов
function marginItem() {
    (function () {
        var $bCityCaroufredselWrapper = $('.b-city__box-thumbs-content'),
            widthBody = $(window).innerWidth(),
            countItem = 1,
            coofCountObjects = 2;

        if ($(window).innerHeight() < $('.js-padding-left__place-box_show').innerHeight()) {
            widthBody = widthBody + 15;
        }
        if (widthBody >= 960) {
            countItem = 7;
        }
        if (widthBody < 960) {
            countItem = 5;
        }
        if (widthBody < 640) {
            countItem = 3;
            coofCountObjects = 1.1;
        }
        if (widthBody < 340) {
            coofCountObjects = 0.5;
        }
        var bCityCaroufredselWrapperWidth = $bCityCaroufredselWrapper.width(),
            width_Item = bCityCaroufredselWrapperWidth / countItem,
            width_ItemSelect = (bCityCaroufredselWrapperWidth / countItem) * 3;

        $bCityCaroufredselWrapper.find('.b-city__box-thumbs__item').each(function (i, elem) {
            var widthItems = $(elem).find('.b-city__box-thumbs__item-title').width(),
                $jsItemsObject = $(elem).find('.b-city__box-thumbs__item-objects');

            $(elem).css({width: width_Item});
            if ($(elem).hasClass('b-city__box-thumbs__item_selected')) {
                $(elem).css({width: width_ItemSelect});
                if (widthBody < 640) {
                    $jsItemsObject.css({width: '100%'});
                    $jsItemsObject.css({marginLeft: 0});
                    $jsItemsObject.css({left: 0});
                    $jsItemsObject.css({textAlign: 'right'});
                }
                else {
                    var marginLeft = -(width_ItemSelect - widthItems) / coofCountObjects;
                    $jsItemsObject.css({marginLeft: marginLeft});
                }
            }
            if (widthBody < 640) {
                if ((i == 0) || (i == 1)) {
                    $(elem).css({width: 0});
                    $(elem).css({overflow: 'hidden'});
                }
                else {
                    $(elem).css({overflow: 'visible'});
                }
            }
            else if (widthBody < 960) {
                if (i == 0) {
                    $(elem).css({width: 0});
                    $(elem).css({overflow: 'hidden'});
                }
                else {
                    $(elem).css({overflow: 'visible'});
                }
            }
        });
    })();
}

// переход на слайд по клику на метке на карте
function gotoItemsSliderCity(idCity) {
    var $bCityCaroufredselWrapper = $('.b-city__caroufredsel_wrapper');
    $('.b-city__box-thumbs .b-city__box-thumbs__item').removeClass('b-city__box-thumbs__item_selected');
    $bCityCaroufredselWrapper.find('.b-city__box-thumbs__item').each(function (i, elem) {
        if ($(elem).data('id') == idCity) {
            $('.b-city__box-thumbs').trigger('slideTo', [this, -2]);
            $(elem).addClass('b-city__box-thumbs__item_selected');
        }
    });
    ajaxMap(idCity);
}

function ajaxMap(idCity) {
    var path = "/include/citySliderIndex.php";
    $.get(path, {idCity: idCity}, function (data) {
        $(".b-city__box-slider__map-box").html(data);
    });
}

function resizeWindowJS() {
    var $jsLentaTabsContent = $('.b-lenta__tabs-content').find('.content'),
        jsLentaTabsHeight = $jsLentaTabsContent.outerHeight(),
        HeightWindows;
    var HeightBContent = $('.b-content').height();

    var NewHeight = $('body').outerHeight();
    if ($('.b-content').outerHeight() > $('body').outerHeight()) {
        NewHeight = $('.b-content').outerHeight();
    }

    $jsLentaTabsContent.css({"max-height": NewHeight});
    HeightWindows = 1220;
    if (NewHeight > HeightWindows) {
    }
    else {
        HeightWindows = NewHeight - $('header').outerHeight() - $('footer').outerHeight() - $('.js-bitrix-panel').outerHeight();
    }
    if (jsLentaTabsHeight >= HeightBContent) {
        $jsLentaTabsContent.css({"max-height": HeightWindows});
        $(".b-content").css({"min-height": HeightWindows});
    }
    else {
        $(".b-content").css({"min-height": "none"});
        $jsLentaTabsContent.css({"max-height": $(".b-content").outerHeight()});
    }
    $(".CustomScrollbar").mCustomScrollbar("destroy");
    $(".CustomScrollbar").mCustomScrollbar();
    $(".CustomScrollbar").mCustomScrollbar("update");
}


function resizeWindowPlaceBoxJS() {
    var $bPlaceBoxShow = $('.b-place-box__box_show'),
        $bPlaceBoxBox = $('.b-place-box__box'),
        $bPlaceBoxShowlist = $bPlaceBoxShow.find('.b-place-box__list'),
        $bPlaceBoxShowlistItem = $bPlaceBoxShowlist.find('.b-place-box__item'),
        $bPlaceBoxShowBox = $bPlaceBoxShow.find('.b-place-box'),
        $bPlaceBoxReview = $bPlaceBoxShow.find('.b-place-box-review'),
        PlaceBoxReviewHeight = $bPlaceBoxReview.outerHeight(),
        HeightBContent = $('body').outerHeight(),
        HeightWindows,
        HeightWindowsScroll,
        HeightWindowsList,
        HeightPlaceBoxBox,
        $bPlaceBoxShowListPlaceBoxScroll = $bPlaceBoxShow.find('.b-place-box-scroll'),
        bPlaceBoxShowlistItemheight = 0;
    $bPlaceBoxShowlistItem.each(function (i, elem) {
        bPlaceBoxShowlistItemheight = bPlaceBoxShowlistItemheight + $(elem).outerHeight(true);
    });
    if (bPlaceBoxShowlistItemheight >= HeightBContent - 90) {
        HeightWindows = HeightBContent + 13;
        HeightWindowsList = HeightWindows - 140;
        HeightWindowsScroll = HeightWindows - 90;
        $bPlaceBoxReview.attr("style", "top: " + HeightWindowsScroll + "px");
        $bPlaceBoxShowBox.attr("style", "max-height: " + HeightWindowsScroll + "px");
        $bPlaceBoxShowlist.attr("style", "max-height: " + HeightWindowsList + "px");
        $bPlaceBoxShowListPlaceBoxScroll.attr("style", "max-height: " + HeightWindowsScroll + "px");
        HeightPlaceBoxBox = HeightBContent;
        $bPlaceBoxBox.attr("style", "height: " + HeightPlaceBoxBox + "px");
    }
    else {
        HeightWindows = HeightBContent;
        HeightWindows = (Math.round((HeightWindows - 40) / 105)) * 105 + 40;
        HeightWindowsList = HeightWindows - 65;
        HeightWindowsScroll = HeightWindows - 15;
        if (HeightWindowsScroll >= $bPlaceBoxShowlist.height()) {
            HeightWindowsScroll = $bPlaceBoxShowlist.height() + 50;
        }
        $bPlaceBoxReview.attr("style", "top: " + HeightWindowsScroll + "px");
        $bPlaceBoxShowBox.attr("style", "max-height: " + HeightWindowsScroll + "px");
        $bPlaceBoxShowlist.attr("style", "max-height: " + HeightWindowsList + "px");
        $bPlaceBoxShowListPlaceBoxScroll.attr("style", "max-height: " + HeightWindowsScroll + "px");
        HeightPlaceBoxBox = PlaceBoxReviewHeight + HeightWindowsScroll - 2;
        $bPlaceBoxBox.attr("style", "height: " + HeightPlaceBoxBox + "px");
    }
    $(".js-place-list-CustomScrollbar").mCustomScrollbar();
    var $bBlacePoxShowlistmmCSB_container = $bPlaceBoxShow.find('.mCSB_container'),
        $bPlaceBoxShowlistmCustomScrollBox = $bPlaceBoxShowlist.find('.mCustomScrollBox'),
        $bPlaceBoxShowlistmCSB_scrollTools = $bPlaceBoxShowlist.find('.mCSB_scrollTools');
    $bPlaceBoxShowlistmCustomScrollBox.attr("style", "max-height: " + HeightWindowsList + "px");
    $bPlaceBoxShowlistmCSB_scrollTools.attr("style", "max-height: " + HeightWindowsList + "px");
    $bBlacePoxShowlistmmCSB_container.addClass('js-place-list-sort');
    $bBlacePoxShowlistmmCSB_container.addClass('ui-sortable');
    /**  перемещаем элементы в маршруте */
    (function () {
        var $jsPlaceListSort = $('.js-place-list-sort');
        $jsPlaceListSort.sortable({
            update: function (event, ui) {
                var $jsPlaceSort = $('.js-place-sort'),
                    strUiSort = '';
                $jsPlaceSort.each(function (i, elem) {
                    if (i == 0) {
                        strUiSort = $(elem).data('id');
                    }
                    else {
                        strUiSort = strUiSort + ',' + $(elem).data('id');
                    }
                    $.cookie(cookieNamePlaceAdd, strUiSort, cookieOptionsPlaceAdd);
                });
            }
        });
    })();
    /**Наведение на элемент */
    (function () {
        var $bPlaceBoxShow = $('.b-place-box__box_show'),
            $bPlaceBoxItem = $bPlaceBoxShow.find('.b-place-box__item'),
            $bPlaceBoxShowBox = $bPlaceBoxShow.find('.b-place-box');
        $bPlaceBoxItem.hover(
            function () {
                var $bPlaceBoxItemDesc = $(this).find('.b-place-box__item-desc');
                $(this).addClass('b-place-box__item-show');
                $bPlaceBoxItemDesc.addClass('b-place-box__item-desc-show');
                $bPlaceBoxShowBox.addClass('b-place-box-430');
            },
            function () {
                var $bPlaceBoxItemDesc = $(this).find('.b-place-box__item-desc');
                $(this).removeClass('b-place-box__item-show');
                $bPlaceBoxItemDesc.removeClass('b-place-box__item-desc-show');
                $bPlaceBoxShowBox.removeClass('b-place-box-430');
            }
        );
    })();
    var bodyWidth = $('body').width(),
        $bPlaceBoxShow = $('.b-place-box__box_show');
    if ($bPlaceBoxShow.length) {
        if ((bodyWidth >= 1325) && (bodyWidth <= 1375)) {
            var bHeaderMenuTop = $('.b-header__menu-top').outerWidth(),
                $bCityBoxSlider = $('.b-city__box-slider'),
                $bCityBoxSliderBg = $('.b-city__box-slider_bg'),
                $jsPaddingLeftPlaceBoxShow = $('.js-padding-left__place-box_show'),
                $jsCaroufredselWrapper = $('.b-city__box-bg').parent('.caroufredsel_wrapper'),
                jsValueLeft = bodyWidth - bHeaderMenuTop - 115;
            $jsPaddingLeftPlaceBoxShow.css({paddingLeft: jsValueLeft});
            $jsCaroufredselWrapper.css({left: -jsValueLeft});
            $bCityBoxSlider.css({width: bodyWidth - jsValueLeft});
            $bCityBoxSliderBg.css({width: bodyWidth - jsValueLeft});
        }
        else {
            var $bCityBoxSlider = $('.b-city__box-slider'),
                $bCityBoxSliderBg = $('.b-city__box-slider_bg'),
                $jsPaddingLeftPlaceBoxShow = $('.js-padding-left__place-box_show'),
                $jsCaroufredselWrapper = $('.b-city__box-bg').parent('.caroufredsel_wrapper');
            $jsPaddingLeftPlaceBoxShow.css({paddingLeft: 0});
            $jsCaroufredselWrapper.css({left: 0});
            $bCityBoxSlider.css({width: '100%'});
            $bCityBoxSliderBg.css({width: '100%'});
        }
    }
}
/**Блок Категории - Список объектов (default) - размер блоков (2,3 - тип объекта) */
function setSizeCategories__li23() {
    var $bCategoriesContentBox = $('.b-categories__li23-box'),
        $bCategoriesContentBg = $('.b-categories__li23-bg'),
        $bCategoriesContentItem = $('.b-categories__li23-item'),
        $jsCityPlace = $('.js-city-place');
    if ($bCategoriesContentBox.length) {
        $bCategoriesContentBg.css({height: $bCategoriesContentBg.width()});
        $bCategoriesContentItem.css({height: $bCategoriesContentBg.width()});
        $bCategoriesContentItem.css({width: $bCategoriesContentBg.width()});
        $jsCityPlace.css({top: $bCategoriesContentBg.height() - $jsCityPlace.height()});
    }
};
/**Размер картинки - Товары-Услуги объекта */
function editHeightObjectDetailServices() {
    $('.js-object-detail-services__item-bg').each(function (i, elem) {
        $(elem).css({height: $(elem).width()});
    });
    $(document).foundation('equalizer', 'reflow');
    $('#js-object-detail-services').on('toggled', function (event, tab) {
        $('.js-object-detail-services__item-bg').each(function (i, elem) {
            $(elem).css({height: $(elem).width()});
        });
        $(document).foundation('equalizer', 'reflow');
    });
}
/**     * Главное меню (размер вкладок)     */
function editSeparatorTopMenu() {
    var $jsMenuTopLiFirstLevel = $('.js-menu-top-li_first-level'),
        jsMenuTopLiFirstLevelCount = $jsMenuTopLiFirstLevel.length,
        bHeaderMenuTopWidth = $('.js-header__menu-top').width(),
        $bHeaderMenuTopLiSeparator = $('.b-header__menu-top__li-separator');
    var koof = 0.57;
    if ($('.b-lenta').length) {
        koof = 0.20;
    }
    else {
        koof = 0.57;
    }
    if (jsMenuTopLiFirstLevelCount > 0) {
        var jsWidthAll = 0,
            jsWidthDifference = 0;
        $jsMenuTopLiFirstLevel.each(function (i, elem) {
            jsWidthAll = jsWidthAll + $(elem).width();
        });
        if (jsWidthAll < bHeaderMenuTopWidth) {
            jsWidthDifference = bHeaderMenuTopWidth - jsWidthAll;
            $bHeaderMenuTopLiSeparator.css({width: (jsWidthDifference / (jsMenuTopLiFirstLevelCount - koof)) - 0.6});
        }
    }
}
/**     * замена Back на "Назад"   */
function jsGeneratedBack() {
    var jsGenerated = $('.js-generated');
    if (jsGenerated.length) {
        jsGenerated.find('a').html('Назад');
    }
}
/** Ширина меню */
function jsDropdownWidth() {
    if ($('.js-dropdown').length) {
        var j = 0;
        $('.js-dropdown li').each(function (i, elem) {
            j++;
        });
        if (j % 2 == 1) {
            $("<li style='display: none;'></li>").prependTo($('.js-dropdown'));
        }
        if ($('body').width() >= 945) {
            $('.js-dropdown').css({width: 600});
        }
        else {
            $('.js-dropdown').css({width: '100%'});
        }
    }
}
/**     * Вход (на маленьких экранах)     */
function editTextLoginLink() {
    var bodyWidth = $('body').width(),
        $bHeaderLoginLink = $('.b-header__login-link');
    if ($bHeaderLoginLink.length) {
        if (bodyWidth < 800) {
            $bHeaderLoginLink.html('Вход');
        }
        else {
            $bHeaderLoginLink.html('Войти в личный кабинет');
        }
    }
    $bHeaderLoginLink.prop('style', "display:inline!important");
}
/**     *  Блок Категории - размер блоков     */
function editCategoriesWidthHeight() {
    var $bCategoriesContentBox = $('body').find('.b-categories__content-box'),
        $bCategoriesContentBg = $('body').find('.b-categories__content-bg'),
        $bCategoriesContentItem = $('body').find('.b-categories__content-item'),
        $jsCityPlace = $('body').find('.js-city-place');
    var w_Width = $bCategoriesContentBox.width();
    $bCategoriesContentBg.each(function (i, elem) {
        if ($(elem).is(":visible")) {
            w_Width = $(this).width();
        }
    });
    if ($bCategoriesContentBox.length) {
        $bCategoriesContentBox.hover(
            function () {
                $(this).children('.b-categories__content-bg').children('.b-categories__content-item-bg').addClass('b-categories__content-item-bg_hover');
            },
            function () {
                $(this).children('.b-categories__content-bg').children('.b-categories__content-item-bg').removeClass('b-categories__content-item-bg_hover');
            }
        );
        $bCategoriesContentBg.css({height: w_Width});
        $bCategoriesContentItem.css({width: w_Width});
        //$jsCityPlace.css({top: $bCategoriesContentBg.height() - $jsCityPlace.height()});
        $jsCityPlace.css({top: 'initial'});
        $jsCityPlace.css({bottom: '0'});

    }
}
/**Высоту блока с картинкой - КОНКУРСЫ */
function updateCarouselBlock() {
    if ($('[data-jcarousel="true"]').length) {
        $('[data-jcarousel="true"]').jcarousel("reload");
        $(".b-contests").each(function () {
            var $bContestsCarouselLi = $('.b-contests__carousel-li', this),
                $jsContestsCarousel = $('.js-contests__carousel', this),
                $bContestsCarouselNavigation = $('.b-contests__carousel-navigation', this);
            var elem_vis = 2;
            if ($('body').width() >= 640) {
                elem_vis = 3;
            }
            if ($('body').width() >= 839) {
                elem_vis = 4;
            }
            if ($('body').width() >= 949) {
                elem_vis = 6;
            }
            if ($jsContestsCarousel.length) {
                var vis = $jsContestsCarousel.data("vis");
                if (vis !== undefined && parseInt(vis) > 0)
                    elem_vis = parseInt(vis);
                var j = 0;
                $bContestsCarouselLi.each(function (i, elem) {
                    var elemHeight = $(elem).height(),
                        elemHeightTitle = $(elem).find('.b-contests__carousel-title').outerHeight(true);
                    $(elem).find('.b-contests__carousel-li-bg').css({height: elemHeight - elemHeightTitle});
                    $(elem).find('.b-contests__carousel-navigation-li').css({width: bContestsCarouselNavigation_6});
                    j++;
                });
                $jsContestsCarousel.find('.b-contests__carousel-ul').css({width: j * $jsContestsCarousel.width()});
                $jsContestsCarousel.find('.b-contests__carousel-li').css({width: $jsContestsCarousel.width()});
            }
            // ширина навигации
            if ($bContestsCarouselNavigation.length) {
                var bContestsCarouselNavigation_6 = $bContestsCarouselNavigation.outerWidth() / elem_vis;
                $bContestsCarouselNavigation.find('.b-contests__carousel-navigation-li').each(function (i, elem) {
                    $(elem).css({width: bContestsCarouselNavigation_6});
                });
            }
        });
    }
}

/** город детально     */
function setMarginLeftCity() {
    var $bCityBoxDetail = $('.b-city__box-detail'),
        $bCityBoxDetailItem = $bCityBoxDetail.find('.b-city__box-detail__item');
    if ($bCityBoxDetail.length) {
        var bCityBoxDetailWidth = $bCityBoxDetail.width(),
            bCityBoxDetailItemWidth = $bCityBoxDetailItem.width(),
            bCityBoxDetailItemMarginLeft = bCityBoxDetailWidth / 2 - bCityBoxDetailItemWidth / 2;
        $bCityBoxDetailItem.css({marginLeft: bCityBoxDetailItemMarginLeft});
    }
}


var cookieNamePlaceAdd = 'place_add',
    cookieOptionsPlaceAdd = {expires: 7, path: '/'},
    cookieNameStr = '',
    $bPlaceBox = $('.b-place-box'),
    bxPanel = $('#bx-panel').height();
/**Удаление из маршрута */
function deleteRoute() {
    $(".b-place-box__item-delete").unbind().on("click", function () {
        if ($.cookie(cookieNamePlaceAdd)) {
            cookieNameStr = $.cookie(cookieNamePlaceAdd).split(",");
            var parent = $(this).closest(".b-place-box__item");
            var id = parent.data("id");
            for (var i = 0, cnt = cookieNameStr.length; i < cnt; i++) {
                if (cookieNameStr[i] == id) {
                    cookieNameStr.splice(i, 1);
                    break;
                }
            }
            cookieNameStr = cookieNameStr.join(",");
            $.cookie(cookieNamePlaceAdd, cookieNameStr, cookieOptionsPlaceAdd);
            $(".js-place__add[data-id='" + id + "']").removeClass('js-place__add').html("Маршрут");
            parent.detach();
            if ($('.b-place-box__box').hasClass('b-place-box__box_show')) {
                resizeWindowPlaceBoxJS();
            }
            else {
                $('.b-place-box__expand').addClass('b-place-box__expand_show');
                resizeWindowPlaceBoxJS();
            }
            if (cookieNameStr.trim() === "") {
                $('.b-place-box__expand').removeClass("b-place-box__expand_show");
                $('.b-place-box__box').removeClass("b-place-box__box_show");
            }
        }
        return false;
    });
}
/**Добавить маршрут в блок */
function getDataToPlaceBox() {
    var $bPlaceBoxList = $('.b-place-box__list');
    $.ajax({
        url: '/include/place-box.php',
        success: function (data) {
            $bPlaceBoxList.html(data);
            deleteRoute();
        }
    });
}

/**     * лента (размер вкладок)     */
function setWidthLenta() {
    var $bLentaTabs = $('.b-lenta__tabs'),
        $bLentaTabsTitleLinkSpan = $('.b-lenta__tabs-title__link-span'),
        bLentaTabsTitleLinkSpanCount = $bLentaTabsTitleLinkSpan.length;
    if (bLentaTabsTitleLinkSpanCount > 0) {
        if (bLentaTabsTitleLinkSpanCount <= 4) {
            var jsWidth = 0;
            $bLentaTabsTitleLinkSpan.each(function (i, elem) {
                $(elem).css({width: elem.offsetWidt + 1});
            });
        }
        else {
            $(elem).css({width: $bLentaTabs.width() * 0.25})
        }
    }
}
// Коммерческая статья
$(function () {
    "use strict";
    if ($('.dg-container').length) {
        $('.dg-container').gallery();

        $(".dg-container a").click(function () {
            return false;
        });
        $(window).resize(function () {
            $(".dg-container").each(function () {
                var heightSliderImg = $(this).find(".dg-center").height();
                $(this).height(heightSliderImg);
            });
        });

        $(".dg-container .dg-center img").load(function () {
            $(".dg-container").each(function () {
                var heightSliderImg = $(this).find(".dg-center").height();
                $(this).height(heightSliderImg);
            });
        });
    }
});
$(document).ready(function () {
    if ($('.b-citymenu__item').length) {
        $('.b-citymenu__item').each(function (i, elem) {
            if (i < 4) {
                $(elem).addClass("b-citymenu__item_border");
            }
        });
    }

    /** Cмотреть весь текст */
    if ($('.js-place__description_small').length) {
        var description_small = $('.js-place__description_small'),
            description_small_link = $('.js-place__description_small-link');
        $(".b-place__description_small-link")
            .on(
            'click',
            function () {
                description_small.addClass('b-place__description_small-height');
                description_small_link.addClass('display-none');
            }
        );
    }

    marginItem();
    $(window).resize(function () {
        marginItem();
        resizeWindowJS();
        setWidthLenta();
        setMarginLeftCity();
        setSizeCategories__li23();

        updateCarouselBlock();
        setTimeout(editCategoriesWidthHeight(), 100);
        jsDropdownWidth();
        editTextLoginLink();
        editSeparatorTopMenu();
    });

    /**  Спрячем все слайды (кроме первого) - слайдер достопримечательностей */
    (function () {
        if ($('.js-objects__example-orbit').length) {
            $('.js-objects__example-orbit').find('li').each(function (i, elem) {
                $(elem).removeClass('display-none');
            });
        }
    })();
    /**     * замена Back на "Назад"   */
    (function () {
        var bHeaderMenuMobileLink = $('.b-header__menu-mobile-link');
        bHeaderMenuMobileLink.on('click', function () {
            jsGeneratedBack();
        });
    })();


    /**Переход на конкус - с заголовка     */
    (function () {
        var $jsContestsCarouselNavigationTitle = $('.js-contests__carousel-navigation-title');
        $jsContestsCarouselNavigationTitle.on('click', function (e) {
            location.href = $jsContestsCarouselNavigationTitle.data('href');
        })
    })();
    (function () {
        /**Слайдер     */
        $(document).foundation({
            orbit: {
                animation: 'fade',
                timer_speed: 5500,
                pause_on_hover: true,
                animation_speed: 500,
                navigation_arrows: true,
                bullets: false,
                slide_number: false,
                resume_on_mouseout: true
            },
            topbar: {
                mobile_show_parent_link: false,
                scrolltop : false
            },
            accordion: {
                content_class: 'content',
                active_class: 'active',
                multi_expand: true,
                toggleable: true
            },
            equalizer: {
                equalize_on_stack: true,
                act_on_hidden_el: true
            },
            tooltip: {
                disable_for_touch: true
            },
            tab: {
                callback: function (tab) {
                    setTimeout(editCategoriesWidthHeight(), 100);
                    if ($(tab).hasClass("b-object-detail__tabs-li")) {
                        $('.js-place__tabs').css({top: 0, position: "relative"});
                        if ($('.js-tabs-content').length) {
                            var jsTabsContent_top = $('.js-tabs-content').offset().top;
                        }
                        else {
                            var jsTabsContent_top = 0;
                        }
                        $("html, body").animate({scrollTop: jsTabsContent_top - $('.js-header').outerHeight(true) - $('.js-place__tabs').outerHeight(true) - 60}, 300);
                    } else if ($(tab).hasClass("b-citymenu__item")) {
                        $("html, body").animate({scrollTop: 0}, 300);
                    }
                    else if ($(tab).hasClass("b-contests-detail__tabs-item")) {
                        var el = $(".b-contests-detail__tabs-item-link", tab).eq(0);
                        var top = 0;
                        if ($(el).length) {
                            top = $(el.attr("href")).offset().top - $(".js-header").outerHeight(true) - $(".js-place__tabs").outerHeight(true) - 30;
                        }
                        $("html, body").animate({scrollTop: top}, 300);
                    }
                    if ($(tab).hasClass("js-tabs-sights-detail")) {
                        $("html, body").animate({scrollTop: $('.js-header').outerHeight(true) + $('.js-place__tabs').outerHeight(true) - 70}, 300);
                    }
                    var link = $(tab).find("a");
                    if (link.length && link.hasClass("x-link-fallow")) {
                        window.location.href = $(link).attr("href");
                    }
                    $(document).foundation('orbit', 'reflow');
                    $(document).foundation('equalizer', 'reflow');
                    setTimeout(function () {
                        resizeWindowJS();
                        updateCarouselBlock();
                    }, 290);
                }
            }
        });
    })
    /**Скролл     */
    (function () {
        $(".x-customScrollbox").mCustomScrollbar();
    });
    $(function () {
        $('.js-hoverdir-objects').each(function () {
            $(this).hoverdir();
        });
    });
    $(function () {
        if ($('.b-categories__li-medium').length) {
            $('.b-categories__li-medium').each(function () {
                var height = $(this).height();
                var heightLink = $(this).find('.b-categories__li-medium-item-link-box').height();
                $(this).find('.b-categories__li-medium-box').css({'min-height': height - heightLink});
            });
        }
        $('.js-hoverdir-objects').each(function () {
            $(this).hoverdir();
        });
    });
    /**Слайдер городов     */

    function bgCitySlider() {
        $('.b-city__box-bg__item').each(function (i, elem) {
            var backgroundimage = $(elem).data('backgroundimage'),
                backgroundimageTabs = $(elem).data('backgroundimage-tabs'),
                backgroundimageMobile = $(elem).data('backgroundimage-mobile'),
                widthBody = $(window).innerWidth();
            if ((backgroundimage !== undefined) && (backgroundimageTabs !== undefined) && (backgroundimageMobile !== undefined)) {
                if (widthBody > 1024) {
                    $(elem).css({'backgroundImage': 'url(' + backgroundimage + ')'});
                }
                else if (widthBody > 640) {
                    $(elem).css({'backgroundImage': 'url(' + backgroundimageTabs + ')'});
                }
                else {
                    $(elem).css({'backgroundImage': 'url(' + backgroundimageMobile + ')'});
                }

                $(elem).removeAttr('data-backgroundimage');
                $(elem).removeAttr('data-backgroundimage-tabs');
                $(elem).removeAttr('data-backgroundimage-mobile');
            }
        });
    }

    $(function () {
        function highlight(items) {
            items.filter(":eq(2)").addClass("b-city__box-thumbs__item_selected");
        }

        function unhighlight(items) {
            items.filter(":eq(2)").removeClass("b-city__box-thumbs__item_selected");
        }

        if ($('.b-city__box-thumbs').length) {
            $('.b-city__box-thumbs').carouFredSel({
                width: "100%",
                infinite: false,
                circular: true,
                auto: {play: false},
                synchronise: ['.b-city__box-bg', false, true],
                items: {
                    visible: 5,
                    start: 0
                },
                scroll: {
                    items: 1,
                    duration: 500,
                    onBefore: function (data) {
                        if (data.scroll.direction == "prev") {
                            highlight(data.items.visible);
                            unhighlight(data.items.old);
                            marginItem();
                            ajaxMap(data.items.visible.eq(2).data('id'));
                            bgCitySlider();
                        }
                    },
                    onAfter: function (data) {
                        if (data.scroll.direction == "next") {
                            unhighlight(data.items.old);
                            highlight(data.items.visible);
                            marginItem();
                            ajaxMap(data.items.visible.eq(2).data('id'));
                            bgCitySlider();
                        }
                    }
                },
                next: '.b-city__box-thumbs_next',
                prev: '.b-city__box-thumbs_prev',
                responsive: false,
                align: 'center',
                duration: 500
            });
            $('.b-city__box-thumbs').parent('.caroufredsel_wrapper').addClass("b-city__caroufredsel_wrapper");
            $('.b-city__box-bg').carouFredSel({
                width: '100%',
                infinite: false,
                circular: true,
                auto: {play: false},
                items: 1,
                scroll: {
                    fx: 'fade'
                },
                duration: 500
            });
            $('.b-city__box-thumbs .b-city__box-thumbs__item:eq(2)').addClass('b-city__box-thumbs__item_selected');
            marginItem();
            var $jsThumbsItem = $('.b-city__box-thumbs .b-city__box-thumbs__item');
            $jsThumbsItem.on('click', function () {
                $('.b-city__box-thumbs').trigger('slideTo', [this, -2]);
                marginItem();
            });
            function resizeWindowCityBgItem() {
                var $bCityBoxBgItem = $('.b-city__box-bg').find('.b-city__box-bg__item');
                $bCityBoxBgItem.css({width: $('body').width()});
                $('.b-city__box-bg').parent('.caroufredsel_wrapper').css({width: $('body').width()});
            }

            window.onresize = resizeWindowCityBgItem;
        }
    });

    /**     * Переход на страницу с вкладки "Все объекты"     */
    (function () {
        var $jsCategoriesItemAll = $('.js-categories__item_all');
        $jsCategoriesItemAll.on('click', function (e) {
            location.href = $jsCategoriesItemAll.data('href');
        })
    })();

    /**     * лента (размер вкладок)     */
    (function () {
        var $bLentaTabs = $('.b-lenta__tabs'),
            $bLentaTabsTitleLinkSpan = $('.b-lenta__tabs-title__link-span'),
            $bLentaTabsTitle = $('.b-lenta__tabs-title'),
            bLentaTabsTitleLinkSpanCount = $bLentaTabsTitleLinkSpan.length;
        if (bLentaTabsTitleLinkSpanCount > 0) {
            if (bLentaTabsTitleLinkSpanCount <= 4) {
                var jsWidth = 0;
                $bLentaTabsTitleLinkSpan.each(function (i, elem) {
                    $(elem).css({width: elem.offsetWidth + 3});
                });
                $bLentaTabsTitle.each(function (i, elem) {
                    jsWidth = jsWidth + elem.offsetWidth;
                });
                if ($bLentaTabs.width() > jsWidth) {
                    jsWidth = ($bLentaTabs.width() - jsWidth - 1) / 2;
                    $bLentaTabsTitleLinkSpan.each(function (i, elem) {
                        if ((i == 0) || (i == bLentaTabsTitleLinkSpanCount - 1)) {
                            $(elem).css({width: elem.offsetWidth + jsWidth});
                        }
                    });
                }
            }
            else {
                $(elem).css({width: $bLentaTabs.width() * 0.25})
            }
        }
    })();
    /**     * Переход на карту     */
    (function () {
        var $jsPlaceMap = $('.js-place__map'),
            $jsPlaceMapShow = $('.js-place-map'),
            $jsPlaceMapContent = $('.js-place__map-content'),
            $jsPlaceTabsContent = $('.b-place__tabs-content'),
            jsHeader = $('.b-header').height();
        if ($jsPlaceMapContent.length) {
            $jsPlaceMap.on('click', function () {
                $('.b-place__tabs-title').removeClass('active');
                $('.b-place__tabs-content .content').removeClass('active');
                $jsPlaceMapShow.addClass('active');
                $("html, body").animate({scrollTop: $jsPlaceTabsContent.offset().top - jsHeader}, 600);
                subMenu();
            })
        }
    })();
    /**     * Фиксируем подменю     */
    var mainSubMenuOffset = 0;
    if ($('.js-place__tabs') !== undefined && $('.js-place__tabs').length)
        mainSubMenuOffset = $('.js-place__tabs').offset().top;

    function subMenu() {
        var $jsPlaceTabs = $('.js-place__tabs'),
            $jsPlaceTabsContent = $('.js-tabs-content'),
            jsHeader = $('.js-header').outerHeight(true),
            insertElement = $('<div id="x-js-place__tabs-insert"></div>');
        if ($jsPlaceTabs === undefined || !$jsPlaceTabs.length)
            return false;
        var scroll = $(window).scrollTop(), scrollPlaceTabs = $jsPlaceTabs.offset().top;
        if ($jsPlaceTabsContent.length) {
            var scrollPlaceTabsContent = $jsPlaceTabsContent.offset().top;
        }
        else {
            var scrollPlaceTabsContent = 0;
        }
        if (((scroll > 0) && (scroll + jsHeader >= mainSubMenuOffset))) {
            if (!$("#x-js-place__tabs-insert").length) {
                $jsPlaceTabs.before(insertElement);
                $("#x-js-place__tabs-insert").css({"height": $jsPlaceTabs.outerHeight(true)});
            }
            $jsPlaceTabs.css({
                top: jsHeader,
                position: "fixed"
            });
        }
        else {
            $jsPlaceTabs.css({top: 0, position: "relative"});
            $("#x-js-place__tabs-insert").remove();
        }
        if (scroll + jsHeader + $jsPlaceTabs.outerHeight(true) + 30 <= scrollPlaceTabsContent) {
            $jsPlaceTabs.css({top: 0, position: "relative"});
        }
    }

    /**     * Фиксируем подменю     */
    (function () {
        subMenu();
        window.onload = function () {
            subMenu();
        };
        $(window).scroll(function () {
            subMenu();
        });
    })();
    /**     * Скрыть Ленту     */
    (function () {
        var $jsLenta = $('.js-lenta'),
            $jsLentaTitle = $('.b-lenta__title'),
            $jsLentaBox = $('.js-lenta__box'),
            $bLentaTabsTitle = $('.b-lenta__tabs-title'),
            $bLentaTabsTitleLink = $('.b-lenta__tabs-title__link');
        $jsLenta.on('click', function () {
            $jsLentaBox.toggleClass("b-lenta__box_hide");
            $jsLentaTitle.toggleClass("b-lenta__title_hide");
        });
        $bLentaTabsTitle.on('click', function () {
            $jsLentaBox.removeClass("b-lenta__box_hide");
            $jsLentaTitle.removeClass("b-lenta__title_hide");
        });
        $bLentaTabsTitleLink.on('click', function () {
            $jsLentaBox.removeClass("b-lenta__box_hide");
            $jsLentaTitle.removeClass("b-lenta__title_hide");
        });
    })();
    /**     * Меняет цвет "сердца"     */
    (function () {
        var $jsLikeHeart = $('.js-like-heart');
        $jsLikeHeart.on('click', function () {
            $(this).toggleClass("b-comments__item-like-heart_orange");
        });
    })();
    /**     * Прокручивает header     */
    (function () {
        function scrollHeader() {
            /*
             //Old
             var $jsHeader = $('.js-header');
             var headerHeight = $jsHeader.outerHeight() || $jsHeader.height();
             if ($(window).scrollLeft() != 0) {
             $jsHeader.css({left: -$(window).scrollLeft()});
             }
             else {
             $jsHeader.css({left: 0});
             }
             if ($(window).scrollTop() > 0) {
             if (!$jsHeader.hasClass("fixed"))
             $jsHeader.addClass("fixed");
             }*/
            var top = $(window).scrollTop(),
                left = $(window).scrollLeft(),
                header = $(".js-header"),
                height = header.height(),
                adminPanel = $("#bx-panel"),
                startScroll = (adminPanel !== undefined) ? adminPanel.height() : 0,
                headerParent = header.parent();

            header.removeClass("sticky");

            if ((top > startScroll)&&(top>0)) {
                header.css({
                    "position": "fixed",
                    left: 0,
                    top: 0
                });
                if (!header.hasClass("fixed"))
                    header.addClass("fixed");

                headerParent.css({
                    "padding-top": height + "px"
                });

                if (left > 0) {
                    header.css({
                        left: "-" + left + "px"
                    })
                }
            }
            else {
                header.removeClass("fixed");
                header.removeClass("expanded");
                $('body').removeClass("f-topbar-fixed");
                headerParent.css({
                    "padding-top": 0
                });
                header.css({
                    "position": "relative",
                    "top": 0,
                    "left": 0
                })
            }
        }

        $(window).scroll(function () {
            scrollHeader();
        });
        scrollHeader();
    })();
    /**     * Кнопка "Вверх"     */
    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });
        $('.scrollup').on('click', function () {
            $("html, body").animate({scrollTop: 0}, 600);
            return false;
        });
    })();
    /**     * Добавить в маршрут     */
    (function () {
        $bPlaceBox.css({top: bxPanel});
        deleteRoute();
        $('.js-place__add').each(function (i, elem) {
            $(elem).on('click', function () {
                if ($.cookie(cookieNamePlaceAdd)) {
                    cookieNameStr = $.cookie(cookieNamePlaceAdd) + ',';
                }
                else {
                    cookieNameStr = '';
                }
                $.cookie(cookieNamePlaceAdd, cookieNameStr + $(elem).data("id"), cookieOptionsPlaceAdd);
                getDataToPlaceBox();
                $(elem).html($(elem).data('text'));
                $(elem).removeClass('js-place__add');
                if ($('.b-place-box__box').hasClass('b-place-box__box_show')) {
                    resizeWindowPlaceBoxJS();
                }
                else {
                    $('.b-place-box__expand').addClass('b-place-box__expand_show');
                    resizeWindowPlaceBoxJS();
                }
                deleteRoute();
                return false;
            });
        });
        /**         * Ограничивает размер блока маршрут         */
        resizeWindowPlaceBoxJS();
        $(window).resize(function () {
            resizeWindowPlaceBoxJS();
        });
        var $bPlaceBoxExpand = $('.b-place-box__expand'),
            $bPlaceBoxCollapse = $('.b-place-box__collapse'),
            $bPlaceBoxBox = $('.b-place-box__box');
        $bPlaceBoxExpand.on('click', function () {
            $bPlaceBoxExpand.removeClass('b-place-box__expand_show');
            $bPlaceBoxBox.addClass('b-place-box__box_show');
            resizeWindowPlaceBoxJS();
            var bodyWidth = $('body').width();
            if ((bodyWidth >= 1325) && (bodyWidth <= 1375)) {
                var bHeaderMenuTop = $('.b-header__menu-top').outerWidth(),
                    $bCityBoxSlider = $('.b-city__box-slider'),
                    $bCityBoxSliderBg = $('.b-city__box-slider_bg'),
                    $jsPaddingLeftPlaceBoxShow = $('.js-padding-left__place-box_show'),
                    $jsCaroufredselWrapper = $('.b-city__box-bg').parent('.caroufredsel_wrapper'),
                    jsValueLeft = bodyWidth - bHeaderMenuTop - 115;
                $jsPaddingLeftPlaceBoxShow.css({paddingLeft: jsValueLeft});
                $jsCaroufredselWrapper.css({left: -jsValueLeft});
                $bCityBoxSlider.css({width: bodyWidth - jsValueLeft});
                $bCityBoxSliderBg.css({width: bodyWidth - jsValueLeft});
            }
            resizeWindowPlaceBoxJS();
        });
        $bPlaceBoxCollapse.on('click', function () {
            $bPlaceBoxExpand.addClass('b-place-box__expand_show');
            $bPlaceBoxBox.removeClass('b-place-box__box_show');
            var $bCityBoxSlider = $('.b-city__box-slider'),
                $bCityBoxSliderBg = $('.b-city__box-slider_bg'),
                $jsPaddingLeftPlaceBoxShow = $('.js-padding-left__place-box_show'),
                $jsCaroufredselWrapper = $('.b-city__box-bg').parent('.caroufredsel_wrapper');
            $jsPaddingLeftPlaceBoxShow.css({paddingLeft: 0});
            $jsCaroufredselWrapper.css({left: 0});
            $bCityBoxSlider.css({width: '100%'});
            $bCityBoxSliderBg.css({width: '100%'});
        });
    })();
    /**     * Кастомизация select     */
    $(function () {
        if ($('.chosen-select').length) {
            $('.chosen-select').chosen();
        }
    });
    /**     * Размер картинки - Товары-Услуги объекта     */
    $(function () {
        editHeightObjectDetailServices();
    });
    (function () {
        var widthBody = $(window).innerWidth();
        if (widthBody >= 1170) {
            if ($('.b-rubrikmenu__item').length) {
                $('.b-rubrikmenu__item[title!=""]').qtip({
                    style: {classes: 'b-rubrikmenu-qtip'},
                    position: {
                        my: 'top center',
                        at: 'bottom center'
                    }
                });
            }
        }
    })();
    (function ($) {
        $(function () {
            "use strict";
            var widthBody = $(window).innerWidth();
            if (widthBody >= 1100) {
                $("body").on("mouseover", "div.b-dostoprim-items-four-item", function () {
                    $(this).parent().find('.b-dostoprim-items-four-item').css({'width': '7%'});
                    $(this).removeClass('b-dostoprim-items-four-item-min').css({'width': '79%'});
                    setTimeout(
                        $(this).find('.js-dostoprim-items-four-item-bg__link').addClass('b-dostoprim-items-four-item-bg__link'),
                        1000);
                }).on("mouseout", "div.b-dostoprim-items-four-item", function () {
                    $('.b-dostoprim-items-four-item').css({'width': '25%'});
                    $(this).find('.js-dostoprim-items-four-item-bg__link').removeClass('b-dostoprim-items-four-item-bg__link');
                });
            }
        });
    })(jQuery);

    (function () {
        if ($('.js-dropdown').length) {
            var j = 0;
            $('.js-dropdown li').each(function (i, elem) {
                j++;
            });
            if (j % 2 == 1) {
                $("<li style='display: none;'></li>").prependTo($('.js-dropdown'));
            }
            if ($('.b-content').width() >= 1140) {
                $('.js-dropdown').css({width: 600});
            }
        }
    })();
    (function () {
        if ($(".js-phone").length) {
            $(".js-phone").mask("+7 (999) 999 99 99");
        }
    })();
    (function () {
        if ($('.back-box').length) {
            $('.back-box').css({height: $('.b-objects__title').outerHeight(true)});
        }
    })();
    /**Размер блока с картинкой - Конкурс (Участники)   */
    (function () {
        if ($('.js-participant-bg').length) {
            $('.js-participant-bg').each(function (i, elem) {
                var height = $(elem).width() * 0.7;
                $('.js-participant-bg').css({height: height});
            });
        }
    })();
    /**Подсказка - навигация*/
    (function () {
        if ($('.b-pagination__li-input').length) {

            var $bPaginationLiInput = $('.b-pagination__li-input');

            // Ввод только цифр
            $bPaginationLiInput.on("keydown", function (e) {
                if (e.keyCode == 13) {
                    var id = parseInt($(this).val());
                    var link = $(this).data("link");
                    console.log(id, link);
                    if (id > 0 && link !== undefined && link !== "") {
                        link = link.replace("#PAGE_NUM#", id);
                        window.location.href = link;
                    }
                }
            }).on("change keyup input click", function () {
                if (this.value.match(/[^0-9]/g)) {
                    this.value = this.value.replace(/[^0-9]/g, '');
                }
            });

            $bPaginationLiInput.on('focus', function () {
                $('.b-pagination__li-input-span').addClass('b-pagination__li-input-span_show');
            });
            $bPaginationLiInput.on('focusout', function () {
                $('.b-pagination__li-input-span').removeClass('b-pagination__li-input-span_show');
            });
        }
    })();

    //Голосование
    $(".x-vote").on("click", function () {
        var id = $(this).data("id");
        if (id !== undefined && parseInt(id) > 0) {
            $.ajax({
                url: "/local/ajax/vote.php",
                data: {
                    action: "add",
                    id: id
                },
                method: "post",
                dataType: "json",
                success: function (response) {
                    if (response.ERRORS !== undefined)
                        alert(response.ERRORS.join("\n"));
                    else if (response.VOTES !== undefined) {
                        var link = $(".x-vote[data-id='" + id + "']");
                        link.find(".b-contests-participant__show_votes").text(response.VOTES);
                        link.addClass("disabled");
                    }
                }
            })
        }
        return false;
    });

    //Голосование детальная страница
    $(".x-vote-detail").on("click", function () {
        var id = $(this).data("id");
        if (id !== undefined && parseInt(id) > 0) {
            $.ajax({
                url: "/local/ajax/vote.php",
                data: {
                    action: "add",
                    id: id
                },
                method: "post",
                dataType: "json",
                success: function (response) {
                    if (response.ERRORS !== undefined)
                        alert(response.ERRORS.join("\n"));
                    else if (response.VOTES !== undefined) {
                        var link = $(".x-vote-detail[data-id='" + id + "']");
                        $(".b-contests-participant__show_votes").text(response.VOTES);
                        link.closest(".columns").html("&nbsp;");
                    }
                }
            })
        }
        return false;
    });

    if ($.fn.zclip) {
        //Копирование в буфер ссылки
        $(".b-contests-participant__page-link_copy").zclip({
            path: "/local/templates/krymgid-common/js/vendor/zclip//ZeroClipboard.swf",
            copy: function () {
                return $(".b-contests-participant__page-link span").text();
            },
            afterCopy: function () {
                var text = $(".b-contests-participant__page-link_copy").text();
                $(".b-contests-participant__page-link_copy").text("скопировано");

                setInterval(function () {
                    $(".b-contests-participant__page-link_copy").text(text);
                }, 2000);
            }
        });
    }
});
// посторонние ссылки открывать в новом окне
$(function () {
    var c_host = document.location.host.replace(/www\./, '');
    $(document.body).on('click', 'a', function () {
        if (this.href && this.href.indexOf(c_host) == -1) {
            $(this).attr('target', '_blank');
        }
    });
});

$(function () {
    if ($('.js-categories-content-link').length) {
        $('.js-categories-content-link').on('click', function () {
            var idcategories = $(this).data('idcategories');
            var categoriesloader = $(this).data('categoriesloader');
            if (categoriesloader != true) {
                $(this).data('categoriesloader', true);
                //путь к файлу с компонентом. Указываем параметр
                var path = "/include/ajax/categories-more.php?ajax=Y";
                var nameBox = '.js-categories-content-box_' + idcategories + '';
                $.ajax({
                    url: path,
                    cache: true,
                    data: {SECTION_ID: idcategories},
                    context: $(nameBox),
                    beforeSend: function () {
                        $(this).html('<div class="b-ajax-load"><img src="/local/templates/krymgid-common/i/ajax-load.gif" /></div>');
                    },
                    success: function (data, textStatus, XMLHttpRequest) {
                        $(this).html(data);
                        setTimeout(
                            function () {
                                var $bCategoriesContentBox = $(nameBox).find('.b-categories__content-box'),
                                    $bCategoriesContentBg = $(nameBox).find('.b-categories__content-bg'),
                                    $bCategoriesContentItem = $(nameBox).find('.b-categories__content-item'),
                                    $jsCityPlace = $(nameBox).find('.js-city-place');
                                if ($bCategoriesContentBox.length) {
                                    $bCategoriesContentBox.hover(
                                        function () {
                                            $(this).children('.b-categories__content-bg').children('.b-categories__content-item-bg').addClass('b-categories__content-item-bg_hover');
                                        },
                                        function () {
                                            $(this).children('.b-categories__content-bg').children('.b-categories__content-item-bg').removeClass('b-categories__content-item-bg_hover');
                                        }
                                    );
                                    var w_Width = $bCategoriesContentBox.width();
                                    $bCategoriesContentBg.css({height: w_Width});
                                    $bCategoriesContentItem.css({width: w_Width});
                                    $jsCityPlace.css({top: $bCategoriesContentBg.height() - $jsCityPlace.height()});
                                }
                                $(document).foundation('equalizer', 'reflow');
                                var cookieNamePlaceAdd = 'place_add',
                                    cookieOptionsPlaceAdd = {expires: 7, path: '/'},
                                    cookieNameStr = '',
                                    $bPlaceBox = $('.b-place-box'),
                                    bxPanel = $('#bx-panel').height();
                                $('.js-place__add').each(function (i, elem) {
                                    $(elem).on('click', function () {
                                        if ($.cookie(cookieNamePlaceAdd)) {
                                            cookieNameStr = $.cookie(cookieNamePlaceAdd) + ',';
                                        }
                                        else {
                                            cookieNameStr = '';
                                        }
                                        $.cookie(cookieNamePlaceAdd, cookieNameStr + $(elem).data("id"), cookieOptionsPlaceAdd);
                                        getDataToPlaceBox();
                                        $(elem).html($(elem).data('text'));
                                        $(elem).removeClass('js-place__add');
                                        if ($('.b-place-box__box').hasClass('b-place-box__box_show')) {
                                            resizeWindowPlaceBoxJS();
                                        }
                                        else {
                                            $('.b-place-box__expand').addClass('b-place-box__expand_show');
                                            resizeWindowPlaceBoxJS();
                                        }
                                        deleteRoute();
                                        return false;
                                    });
                                });
                            },
                            300
                        );
                    }
                });
            }
        });
    }
});


/**
 * Next и Prev - для слайдера участника конкурса
 */
$(function () {
    if ($('.js-participant').length) {
        $('.fotorama__arr--prev').addClass('b-contests-participant__footorama_prev');
        $('.fotorama__arr--next').addClass('b-contests-participant__footorama_next');
    }
});

$(function () {
    if ($('.js-city-slider-ajax').length) {
        $('.b-city__box-bg__item').each(function (i, elem) {
            var backgroundimage = $(elem).data('backgroundimage');
            if (backgroundimage !== undefined) {
                $(elem).removeClass('display-none');
            }
        });
        $('.b-city__box-thumbs__item').each(function (i, elem) {
            $(elem).removeClass('display-none');
        });
    }
});

$(function () {
    if ($('.js-tabs_turn').length) {
        $('.js-tabs_turn').on('click', function () {
            $(this).toggleClass('js-tabs_turn_hide');
            $('.b-citymenu').toggleClass('b-citymenu_hide');
            if ($(this).hasClass('js-tabs_turn_hide')) {
                $(this).html($(this).data('text-down'));
            }
            else {
                $(this).html($(this).data('text-up'));
            }

        });
    }
});

$(function () {
    if ($('.js-place-tabs_turn').length) {
        $('.js-place-tabs_turn').on('click', function () {
            $(this).toggleClass('js-tabs_turn_hide');
            $('.js-place__tabs').find('ul').toggleClass('b-place__tabs_hide');
            if ($(this).hasClass('js-tabs_turn_hide')) {
                $(this).html($(this).data('text-down'));
            }
            else {
                $(this).html($(this).data('text-up'));
            }
        });
    }
});
if (typeof($) !== 'undefined') {
    $(document).ready(function () {
        $('.b-footer__quick-subscribe-button').click(function () {
            if (!$.trim($('#js-form-quick-subscribe input[name$="asd_email"]').val()).length) {
                return false;
            }
            var arPost = {};
            $.each($('#js-form-quick-subscribe input'), function () {
                if ($(this).attr('type') != 'checkbox' || ($(this).attr('type') == 'checkbox' && $(this).is(':checked'))) {
                    arPost[$(this).attr('name')] = $(this).val();
                }
            })
            $('#asd_subscribe_res').hide();
            $('.b-footer__quick-subscribe-button').attr('disabled', 'disabled');
            $.post('/local/components/asd/subscribe.quick.form/action.php', arPost,
                function (data) {
                    $('.b-footer__quick-subscribe-button').removeAttr('disabled');
                    if (data.status == 'error') {
                        $('#asd_subscribe_res').css('color', 'red');
                    } else {
                        $('#asd_subscribe_res').css('color', 'green');
                    }
                    $('#asd_subscribe_res').html(data.message);
                    $('#asd_subscribe_res').show();
                }, 'json');
            return false;
        });
    });
}