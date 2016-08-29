(function($) {

    $(function() {
        "use strict";

        $(document).foundation({});
    });
    //begin of blue bottom border of menu
    $('.b-menu__f-dropdown').mouseenter(function() {
        $(this).prev().children().addClass('b-menu__li-link_opened');
    }).mouseleave(function() {
        $(this).prev().children().removeClass('b-menu__li-link_opened');
    })
    //end of blue bottom border of menu
    //begin of header menu click opening
    $('.b-menu__li-link').click(function() {
        var id = $(this).attr("data-dropdown");


        if ($('#' + id).hasClass("b-menu__f-dropdown_clicked")) {
            $('.b-menu__f-dropdown_clicked').removeClass('b-menu__f-dropdown_clicked').removeClass('open').removeClass('f-open-dropdown');

        } else {
            $('.b-menu__f-dropdown_clicked').removeClass('b-menu__f-dropdown_clicked').removeClass('open').removeClass('f-open-dropdown');
            $('#' + id).addClass('b-menu__f-dropdown_clicked');
        }

    })

    
    $(document).mouseup(function(e) {
        var container = $(".b-menu__f-dropdown");
        if (container.has(e.target).length === 0 && container.hasClass("b-menu__f-dropdown_clicked")) {
            $('.b-menu__f-dropdown_clicked').removeClass('b-menu__f-dropdown_clicked').removeClass('open').removeClass('f-open-dropdown');
        }
    });

$('.b-menu__f-dropdown').click(function() {
        $(this).addClass('b-menu__f-dropdown_clicked');
    });

    $('.toggle-topbar').click(function() {
        $('.top-bar').toggleClass('my-expanded');
    })
    //end of header menu click opening
    //begin of sliders
    $('.b-main__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
    });

    $('.b-vipa__slider').slick({
         dots: false,
  infinite: true,
  speed: 300,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3, 
        arrows: true,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        arrows: true,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
    });

   
    $('.b-list__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
    });

    $('.b-qui__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
    });

    $('.b-lay__slider').slick({
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
    });
    //end of sliders
    //begin of box-shadow on b-menu__top-bar when header is fixed
    function headShadow() {
        if ($('.sticky').hasClass('fixed')) {
            $('.b-menu__white').addClass('b-menu__white_fixed');
        } else {
            $('.b-menu__white').removeClass('b-menu__white_fixed');
        }
    }
    $(window).scroll(function() {
        headShadow();
    });
    window.onload = function() {
        headShadow();
    }
    //end of box-shadow on b-menu__top-bar when header is fixed
})(jQuery);