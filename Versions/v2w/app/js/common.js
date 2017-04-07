(function($){
  $(function() {
  "use strict";
      $(".menu-icon").click(function (event) {
          event.stopImmediatePropagation();
          $(".b-menu__list").toggleClass("active");
      });
    $(document).foundation();
      $('#modal2').on('open.zf.reveal', function(){
          $(".popup-slide-container").slick({
              initialSlide: randomInteger(1,2)
          });
          $('.slick-prev').html('');
          $('.slick-next').html('')
      });

      if (typeof Pace !== 'undefined'){
          Pace.on("done", function () {
              if ($("#modal2").attr("data-first-time") == "true"){
                  setTimeout(function () {
                      $('#modal2').foundation('open');
                      var offset = ($( document ).height()-$('#modal2').height())/2;
                      $('#modal2').css('top',offset+'px');
                  },1000);
              }
          });
      }
      if ($("#formevent").attr("data-sent") == "yes"){
          $('#modal').foundation('open');
      }
      /*        if(randomInteger(1,2) == 1){
       $("#random-link").attr("href","/shares/");
       $("#random-image").attr("src","/local/templates/main/images/Mira_800x535_01.jpg");
       }
       else {
       $("#random-link").attr("href","/contacts/");
       $("#random-image").attr("src","/local/templates/main/images/Mira_800x535_02.jpg");
       }*/
    Foundation.Abide.defaults.patterns['telefon'] = /\+[0-9]+/;

      if (checkPosition()){
          $(".b-menu").removeClass("normal")
          $(".b-menu").addClass("mobile");
      }
      else{
          $(".b-menu").removeClass("mobile")
          $(".b-menu").addClass("normal")
      }

    $(window).resize(function(){
        if (checkPosition()){
            $(".b-menu").removeClass("normal")
            $(".b-menu").addClass("mobile");
        }
        else{
            $(".b-menu").removeClass("mobile")
            $(".b-menu").addClass("normal")
        }
    });
    $('.b-neighbors__more').click(function(){
      $(this).parent().find('.b-neighbors__more-content').show();
      return false
    });

    $(window).scroll(function(){
            if ($(this).scrollTop() > 0) {
                $('.b-menu').css('position','fixed');
            } else {
                $('.b-menu').css('position','absolute');
                if($(".landing-first").length){
                    $('.b-menu').css('position','relative');
                }
            }
      });
    $('.square,.circle').hover(function(){
              $(this).toggleClass( "hover" );
          },
          function(){
              $(this).toggleClass( "hover" );
      });

    $('.b-menu__list-item').hover(function(){
        if($(this).closest(".normal").length){
            $(this).has("ul").find(".b-menu__ul,.b-menu__ul-active").css("display","block");
        }
    },
    function(){
        if($(this).closest(".normal").length){
            $(this).has("ul").find(".b-menu__ul,.b-menu__ul-active").css("display","none");
        }
    });

    $('.mobile li[data-popup-open]').click(function(event){
            if ($(event.target).attr('class') != "b-menu__list-sub-link")
            {
                event.preventDefault();
                var targeted_popup_class = $(this).attr('data-popup-open');
                if(targeted_popup_class == "closed")
                {
                    $('[data-popup-open="' + "opened" + '"]').attr("data-popup-open","closed");
                    $(this).attr('data-popup-open',"opened");
                }
                else if(targeted_popup_class == "opened")
                {
                    $('[data-popup-open="' + "opened" + '"]').attr("data-popup-open","closed");
                    $(this).attr('data-popup-open',"closed");
                }
            }
      });

    $('.b-neighbors__more-close').click(function(){
      $(this).parent().hide();
      return false
    });
      $('.zvonok_form').click(function(){
          yaCounter34830515.reachGoal('zvonok');
          return
      });
      $('.dom_form').click(function(){
          yaCounter34830515.reachGoal('bron_doma');
          return
      });
    var newsPage = 1;
    $('.b-news__bottom-link').click(function(){
        newsPage+= 1;
        var url = window.location + "?PAGEN_1=" + newsPage;
        $.ajax({
            url: url,
            cache: false
            })
            .done(function(result) {
                var data = $(result).filter('.b-news');
                var news = $(data).find('.newsonpage');
                var last = $(data).find('.islast');
                if ((newsPage == 2) && ($(last).text() == 1)) {
                    $('#result').append('<p class="text-center">Ð‘Ð¾Ð»ÑŒÑˆÐµ Ð½Ð¾Ð²Ð¾ÑÑ‚ÐµÐ¹ Ð½ÐµÑ‚</p>');
                    $('.b-news__bottom-link').hide();
                } else if ($(last).text() == 1) {
                    $('#result').append(news);
                    $('#result').append('<p class="text-center">Ð‘Ð¾Ð»ÑŒÑˆÐµ Ð½Ð¾Ð²Ð¾ÑÑ‚ÐµÐ¹ Ð½ÐµÑ‚</p>');
                    $('.b-news__bottom-link').hide();
                } else {
                    $('#result').append(news);
                }
            });
       });
    $('.b-home__upper').click( function(){
        $('body, html').animate({
            scrollTop: 0
        }, 500);
		return false;
	});

	$(window).scroll(function(){
		if ( $(document).scrollTop() > 0 ) {
			$('.b-home__upper').fadeIn('fast');
		} else {
			$('.b-home__upper').fadeOut('fast');
		}
	});
  });
    $(document).ready(function(){
    });
})(jQuery);
function checkPosition() {
    if (window.matchMedia('(max-width: 879px)').matches) {
        return true;
    } else {
        return false;
    }
}
function randomInteger(min, max) {
    var rand = min + Math.random() * (max - min)
    rand = Math.round(rand);
    return rand;
}
