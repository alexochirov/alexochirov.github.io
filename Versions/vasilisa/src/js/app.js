$(document).foundation();

(function($) {
    "use strict";
    $(function() {

        $(".x-carousel-main").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: true,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev"> </i>',
            nextArrow: '<i class="slick-next"> </i>'
        });

        //begin of corrector page count (block .hit)
        var allPageCat = $('.corrector__slide').length;
        $('.js-allPageCat').text(allPageCat);

        $(".hit__input").keyup(function() {
            var inputNumber = $(this).val();
            if (inputNumber > allPageCat) {
                inputNumber = allPageCat;
            }
            if (!inputNumber) {
                return;
            }
            if (inputNumber == 0) {
                return;
            }
            $('.corrector').slick('slickGoTo', inputNumber - 1);
        });

        $(".corrector").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 2,
            slidesToScroll: 2,
            prevArrow: '<i class="slick-prev"> </i>',
            nextArrow: '<i class="slick-next"> </i>',
            responsive: [{
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
        });

        $(".hit__next").click(function() {
            $('.corrector').slick('slickNext');
        });
        $(".hit__prev").click(function() {
            $('.corrector').slick('slickPrev');
        });

        $('.corrector').on('afterChange', function(event, slick, currentSlide) {
            $('.js-leftPageCat').text(currentSlide + 1);
            $('.js-rightPageCat').text(currentSlide + 2);
        });
        //end of corrector page count (block .hit)


        $(".x-carousel-services").slick({
            infinite: true,
            dots: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            autoplayHoverPause: true
        });

        $(".x-carousel-news").slick({
            infinite: true,
            arrows: false,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 7000,
            autoplayHoverPause: true
        });


        function buildSliderNavigation() {
            var src = "", counter = 0;
            $('.product__slide').not(".slick-cloned").find('img').each(function() {
                src = $(this).attr('src');
                $('.product .slick-dots li').eq(counter).find("button").html('<img src="' + src + '" alt=""/>');
                counter++;
            });
        }
        $('.product').on('init', function(event, slick) {
            buildSliderNavigation();
        }).slick({
            infinite: true,
            speed: 300,
            dots: true,
            arrows: true,
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<div class="product__arrow product__prev"> <svg width="67"  viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" fill="#dfdfdf"/></svg> </div>',
            nextArrow: '<div class="product__arrow product__next"> <svg width="67" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" fill="#dfdfdf"/></svg> </div>'
        });



        $('.x-carousel-news-link').on('click', function(e) {
            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });

        //клик по гиперссылке RetailRocket
        $(document).on("mousedown", ".js-rrlink", function(e) {
            var item_id = $(this).data("item_id");
            var method_name = $(this).data("method_name");
            var method_name_json = {methodName: method_name};
            try { rrApi.recomMouseDown(item_id,method_name_json) } catch (e) {}
            console.log(method_name+" item:"+item_id);
            return true;
        });

        //добавление в корзину
        $(document).on("click", ".js-add2cart", function(e) {
            e.preventDefault();
            var date = new Date(), timestamp = date.getTime();
            var $pThis = $(this);
            var id = $pThis.data("product-id");
            if (!id) return false;
            try { rrApi.addToBasket(id) } catch(e) {} //rrApi must be defined in <head>
            $.ajax({
                type: "POST",
                url: "/ajax/Add2Basket/?timestamp=" + timestamp,
                data: {
                    item_id: id,
                    quantity: 1,
                    action: "ADD"
                }
            }).done(function(data){
                if (data){
                    $pThis.text("Добавлено");
                }
            });
        });

        $(".js-scroll-to-catalog").on("click", function () {
            var link = $(this).attr("href");
            $('html,body').stop().animate({scrollTop: $(link).offset().top}, 500);
            return false;
        });

        //***********Плавная прокрутка***********************************
        $(window).scroll(function (){
            if ($(this).scrollTop() > 160){
                $(".backtotop").fadeIn();
            } else {
                $(".backtotop").fadeOut();
            }
        });
        $('.backtotop').click(function() {
            $('html, body').animate({scrollTop: 0},500);
            return false;
        });
        //**********************************************

        //показ альтернативного изображения в разделах каталога
        $(document).on("mouseenter", ".product-tile", function() {
            if ($(this).find(".js-altimage").size()>0) {
                $(this).find(".thumbnail").addClass("hide");
                $(this).find(".js-altimage").removeClass("hide");
            }
        }).on("mouseleave", ".product-tile", function() {
            if ($(this).find(".js-altimage").size()>0) {
                $(this).find(".thumbnail").removeClass("hide");
                $(this).find(".js-altimage").addClass("hide");
            }
        });

        // стартовое окошко
        var $pWelcome = $(".welcome[data-reveal]");
        if ( $pWelcome.size() > 0 ) $pWelcome.foundation("open");
        // for landing-bag.pug
          var clock;
          clock = $(".clock").FlipClock({
            aautoStart: false, // автозапуск
            language: 'ru-ru'
          });

      		var target = $(".clock").attr("data-day"); //Дата до которой нужен таймер
      		var targetDate = Date.parse(target); //Переводим в мил. секунды
      		var nowDate = Date.now(); //Текущая дата и время в мил. секундах
      		var time = (targetDate - nowDate) / 1000; //Получаем секунды
          clock.setTime(time); //Устанавливаем нужное время в секундах
          clock.setCountdown(true); //Устанавливаем отсчет назад
          clock.start(); //Запускаем отсчет

          $(".clock").find('a').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
          });

          });
          $('.landing-btn-order').on('click', function(event) {
            event.preventDefault();
            $(this).text("Оформить заказ");
          });
})(jQuery);
