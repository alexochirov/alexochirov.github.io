(function() {
    //document.addEventListener('DOMContentLoaded', function() {
        var header = document.querySelector('.header');

        //--------- search link ----------------------------------------------
        var headerLink = header.querySelector('.header__search a[name="s"]');
        var headerInput = header.querySelector('.header__search .search-suggest');
        var headerText = header.querySelector('.header__text');
        var headerSearch = header.querySelector('.header__search');
        var blurExecute = false;
        var mouseover = false;

        var displayHeaderText = function() {
            if (!(headerInput.classList.contains('active') && headerLink.classList.contains('animate'))) {
                return;
            }

            var body = document.getElementsByTagName('body')[0];
            var fontSize = parseFloat(window.getComputedStyle(body, null).getPropertyValue('font-size'));
            if (window.innerWidth < fontSize * 60) {
                if (headerText.classList.contains('opacity-0')) {
                    headerText.style.transitionDelay = '.5s';
                } else {
                    headerText.style.transitionDelay = '';
                }
                headerText.classList.toggle('opacity-0');
            }
        };

        headerLink.addEventListener('click', function(evt) {
            evt.preventDefault();

            if (blurExecute) {
                blurExecute = false;
                return;
            }

            var value = headerInput.value.replace(/\s+/g, '');
            if (value === '') {
                headerInput.value = "";
            } else {
                document.querySelector('.header__search form').submit();
                return;
            }

            if (headerInput.classList.contains('active')) {
                headerInput.blur();
            } else {
                headerInput.focus();
            }

            headerInput.classList.toggle('active');
            headerInput.placeholder = (headerInput.placeholder === '') ? ('Найти') : ('');

            headerLink.classList.toggle('animate');

            displayHeaderText();
        });

        headerLink.addEventListener('mouseover', function() {
            mouseover = true;
        });

        headerLink.addEventListener('mouseleave', function() {
            mouseover = false;
        });

        headerInput.addEventListener('blur', function(evt) {
            evt.preventDefault();
            displayHeaderText();

            headerInput.value = "";
            headerInput.classList.remove('active');
            headerInput.placeholder = '';

            headerLink.classList.remove('animate');

            if (mouseover) {
                blurExecute = true;
            }
        });


        //--------- menu hamburger ----------------------------------------------
        var headerHamburger = header.querySelector('.header__hamburger');
        var overlay = document.querySelector('.js-off-canvas-overlay');

        headerHamburger.addEventListener('click', function(evt) {
            evt.preventDefault();
            headerHamburger.classList.toggle('header__hamburger--active');
        });

        overlay.addEventListener('click', function(evt) {
            headerHamburger.classList.toggle('header__hamburger--active');
        });
    //});
})();