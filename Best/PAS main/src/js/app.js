;
$(document).foundation();

(function ($) {
    "use strict";
    $(function () {

        $(".section__slider").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev"> </i>',
            nextArrow: '<i class="slick-next"> </i>',
            responsive: [

                {
                    breakpoint: 850,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        $(".stat__slider").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev"> </i>',
            nextArrow: '<i class="slick-next"> </i>',
            responsive: [

                {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 410,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });


        (function () {
            $('.header__menu').click(function () {
                $(".menu__list").toggleClass('js-show');
            });
        })();

        //begin of calendar
        function Calendar2(id, year, month) {
            var Dlast = new Date(year, month + 1, 0).getDate(),
                D = new Date(year, month, Dlast),
                DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
                DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
                calendar = '<tr>',
                dArr = [],
                month = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
            if (DNfirst != 0) {

                for (var i = 1; i < DNfirst; i++) {
                    var ddd = 1 - i;
                    var DNL = new Date(D.getFullYear(), D.getMonth(), ddd).getDate();
                    dArr.push(DNL);
                }
                dArr = dArr.reverse();

                for (var i = 1; i < DNfirst; i++) {
                    calendar += '<td class="calendar__not-this">' + dArr[i - 1];
                }
            } else {
                for (var i = 1; i < 7; i++) {
                    var ddd = 1 - i;
                    var DNL = new Date(D.getFullYear(), D.getMonth(), ddd).getDate();
                    dArr.push(DNL);
                }
                dArr = dArr.reverse();
                for (var i = 0; i < 6; i++) calendar += '<td class="calendar__not-this">' + dArr[i];
            }
            for (var i = 1; i <= Dlast; i++) {
                if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
                    calendar += '<td class="today">' + i;
                } else {
                    calendar += '<td>' + i;
                }
                if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                    calendar += '<tr>';
                }
            }
            var iC = 1;
            for (var i = DNlast; i < 7; i++) {

                calendar += '<td class="calendar__not-this">' + iC;
                iC++;
            }
            document.querySelector('#' + id + ' tbody').innerHTML = calendar;
            document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = month[D.getMonth()] + ' ' + D.getFullYear();
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
            document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
            if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
                document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
            }
            document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td colspan="7" class="calendar__bottom">&nbsp;</tr>';

        }

        if ($('#calendar2').is('table')) {
            Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
            document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function () {
                Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) - 1);
            }
// переключатель плюс месяц
            document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function () {
                Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month) + 1);
            }
        }

//end of calendar


    });
})(jQuery);