(function($) {

    $(function() {
        "use strict";

        $(document).foundation({
            tab: {
                callback: function(tab) {
                    $('.b-tabs__slider').slick("reinit");
                }
            },
            equalizer: {
                // Specify if Equalizer should make elements equal height once they become stacked.
                equalize_on_stack: true,
                // Allow equalizer to resize hidden elements
                act_on_hidden_el: false
            }
        });
    });

$('.b-plakat__slider').on('init', function(){
   
  $(this).attr("style","display:block;");
  // left
});

$('.b-plakat__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
    });


    //begin of fix tabs 
    function fixtab() {
        $(' .tab-title a').click(function() {

        })
    }

    //end of fix tabs 
    //begin of yandex map
        $('.b-eve__disable-drag').click(function() {
            if ($(this).hasClass('js-disable-drag_enable')) {
                $(this).html($(this).data('drag_disable'));
                myMap.behaviors.disable('drag');
                $(this).addClass('js-disable-drag_disable');
                $(this).removeClass('js-disable-drag_enable');
            } else {
                myMap.behaviors.enable('drag');
                $(this).html($(this).data('drag_enable'));
                $(this).removeClass('js-disable-drag_disable');
                $(this).addClass('js-disable-drag_enable');
            }
        });

        $('.b-eve__disable-drag1').click(function() {
            if ($(this).hasClass('js-disable-drag_enable')) {
                $(this).html($(this).data('drag_disable'));
                myMap1.behaviors.disable('drag');
                $(this).addClass('js-disable-drag_disable');
                $(this).removeClass('js-disable-drag_enable');
            } else {
                myMap1.behaviors.enable('drag');
                $(this).html($(this).data('drag_enable'));
                $(this).removeClass('js-disable-drag_disable');
                $(this).addClass('js-disable-drag_enable');
            }
        });








    //end of yandex map
    //begin of header menu margin

    function headerMenu() {
        if ($(window).width() > 781) {
            var allsize = $('.b-header__list').width() - 3;
            var lisize = 0;
            $('.b-header__li').each(function() {
                lisize += $(this).width();
            })
            var limargin = (allsize - lisize) / ($('.b-header__li').length);
            $('.b-header__li').each(function() {
                $(this).attr("style", "margin-right:" + limargin + "px;");
            })
        }


    }
    //end of header menu margin

    //begin of b-theatre menu padding
    function theatreMenu() {

        if ($(window).width() > 781) {
            var allsize = $('.b-theatre__list').width() - 3;
            var lisize = 0;
            $('.b-theatre__li-link').each(function() {
                lisize += $(this).width();
            })
            var lipadding = (allsize - lisize) / ($('.b-theatre__li-link').length) / 2;
            $('.b-theatre__li-link').each(function() {
                $(this).attr("style", "padding-right:" + lipadding + "px; padding-left:" + lipadding + "px;");
            })

        }

    }
    //End of b-theatre menu padding
    //begin of town select
    $('.b-calendar__select').click(function() {
        $('.b-calendar__store').slideToggle();
    })

    $(document).mouseup(function(e) {
        var container = $(".b-calendar__sel");
        if (container.has(e.target).length === 0) {
            $(".b-calendar__store").slideUp();
        }
    });

    $('.b-calendar__town').click(function() {
        var townName = $(this).text();
        $('.b-calendar__select').text(townName);
        $(".b-calendar__store").slideUp();
    })

    //end of town select
    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
        $('a.js-scroll').bind('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 0

            }, 1000, 'easeInQuart');
            event.preventDefault();
        });
    });

    $(document).scroll(function() {
        if (window.scrollY > 500) {
            $('.b-scroll').attr("style", "display:block;")
        } else {
            $('.b-scroll').attr("style", "display:none;")
        }
    });

    //end jQuery for page scrolling feature - requires jQuery Easing plugin
    //begin of b-eve__img equalize
    function myimghei() {
        var myturboheight = $('.b-eve__img_first').height();
        $('.b-eve__img_else').height(myturboheight);
    }
    

    //end of b-eve__img equalize
    //begin of sliders

    // begin b-eve__slider
    $('.b-eve__slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        arrows: true
    });

    var koliches = $('.b-eve__slider .slick-slide img').length - 2;
    var imagmy = [];
    for (var ii = 0; ii < koliches; ii++) {
        var put = $('.b-eve__slider .slick-slide img').eq(ii).attr('src');
        imagmy.push(put);
    }
    for (var ii = 0; ii < koliches; ii++) {
        $(' .b-eve__slider .slick-dots>li').eq(ii - 1).find('button').attr("style", "background: url(" + imagmy[ii] + "); background-size:123%; opacity:0.4;")
    }

    $('.b-eve__slider .slick-dots>li').eq(0).find('button').addClass("js-border");

    var bivshiySlide = 0;
    $('.b-eve__slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.b-eve__slider .slick-dots>li').eq(bivshiySlide).find('button').removeClass("js-border");
        $('.b-eve__slider .slick-dots>li').eq(nextSlide).find('button').addClass("js-border");
        bivshiySlide = nextSlide;
    });
    //end b-eve__slider





    //begin change tre
    (function() {
        function changeTreanglePos(elem, slider, moment) {
            var objectPos,
                treangle = $(".b-pesa__slider-treangle", slider),
                offset = 0,
                top,
                parentOffset;

            if (treangle.length) {
                if (elem === null) {
                    elem = $(".b-pesa__block_active", slider);
                }

                offset = 0;
                top = parseInt($(elem).offset().top) || 0;
                parentOffset = parseInt($(elem).parent().offset().top) || 0;
                parentOffset1 = parseInt($(elem).parent().css("top")) || 0;
                objectPos = parseInt(top - parentOffset + offset + parentOffset1) || 0;
                if (slider.is(":visible")) {
                    if (moment) {
                        treangle.css({
                            "top": objectPos + "px"
                        });
                    } else {
                        treangle.animate({
                            "top": objectPos + "px"
                        }, 300);
                    }
                }
            }
        }

        $(".b-tabs__window").each(function() {
            var slider = $(this);

            var sliderImg = $('.b-tabs__slider', slider).slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                arrows: false,
                cssEase: 'linear'
            });

            $('.b-tabs__slider', slider).on("reinit", function() {
                changeTreanglePos(null, slider, true);
            });
            $('.b-tabs__slider', slider).on("beforeChange", function() {
                changeTreanglePos(null, slider, true);
            });

            changeTreanglePos(null, slider);

            $('.b-pesa__block', slider).on('click', function() {
                var slideGoTo = $('.b-pesa__block', slider).index(this);

                sliderImg.slick('slickGoTo', slideGoTo);

                $('.b-pesa__block', slider).removeClass("b-pesa__block_active");
                $(this).addClass("b-pesa__block_active");

                changeTreanglePos(this, slider);

                return false;
            });

            $(".mCustomScrollbar", slider).mCustomScrollbar({
                callbacks: {
                    whileScrolling: function() {
                        changeTreanglePos(null, slider, true);
                    }
                }
            });
        });
    })();
    //end change tre
    //begin of b-calendar__slider change nowday and hovering
    $('.b-calendar__block').click(function() {
        $('.b-calendar__block_now').removeClass('b-calendar__block_now')
        $(this).addClass('b-calendar__block_now');
    })

    function calenda() {
        if ($(window).width() > 769) {


            $('.b-calendar__block').mouseenter(function() {
                posS = $(".b-calendar__slider").offset().left;
                posL = $(this).offset().left;
                posB = $('.b-calendar__sli-wrapper').offset().left;


                var popravka = $(this).parent().parent().parent().parent().parent().index();
                if (popravka == 1) {
                    posA = posL - posS - 2;
                } else {
                    posA = posL - posS - 16 - posB;
                }
                var nomer = $(this).parent().parent().index();
                var coldney = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').length;
                if (nomer >= coldney) {
                    nomer = nomer - coldney;
                }
                var data = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').eq(nomer);
                data.attr("style", "display:block; left:" + posA + "px;");
                $(data).mouseenter(function() {
                    $(this).attr("style", "display:block; left:" + posA + "px;");
                }).mouseleave(function() {
                    $(this).attr("style", "display:none;")
                })

            }).mouseleave(function() {
                var nomer = $(this).parent().parent().index();
                var popravka = $(this).parent().parent().parent().parent().parent().index();
                var coldney = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').length;
                if (nomer >= coldney) {
                    nomer = nomer - coldney;
                }
                var data = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').eq(nomer);
                data.attr("style", "display:none;")
            })
        } else {


            $('.b-calendar__more').click(function() {
                var firstraz = 0;
                if (firstraz == 0) {
                    posS = $(".b-calendar__slider").offset().left;
                    posL = $(this).parent().find('.b-calendar__block').offset().left;
                    posB = $('.b-calendar__sli-wrapper').offset().left;

                    var popravka = $(this).parent().find('.b-calendar__block').parent().parent().parent().parent().parent().index();
                    if (popravka == 1) {
                        posA = posL - posS - 2;
                    } else {
                        posA = posL - posS - 16 - posB;
                    }
                    var nomer = $(this).parent().find('.b-calendar__block').parent().parent().index();
                    var coldney = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').length;
                    if (nomer >= coldney) {
                        nomer = nomer - coldney;
                    }
                    var data = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').eq(nomer);
                    data.attr("style", "display:block; left:" + posA + "px;");

                    firstraz++;
                } else {
                    var nomer = $(this).parent().find('.b-calendar__block').parent().parent().index();
                    var popravka = $(this).parent().find('.b-calendar__block').parent().parent().parent().parent().parent().index();
                    var coldney = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').length;
                    if (nomer >= coldney) {
                        nomer = nomer - coldney;
                    }
                    var data = $('.b-calendar__mes').eq(popravka - 1).find('.b-date').eq(nomer);
                    data.attr("style", "display:none;")
                    firstraz = 0;
                }


            });
            $(document).mouseup(function(e) {
                var container = $(".b-calendar__more");
                if (container.has(e.target).length === 0) {
                    $(".b-date").hide();
                }
            });
        }
    }


    //end of b-calendar__slider change nowday and hovering

    //begin of b-calendar__month choose of month
    $(".b-calendar__month").click(function() {
        $('.b-month').slideToggle();
    })


    $(document).mouseup(function(e) {
        var container = $(".b-calendar__month-wrap");
        if (container.has(e.target).length === 0) {
            $(".b-month").slideUp();
        }
    });


    $('.b-month__link').click(function() {
        $(".b-month").slideUp();
        var textlink = $(this).text();
        $('.b-calendar__month').text(textlink);
        var kakoy = $(this).index();
        $('.b-calendar__slider_active').removeClass('b-calendar__slider_active');
        var etot = $('.b-calendar__slider').eq(kakoy);
        etot.addClass('b-calendar__slider_active');
        etot.slick("destroy");
        etot.slick({
            centerMode: true,
            centerPadding: '5px',
            slidesToShow: 7,
            responsive: [{
                breakpoint: 1141,
                settings: {
                    centerMode: true,
                    centerPadding: '5px',
                    slidesToShow: 3
                }
            }, {
                breakpoint: 450,
                settings: {
                    centerMode: true,
                    centerPadding: '5px',
                    slidesToShow: 1
                }
            }]
        });


    })
    //end of b-calendar__month choose of month



$('.b-calendar__slider').first().on('init', function(){
   
  $(this).addClass("b-calendar__slider_active");
  // left
});

    var calendarS = $('.b-calendar__slider');
    calendarS.slick({
        centerMode: true,
        centerPadding: '5px',
        slidesToShow: 7,
        responsive: [{
            breakpoint: 1141,
            settings: {
                centerMode: true,
                centerPadding: '5px',
                slidesToShow: 3
            }
        }, {
            breakpoint: 500,
            settings: {
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 1
            }
        }]
    });


    //end of slider


    //begin of b-film and b-kino equalizer
    function Equa() {


        if ($(window).width() > 623) {

            var heightKino = $('.b-kino_equa').height();
            $('.b-film').height(heightKino);

            var outerheight = $('.b-outer__tab').height();
            $('.b-kino_bot').height(outerheight);
            $('.b-kino__vtolk').height(outerheight - 50);
        }




    }

    window.onload = function() {
        topmenu();
        Equa();
        dropKino();
        calenda();
        headerMenu();
        theatreMenu();
        fixtab();
        myimghei();
    }

    //end of b-film and b-kino equalizer
    //begin of b-kino__dropper kinotheatres vspliv
    $('.b-kino__dropper').click(function() {
        $('.b-kino__list').slideToggle();
    })

    function dropKino() {
        if ($(window).width() < 623) {
            $(".b-kino__list").slideUp();
            $('body').on("mouseup", function(e) {
                var container = $(".b-kino__title");
                if (container.has(e.target).length === 0) {
                    $('.b-kino__list').slideUp();
                }
            });
        } else {
            $(".b-kino__list").slideDown();
            $('body').off();
        }

    }



    //end of b-kino__dropper kinotheatres  vspliv
    //begin of vsplivaushaa 

    function topmenu() {

        if ($(window).width() > 781) {
            $('.b-header__li-link_city').off();
            $('.b-header__li-link_city').on("mouseenter", function() {
                var positn = $(this).parent().offset();
                var winW = $(window).width();
                var posMy = winW - positn.left - 600;
                var posMyM = winW / 2 - positn.left - 150;
                var abat = $(this).parent().children('.b-header__drop');
                if ((winW - positn.left) < 600) {



                    abat.attr("style", "display:block;left:" + posMy + "px;");
                    abat.on("mouseenter", function() {
                        abat.attr("style", "display:block;left:" + posMy + "px;");
                    }).on("mouseleave", function() {
                        abat.attr("style", "display:none");
                    });
                    if (winW < 593) {
                        abat.attr("style", "display:block;left:" + posMyM + "px;");
                        abat.on("mouseenter", function() {
                            abat.attr("style", "display:block;left:" + posMyM + "px;");
                        }).on("mouseleave", function() {
                            abat.attr("style", "display:none");
                        });
                    }

                } else {
                    abat.attr("style", "display:block;");
                    abat.on("mouseenter", function() {
                        abat.attr("style", "display:block");
                    }).on("mouseleave", function() {
                        abat.attr("style", "display:none");
                    });
                }

            }).on("mouseleave", function() {
                var abat = $(this).parent().children('.b-header__drop');
                abat.attr("style", "display:none");
            });

        } else {
            $('.b-header__li-link_city').off();
            $('.b-header__li_city').on("click", function() {
                var positn = $(this).offset();
                var winW = $(window).width();
                var posMy = winW - positn.left - 600;
                var posMyM = winW / 2 - positn.left - 150;
                var abat = $(this).children('.b-header__drop');
                if ((winW - positn.left) < 600) {


                    abat.attr("style", "display:block;left:" + posMy + "px;");
                    abat.on("mouseenter", function() {
                        abat.attr("style", "display:block;left:" + posMy + "px;");
                    }).on("mouseleave", function() {
                        abat.attr("style", "display:none");
                    });
                    if (winW < 593) {
                        abat.attr("style", "display:block;left:" + posMyM + "px;");
                        abat.on("mouseenter", function() {
                            abat.attr("style", "display:block;left:" + posMyM + "px;");
                        }).on("mouseleave", function() {
                            abat.attr("style", "display:none");
                        });
                    }

                } else {
                    abat.attr("style", "display:block;");
                    abat.on("mouseenter", function() {
                        abat.attr("style", "display:block");
                    }).on("mouseleave", function() {
                        abat.attr("style", "display:none");
                    });
                }

            })
            $('.b-header__li_city').off();
            $('.b-header__li_city').each(function() {
                var abat = $(this).children('.b-header__drop');
                $(this).on("click", function() {
                    abat.slideToggle("fast");
                });
            })


        }

    }

    //end of vsplivaushaa 
    //begin of b-header menu

    if ($(window).width() < 780) {
        $('.b-header__nav-toggle').click(function() {
            $('.b-header__list').slideToggle();
        })

        $('.b-theatre__nav-toggle').click(function() {

            $('.b-theatre__list').slideToggle();
        })

        $(document).mouseup(function(e) {
            var container = $(".b-header__row");
            if (container.has(e.target).length === 0) {
                $('.b-header__list').slideUp();
            }
        });
        $(document).mouseup(function(e) {
            var container = $(".b-theatre__row");
            if (container.has(e.target).length === 0) {
                $('.b-theatre__list').slideUp();
            }
        });
    }

    $(window).resize(function() {
        myimghei();
        dropKino();
        Equa();
        headerMenu();
        theatreMenu()
        $('.b-date').hide();
        calenda();
        topmenu();
        if ($(window).width() < 623) {
            $('.b-kino__vtolk').attr("style", "");
            $('.b-kino_bot').attr("style", "height:70px; height:inherit;");
        }


        if ($(window).width() < 780) {
            $('.b-header__nav-toggle').off();
            $('.b-header__nav-toggle').on("click", function() {
                $('.b-header__list').slideToggle();
            })

            $('.b-theatre__nav-toggle').off();
            $('.b-theatre__nav-toggle').on("click", function() {
                $('.b-theatre__list').slideToggle();
            })

            $("body").on("mouseup", (function(e) {
                var container = $(".b-header__row");
                if (container.has(e.target).length === 0) {
                    $('.b-header__list').slideUp();
                }
            }));
            $("body").on("mouseup", function(e) {
                var container = $(".b-theatre__row");
                if (container.has(e.target).length === 0) {
                    $('.b-theatre__list').slideUp();
                }
            });
        } else {

            $('.b-header__list').slideDown();
            $('.b-theatre__list').slideDown();
            $("body").off();
        }






        $(window).scroll(function() {
            onScroll();
        });



    })







    //end of b-header menu



    //begin of fixed header

    if ($('.b-theatre').is('nav')) {
        var header = $('.b-theatre');
        var origOffsetY = header.offset().top;
    }

    var main_menu = $(".b-header"),
        main_menu_height = 69,
        top = $('.b-shirma'),
        lastScrollY = 0,
        totalScroll;




    function onScroll(e) {

        var scrollY = window.scrollY;


        if (scrollY > 0) {
            $("body").css({
                "padding-top": main_menu_height
            });
            main_menu.css({
                "position": "fixed",
                "top": "0",
                "left": "0"
            });
            $('.b-perepel').css({
                "position": "fixed",
                "top": "15px"
            });
        } else {
            $("body").css({
                "padding-top": "0"
            });
            main_menu.css({
                "position": "relative",
                "top": "0",
                "left": "0"
            });
            $('.b-perepel').css({
                "position": "absolute",
                "top": "124px"
            });
        }
        if ($('.b-theatre').is('nav')) {
            if (scrollY > top.height() + header.height()) {
                header.addClass('sticky').css({
                    "top": (main_menu_height - 1)
                });
            } else {
                header.removeClass('sticky');
                top.css({
                    "margin-bottom": "0"
                });
            }
        }




    }

    onScroll();
    $(document).scroll(function() {
        onScroll();
    });
    //end of fixed header

})(jQuery);