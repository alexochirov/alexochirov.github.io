(function ($) {

    $(function () {
        "use strict";

        $(document).foundation({

           tab: {
      callback : function (tab) {
        //begin of b-tab__arrow positioning
      var myIdMa = $('.b-tab .content.active').attr('id');
      if(myIdMa) {
        var myIdL = myIdMa.substr(myIdMa.length-1);

        var myWid11 = $('.b-tab .tabs-content').width();
        var myLeftPosition = myWid11/4*(myIdL-0.5) - 8;
        $('.b-tab__arrow').attr("style","left:" + myLeftPosition + "px;");
        }
      //end of b-tab__arrow positioning
      }
    }

        });
    });
    //begin mayer scripts
    
    //begin fancybox
    $(document).ready(function() {

if($.fn.fancybox) {
    /* This is basic - uses default settings */
    
    $("a.js-fancy-one").fancybox();
    
    /* Using custom settings */
  

    /* Apply fancybox to multiple items */
    
    $("a.js-fancy").fancybox({
        'transitionIn'  :   'elastic',
        'transitionOut' :   'elastic',
        'speedIn'       :   600, 
        'speedOut'      :   200, 
        'overlayShow'   :   false
    });
    }
});
    //end fancybox
    //begin arrow hover color replace
    $('.b-nowost__bord').mouseenter(function() {
      $('.b-nowost__return-arrow', this).attr("style", "border-top-color: #b41c34;")
    }).mouseleave(function() {
      $('.b-nowost__return-arrow', this).attr("style", "neTrogat")
    })
    //end arrow hover color replace
    //begin of  b-lines__block  hover right moving
    $('.b-lines__block').mouseenter(function() {
      var nowPos = $(this).css("left");
      var nowPosLeft = Number(nowPos.substr(0,nowPos.length-2)) + 28;
      $(this).attr("style", "left:" + nowPosLeft + "px;")
    }).mouseleave(function() {
$(this).attr("style", "netrogat")
    });
    //end of  b-lines__block  hover right moving

    //end mayer scripts
    //begin of b-tovar__minipini-block change of the image on click
    $('.b-tovar__minipini-block').click(function () {
      var addressImg = $('img',this).attr("src");
      $(this).parent().parent().find('.b-tovar__img img').attr("src", addressImg);
    })
    //end of b-tovar__minipini-block change of the image on click
    //begin of b-tovar_vipa hover block in the catalog
    $('.b-product_search').mouseenter(function() {
      var prodWidth = $(this).width();
      var leftPosit = ( prodWidth + 30 - 283)/2 
      $('.b-tovar_vipa', this).attr("style", "left:" + leftPosit + "px; display:block;");
      $('.b-tovar_vipa', this).mouseleave(function() {
        $('.b-tovar_vipa').attr("style", "display:none;")
      })
    });
    //end of b-tovar_vipa hover block in the catalog
    //begin of radio input of b-rega 
    $('.b-rega__radchck').click(function () {
      if($('#rfirst').is(":checked")) {
        $('.b-rega__yurik').attr("style","display:block;");
      }
      else {
        $('.b-rega__yurik').attr("style","display:none;");
      }

    })
    //end of radio input of b-rega 
    //begin of basket vspliv block
    $('.b-tovar__buy').click(function() {
      var leftWidTovar = ($(window).width() - 6 - $('.b-add').width())/2;
      var topHeiTovar = ($(window).height() - $('.b-add').height())/2;
      $('.b-add').attr("style", "display:block; top:" + topHeiTovar + "px; left:" + leftWidTovar + "px;");
    })
    $('.b-add__continue').click(function() {
      $('.b-add').attr("style", "display:none;");
    })
    //end of basket vspliv block
      //begin of b-tab__arrow positioning
      var myIdMa = $('.b-tab .content.active').attr('id');
      if(myIdMa) {
        var myIdL = myIdMa.substr(myIdMa.length-1);

        var myWid11 = $('.b-tab .tabs-content').width();
        var myLeftPosition = myWid11/4*(myIdL-0.5) - 8;
        $('.b-tab__arrow').attr("style","left:" + myLeftPosition + "px;");
        }
      //end of b-tab__arrow positioning
    //begin of b-product_search and b-oplata__img and tab-title  equalizer 
window.onload = function () {
  var myHei11 = $('.b-product_search').height();
  $('.b-product_search').height(myHei11);

  var myHei22 = $('.b-oplata__img').height();
  $('.b-oplata__img').height(myHei22);


  var myHei33 = $('.b-tab .tab-title').height();
  $( ".b-tab .tab-title" ).each(function( i) {
    
    if ($(this).height() > myHei33) {
      myHei33 = $(this).height(); 
    }
  });
  $('.b-tab .tab-title ').height(myHei33);
}


    //end of b-product_search and b-oplata__img tab-title   equalizer     
    //begin of range-slider
    $(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 99000,
      values: [ 0, 99000 ],
      slide: function( event, ui ) {
        $( ".b-filter__min" ).text(  ui.values[ 0 ]);
        $( ".b-filter__max" ).text(  ui.values[ 1 ]);
        $( ".b-filter__min-mini" ).text(  ui.values[ 0 ]);
        $( ".b-filter__max-mini" ).text(  ui.values[ 1 ]);
      }
    });
    $( ".b-filter__min" ).text(  $( "#slider-range" ).slider( "values", 0 )  );
    $( ".b-filter__max" ).text(  $( "#slider-range" ).slider( "values", 1 )  );
    $( ".b-filter__min-mini" ).text(  $( "#slider-range" ).slider( "values", 0 )  );
    $( ".b-filter__max-mini" ).text(  $( "#slider-range" ).slider( "values", 1 )  );
  });
    //end of range-slider
    //begin of b-filter slideUp 
    $('.b-filter__category-name').click(function() {
      $('.b-filter__category-icon',this).toggleClass('b-filter__category-icon-reverse');
$(this).parent().children('.b-filter__drop').slideToggle();
    })
    //end of b-filter slideUp 
//begin of b-search__vipa vipadaushiy block 
$('.b-search__pop').click(function() {
  $('.b-search__pop-icon',this).toggleClass('b-search__pop-icon-reverse');
  $('.b-search__vipa', this).slideToggle();
})
$('.b-search__vipa-option').click(function() {
  var thisText = $(this).text();
  var parentBig = $(this).parent().parent();
  parentBig.children('.b-search__pop-name').text(thisText);
})
//end of b-search__vipa vipadaushiy block 
    //begin of wrap colorpicker elements of tovar

    $('.b-tovar__color-li').click(function () {
      $('.b-tovar__color-li_active').removeClass('b-tovar__color-li_active');
      $(this).addClass('b-tovar__color-li_active');
    })
    //end of wrap colorpicker elements of tovar
        //begin of input number krasiviy
    if($.fn.spinner ) {
$(function() {
 var spinner = $('.b-input-number').spinner();
  });
}
//end of input number krasiviy
//begin of hover buttons in mozilla 
$('.b-tovar__buy').mouseenter(function() {
  $('.b-tovar__buy-bord',this).attr("style", "color:#fff;");
}).mouseleave(function() {
  $('.b-tovar__buy-bord',this).attr("style", "color:netrogat;");
})
$('.b-product__buy').mouseenter(function() {
  $('.b-product__buy-bord',this).attr("style", "color:#fff;");
}).mouseleave(function() {
  $('.b-product__buy-bord',this).attr("style", "color:netrogat;");
})

$('.b-tovar__submit').mouseenter(function() {
  $('.b-tovar__submit-bord',this).attr("style", "color:#fff;");
}).mouseleave(function() {
  $('.b-tovar__submit-bord',this).attr("style", "color:netrogat;");
})
//end of hover buttons in mozilla 
    //begin of b-arrow script
    function ini () {
      var w1 = $(window).width();
      if(w1 < 1134) {
        $('.b-arrow').attr("style", "display:none;");
      }
      else {
        if(w1 > 1230) {
        var leftMar = (w1 - 990)/2 -114; 
        $('.b-arrow').attr("style", "display:block; right:" + leftMar + "px;")
      }
      else {
        $('.b-arrow').attr("style", "display:block;  right:5px;")
      }

      }
    }
    $(window).scroll(function() {
      if (window.pageYOffset > 700) {
          ini();
          $( window ).resize(function() {
            if (window.pageYOffset > 700) {
              ini();
            }

          });
      }
      else {
        $('.b-arrow').attr("style", "display:none;");
      }
    })



    //end of b-arrow script
    //begin of pop videlenie blokov
      
    $('.b-pop__block').mouseenter(function() {
      var wid = $(this).width();
      var hei = $(this).height();
      var bord = 4;
      $(this).width(wid-bord);
      $(this).height(hei-bord);
      $(this).addClass('b-pop__block_active');
      $(this).append("<div class='b-pop__show'><a class='b-pop__show-link' href='#'>Посмотреть</a></div>")
    }).mouseleave(function() {
      var wid = $(this).width();
      var hei = $(this).height();
      var bord = 4;
      $(this).width(wid+bord);
      $(this).height(hei+bord);
      $(this).removeClass('b-pop__block_active');
      $('.b-pop__show').remove();
    })
    //end of pop videlenie blokov

    //begin my-select

$(document).click(function(e) {
  
  function closeBlock() {
     if($('.b-vipa__arr').hasClass("b-vipa__arr_reverse")) {
  var containerMy = $(".b-vipa");
    if (containerMy.has(e.target).length === 0){
        $('.b-vipa__block').slideUp();
        $('.b-vipa__arr').removeClass('b-vipa__arr_reverse');
    }
 }
  }
  setTimeout(closeBlock, 50);
})



$('.b-vipa__loraine').click(function() {
  $('.b-vipa__block').slideToggle();
  $('.b-vipa__arr').toggleClass('b-vipa__arr_reverse');

})
    //end my-select
        //jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.js-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop:  $($anchor.attr('href')).offset().top-0
     
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
//end jQuery for page scrolling feature - requires jQuery Easing plugin
    //begin plavaush block Akcii
    var wid = ($( window ).width() - 850)/2;
  $(".b-menu__black").width(wid);
$( window ).resize(function() {
  var wid = ($( window ).width() - 850)/2;
  $(".b-menu__black").width(wid);
});
    //end plavaush block Akcii
    //begin plavaush block lines
     var wid1 = -(1910 - $( window ).width() )/2;
  $(".b-wrap__lines").attr("style", "left:" + wid1 + "px;" );
$( window ).resize(function() {
  var wid1 = -(1910 - $( window ).width() )/2;
    $(".b-wrap__lines").attr("style", "left:" + wid1 + "px;" );
  });
    //end plavaush block lines
    //begin of b-vipa icon bordering

$('.b-menu__li-link').click(function () {
    var dataD = $(this).attr("data-dropdown");
    $('.js-icon').removeClass('js-icon');
    
    function way (dataD) {
         if($('#' + dataD).hasClass("open") ) {
           $('[data-dropdown ='  + dataD + ' ]').removeClass('js-icon');
        }
        else {
            $('[data-dropdown ='  + dataD + ' ]').addClass('js-icon');
        }
       }
setTimeout(way(dataD) , 50)

   

})

$(document).mouseup(function (e) {
    var container = $(".b-header__vspliv");
    if (container.has(e.target).length === 0){
        
        $('.js-icon').removeClass('js-icon');
    }
    });
//end of b-vipa icon bordering
//begin of prizhimanie blokov
if ($(window).width() > 1100 && $(window).height()>800 ) {
  var hei1 = $(window).height();
  var hei2 = $('header').height();
  var heiMy = hei1-hei2-210;
  $('.b-content').height(heiMy);
}
//end of prizhimanie blokov
//begin slider
if($.fn.slick) {
           $('.b-slider').slick({
                        infinite: true,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        autoplay: true,
                        dots: true,
                        arrows:false
                    });
           $('.b-slider_tovar').slick({
                        infinite: true,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        autoplay: true,
                        dots: true,
                        arrows:false
                    });
           $('.b-slider_main').slick({
                        infinite: true,
                        slidesToScroll: 1,
                        slidesToShow: 1,
                        autoplay: true,
                        dots: false,
                        arrows:false
                    });
           }
//end of slider

 // begin b-slider_tovar paginatio with images       

              var koliches = $('.slick-slide>img').length - 2 ;
              var imagmy = [];
              for (var ii = 0; ii < koliches; ii++) {
                 var put = $('.slick-slide>img').eq(ii).attr('src');
                 imagmy.push(put);
              }
              for (var ii = 0; ii < koliches; ii++) {
                $('.slick-dots>li').eq(ii-1).find('button').append("<img src='" + imagmy[ii] + "'>")
              }

         
        //end b-sli slider
//begin of switch sliders on the click on img on main page
$('.js-goto1').click(function() {
  $('.b-slider').slick('slickGoTo',"0");
})
$('.js-goto2').click(function() {
  $('.b-slider').slick('slickGoTo',"1");
})
$('.js-goto3').click(function() {
  $('.b-slider').slick('slickGoTo',"2");
})
$('.b-main__dets-text-link').click(function() {
  $('.b-slider').slick('slickGoTo',"0");
})
$('.b-main__cup-text-link').click(function() {
  $('.b-slider').slick('slickGoTo',"1");
})
$('.b-main__salat-text-link').click(function() {
  $('.b-slider').slick('slickGoTo',"2");
})
//end of switch sliders on the click on img on main page

})(jQuery);
