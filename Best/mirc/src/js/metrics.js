(function() {
    document.addEventListener('DOMContentLoaded', function() {
	    var headerGift = document.querySelector('.header__gift');
	    if (headerGift != null) {
	        headerGift.addEventListener('click', function() {
	            yaCounter22425796.reachGoal('yandex-header-gift-click');
	            return true;
	        });
	    }

	    var formZapis = document.querySelector('form[name="zapis"]');
	    if (formZapis != null) {
	        formZapis.addEventListener('submit', function() {
	            //validation
	            if (formZapis.querySelector('input[name="form_date_2"]').value === '' ||
	                formZapis.querySelector('input[name="form_text_4"]').value === '' ||
	                formZapis.querySelector('input[name="form_text_6"]').value === '') {
	                return false;
	            }

	            yaCounter22425796.reachGoal('yandex-form-zapis-submit');
	            return true;
	        });
	    }

	    var tel = document.querySelector('.tel');
	    if (tel != null) {
	        tel.addEventListener('click', function() {
	            yaCounter22425796.reachGoal('yandex-tel-click');
	            return true;
	        });
	    }

	    var telLink = document.querySelector('a[href^="tel:"]');
	    if (telLink != null) {
	        telLink.addEventListener('click', function() {
	            yaCounter22425796.reachGoal('yandex-tel-click');
	            return true;
	        });
	    } 
    });
})();