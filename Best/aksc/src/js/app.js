;
$(document).foundation();

(function($) {
  "use strict";
  $(function() {

    //begin of .paint slider
    $(".paint").slick({
      infinite: true,
      dots: false,
      arrows:false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
      nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>'
    });
    //end of .paint slider
    //begin of .sale slider
    $(".sale").slick({
      infinite: true,
      dots: false,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      autoplayHoverPause: true,
      fade: false,
      swipeToSlide: true,
      prevArrow: '<i class="slick-prev fa fa-angle-left fa-2x"> </i>',
      nextArrow: '<i class="slick-next fa fa-angle-right fa-2x"> </i>',
      responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 1,
          }
        },
        {
          breakpoint: 480,
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
    //end of .sale slider
    /**
     * Разные карусели
     */

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
      prevArrow: '<i class="slick-prev fa fa-angle-left fa-3x"> </i>',
      nextArrow: '<i class="slick-next fa fa-angle-right fa-3x"> </i>'
    });

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
    $('.x-carousel-news-link').on('click', function(e) {

      e.preventDefault();
      var $this = $(this),
        index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
      $('.x-carousel-news').slick('slickGoTo', index);
    });
    //begin of .cash arrows toggle
    /*$('.cash__more').click(function() {
      var $input = $(this).closest('.cash').find('input');
      var value = +$input.val() + 1;

      $input.val(value);

    });
    $('.cash__less').click(function() {
      var $input = $(this).closest('.cash').find('input');

      var value = +$input.val() - 1;
      if (value >= 1) {
        $input.val(value);
      }


    });*/
    //end of .cash arrows toggle
    /**
     * Показ любого блока по наведению на другой
     */
    var toggleLeaveTimer;
    $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function(e) {
      var selector = '#' + $(this).data('toggle-hover-dd');
      if ($(selector).length > 0) {
        var $toggler = $(selector);
        var className = $toggler.data('toggler-hover-dd');
        if (e.type == 'mouseenter' && !$toggler.hasClass(className)) {
          $toggler.addClass(className)
        }
        if (e.type == 'mouseleave' && $toggler.hasClass(className)) {
          toggleLeaveTimer = setTimeout(function() {
            $toggler.removeClass(className)
          }, 300);
        }
      }
    });
    $('[data-toggler-hover-dd]').on('mouseenter', function() {
      clearTimeout(toggleLeaveTimer);
    }).on('mouseleave', function() {
      var $toggler = $(this);
      var className = $toggler.data('toggler-hover-dd');
      if ($toggler.hasClass(className)) {
        toggleLeaveTimer = setTimeout(function() {
          $toggler.removeClass(className)
        }, 300);
      }
    });


    var $regLoginContent = $('#reg-login-content').html();
  	var timer;
    //**Обработчик кнопки Авторизоваться в модальном окне
  	$('#login-content_modal').on('click', '#login_btn_modal',function(){
      var formAuth =$('#form_auth_modal').serialize();
      $.post(
          	  "/auth/login.php",
          	  formAuth,
          	  function (data){
          	  	if(data.indexOf('success') + 1){
									location.reload();
								}

          	  	else{
									$('#login-content_modal').html(data);
								}

          	  }
          	);
		});

		//**Обработчик кнопки Авторизоваться на страницах
  	$('#login-content').on('click', '#login_btn',function(){
      var formAuth =$('#form_auth').serialize();
      $.post(
          	  "/auth/login.php",
          	  formAuth,
          	  function (data){
          	  	if(data.indexOf('success') + 1){
									location.reload();
								}

          	  	else{
									$('#login-content').html(data);
								}

          	  }
          	);
		});

    //**Обработчик кнопки Зарегистироваться в модальном окне
  	$('#reg-login-content').on('click', '#register_btn',function(){
  		completeMethod();

  		function completeMethod(){
  			var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
  			if(pattern.test($('#USER_LOGIN').val())){
  				$('#reg_method').val('mail');
  			} else {
  				$('#reg_method').val('phone');
  			}
  			return false;
  		};

      var formRegister =$('#formRegister').serialize();

      $.post(
          	  "/auth/reg.php?register=yes",
          	  formRegister,
          	  onAjaxSuccess
          	);
		});

			function onAjaxSuccess(data)
      {
      	// данные, отправленные сервером в окно регистрации.
        $('#reg-login-content').html(data);
        var regState = $('#regState').attr('value');
        if(regState=='activate'){
        	timer = initTimer();
				}else if(regState=='complete') {
					clearInterval(timer);
				}
			}
				//**Обработчик кнопки Активация в модальном окне
		$('#reg-login-content').on('click', '#activation_btn',function(){
			var formActivation =$('#formActivation').serialize()+'&activation_btn=1&curtime='+$('#clockdiv').html();
          	$.post(
          	  "/auth/reg.php",
          	  formActivation,
          	  onAjaxSuccess
          	);
		});
		//**Обработчик кнопки Вылать код повторно в модальном окне
		$('#reg-login-content').on('click', '#resend_btn',function(){
			var formActivation = $('#formActivation').serialize()+'&resend_btn=1';
          	$.post(
          	  "/auth/reg.php",
          	  formActivation,
          	  onAjaxSuccess
          	);
		});

		//копка Закрыть сбрасывает форму регистрации к началу
		$('#close_reg_btn').on('click',function(){
			//если регистрация complete,обновить блок авторизации
			var regState = $('#regState').attr('value');
			if(regState=='complete')
				location.reload();

			setTimeout(function() { $('#reg-login-content').html($regLoginContent);}, 500);

			clearInterval(timer);

		});


		//таймер
		function initTimer() {

			var m = 4;
			var sec =60;

			var interval_id = setInterval(function() {  /* запуск таймера */
					sec--;
					if (sec != 0) {
						if(sec < 10) $('#clockdiv').html('0'+m+':0'+sec);
						else	$('#clockdiv').html('0'+m+':'+sec);
					} else {
						if(m > 0) {
							if(sec < 10) $('#clockdiv').html('0'+m+':0'+sec);
							else	$('#clockdiv').html('0'+m+':'+sec);
							m--;
							sec = 60;
						}else{
							$('#clockdiv').html('00:00');
							clearInterval(interval_id);  /* остановка таймера */
							$("#resend_btn").removeAttr('disabled');
							$("#activation_btn").attr('disabled',true);
						}
					}
				}, 1000);
				$('#clockdiv').show();
			return interval_id;
		};

				//копка Обновить капчу
		$('#reg-login-content').on('click', '#refresh_captcha',function(){
			$.get('/ajax/refresh_captcha.php',
			 	{},
			 	function(data) {
			 		$('#captcha_sid').attr('value', data);
			 		$('#captcha_img').attr('src', "/bitrix/tools/captcha.php?captcha_sid="+data);
			 	}
 			);
 			return false;
		});

	var forgotPswContent = $('#forgot-psw-content').html();

	//кнопка Закрыть сбрасывает форму восстановления к началу
	$('#close_forgot_btn').on('click',function(){
			setTimeout(function() { $('#forgot-psw-content').html(forgotPswContent);}, 500);
			clearInterval(timer);
		});
	//**Обработчик кнопки Выслать код подтверждения в восстановлении пароля
  	$('#forgot-psw').on('click', '#send_activation_code',function(){
      var formForgot =$('#form_forgot').serialize();
      $.post(
          	  "/auth/forgot.php",
          	  formForgot,
          	  function (data){
          	  	 	$('#forgot-psw-content').html(data);
          	  	 	 var regState = $('#regState').attr('value');
        					if(regState=='activate'){
        						timer = initTimer();
									}
          	  }
          	);
		});
		//**Обработчик кнопки Подтвердить в восстановлении пароля
		$('#forgot-psw-content').on('click', '#activation_btn',function(){
			var formActivation =$('#formActivation').serialize()+'&activation_btn=1&curtime='+$('#clockdiv').html();
          	$.post(
          	  "/auth/forgot.php",
          	  formActivation,
          	  function (data){
          	  	 	$('#forgot-psw-content').html(data);
          	  	 	 var regState = $('#regState').attr('value');
        if(regState=='activate'){
        	timer = initTimer();
				}
          	  }
          	);
		});
		//**Обработчик кнопки Вылать код повторно в восстановлении пароля
		$('#forgot-psw-content').on('click', '#resend_btn',function(){
			var formActivation = $('#formActivation').serialize()+'&resend_btn=1';
          	$.post(
          	  "/auth/forgot.php",
          	  formActivation,
          	  function (data){
          	  	 	$('#forgot-psw-content').html(data);
          	  	 	 var regState = $('#regState').attr('value');
          	  	 	 if(regState=='activate'){
          	  	 	 	timer = initTimer();
          	  	 	 }
          	  }
          	);
		});

		//**Обработчик кнопки Сменить пароль в восстановлении пароля
		$('#forgot-psw-content').on('click', '#change_psw_btn',function(){
			var psw = $('#new_password').val();
			var psw_cnf = $('#new_password_confirm').val();
			$("#msg_err").remove();
			if(psw.length < 6){
				$("#formChangePsw").prepend("<div class='alert callout' id='msg_err'>Длина менее 6 символов</div>");
				return;
			}
			if(psw != psw_cnf){
				$("#formChangePsw").prepend("<div class='alert callout' id='msg_err'>Пароли не совпадают</div>");
				return;
			}

			var formChangePsw = $('#formChangePsw').serialize()+'&change_psw_btn=1';
          	$.post(
          	  "/auth/forgot.php",
          	  formChangePsw,
          	  function (data){
          	  	 	$('#forgot-psw-content').html(data);

          	  }
          	);
		});

		/*$('#forgot-psw-content').on('focus', '.reg-login_input',function()
		{
			$("#msg_err").remove();
		});*/

  });
})(jQuery);
