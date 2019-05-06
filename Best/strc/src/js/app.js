;
$(document).foundation();

(function ($) {
    "use strict";
    $(function () {
        //begin of .safe activity
        $('.complete-kit').on('click', '.safe__btn_next', function () {
            var $input = $(this).closest('.safe').find('.safe__input');
            var value = +($input.val());

            $input.val(++value);
            recalcKitPrice();
        });
        $('.complete-kit').on('click', '.safe__btn_prev', function () {
            var $input = $(this).closest('.safe').find('.safe__input');
            var value = +($input.val());

            if (value > 0) {
                $input.val(--value);
            }
            recalcKitPrice();
        });

        function recalcKitPrice() {
            var price = 0, count = 0, total = 0,
                $ctx = $('.complete-kit.is-active');

            $ctx.find('.complect-item').each(function (index, value) {
                price = +$(this).find('.kit-item-price').text();
                count = +$(this).find('.safe__input').val();
                total += price * count;
            });

            if (total)
                $ctx.find('.total-kit-price').text(numFormat(total));
        }

        function numFormat(num) {
            var n = num.toString();
            var separator = " ";
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
        }

        //end of .safe activity
        //begin of replace svg img with inline svg
        jQuery('.js-svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            jQuery.get(imgURL, function (data) {
                // Get the SVG tag, ignore the rest
                var $svg = jQuery(data).find('svg');

                // Add replaced image's ID to the new SVG
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');

                // Replace image with new SVG
                $img.replaceWith($svg);

            }, 'xml');

        });
        //end of replace svg img with inline svg
        //begin of .chair slider
        $(".chair").slick({
            infinite: true,
            dots: false,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            autoplayHoverPause: true,
            fade: false,
            swipeToSlide: true,
            prevArrow: '<i class="slick-prev fa fa-angle-left "> </i>',
            nextArrow: '<i class="slick-next fa fa-angle-right "> </i>'
        });
        //end of .chair slider
        //begin of fix menu catalog bug

        $(document).mouseup(function (e) {
            var div = $("#contCat");
            if (!div.is(e.target) && div.has(e.target).length === 0 && e.target != $("[data-toggle='contCat']")[0]) {
                div.addClass('hide');

            }
        });


        $('#stickyHeader').on('sticky.zf.unstuckfrom:top', function () {
            $('#contCat').attr('style', '');
            $('#contCat').toggle();
        });
        $('#stickyHeader').on('sticky.zf.stuckto:top', function () {
            $('#contCat').attr('style', '');
        });


        //end of fix menu catalog bug

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
        $('.x-carousel-news-link').on('click', function (e) {

            e.preventDefault();
            var $this = $(this),
                index = $this.closest('.x-carousel-news-links').find('.x-carousel-news-link').index($this);
            $('.x-carousel-news').slick('slickGoTo', index);
        });

        /**
         * Показ любого блока по наведению на другой
         */
        var toggleLeaveTimer;
        $('[data-toggle-hover-dd]').on('mouseenter mouseleave', function (e) {
            var selector = '#' + $(this).data('toggle-hover-dd');
            if ($(selector).length > 0) {
                var $toggler = $(selector);
                var className = $toggler.data('toggler-hover-dd');
                if (e.type == 'mouseenter' && !$toggler.hasClass(className)) {
                    $toggler.addClass(className)
                }
                if (e.type == 'mouseleave' && $toggler.hasClass(className)) {
                    toggleLeaveTimer = setTimeout(function () {
                        $toggler.removeClass(className)
                    }, 300);
                }
            }
        });
        $('[data-toggler-hover-dd]').on('mouseenter', function () {
            clearTimeout(toggleLeaveTimer);
        }).on('mouseleave', function () {
            var $toggler = $(this);
            var className = $toggler.data('toggler-hover-dd');
            if ($toggler.hasClass(className)) {
                toggleLeaveTimer = setTimeout(function () {
                    $toggler.removeClass(className)
                }, 300);
            }
        });

        var header = $(".header__logo"),
            hcat = $('.hcat'),
            hcont = $('.header__cont'),
            scrollShow = $(".header__scrolling");
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll > 1 && !hcont.hasClass('is-min')) {
                hcont.addClass('is-min');
            } else if (scroll < 1 && hcont.hasClass('is-min')) {
                hcont.removeClass('is-min');
            }
            if (scroll > 250) {
                header.addClass('invisible');
                hcat.addClass('hide');
                scrollShow.removeClass('invisible');

                if ($('#stickyHeaderMenu').is(":visible")) {
                    $('#stickyHeaderMenu').hide();
                }
            } else if (scroll < 100) {
                hcat.removeClass('hide');
                header.removeClass('invisible');
                scrollShow.addClass('invisible');


                if ($('#stickyHeaderMenu').is(":hidden")) {
                    $('#stickyHeaderMenu').show();
                }
            }
        });

        $(document).on('click', '.x-add-to-cart', function (e) {
            e.preventDefault();
        });

        if ($(window).width() > 639) {
            $(window).scroll(function () {
                var s = $(window).scrollTop();

                if ($('.hide-for-small-only').is(".hide")) {
                    $('.sticker').addClass("stick-top");
                } else {
                    $('.sticker').removeClass("stick-top");
                }

                if (s > 63) {
                    $('.sticker').addClass("sticker-active");
                    if ($('.hide-for-small-only').is(".hide")) {
                        $('.sticker').removeClass("sticker-active");
                    }
                } else if (s < 80) {
                    $('.sticker').removeClass("sticker-active");
                }

            });
        } else {
        }

        var preparePrint = function () {
            var elem = $('.sticky-container > div');
            elem.removeClass('sticky');
            elem.css('margin-top', '0');
        };
        $('.button.print').on('click', function (e) {
            e.preventDefault();

            preparePrint();
            window.print();
        });
        $(document).on('keydown', function (event) {
            if (event.ctrlKey && event.key == 'p') {
                preparePrint();
            }
        });

        //анимация модального окна "Заказать обратный звонок"
        $('.header__reveal').appendTo('.morph-button');
        $('.header__reveal').css('display', 'block');
        var plugUIMorphing = function () {
            /**
             * uiMorphingButton_fixed.js v1.0.0
             * http://www.codrops.com
             */
            var transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                },
                transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
                support = {transitions: Modernizr.csstransitions};

            function extend(a, b) {
                for (var key in b) {
                    if (b.hasOwnProperty(key)) {
                        a[key] = b[key];
                    }
                }
                return a;
            }

            function UIMorphingButton(el, options) {
                this.el = el;
                this.options = extend({}, this.options);
                extend(this.options, options);
                this._init();
            }

            UIMorphingButton.prototype.options = {
                closeEl: '',
                onBeforeOpen: function () {
                    return false;
                },
                onAfterOpen: function () {
                    return false;
                },
                onBeforeClose: function () {
                    return false;
                },
                onAfterClose: function () {
                    return false;
                }
            };

            UIMorphingButton.prototype._init = function () {
                // the button
                this.button = this.el.querySelector('.button');
                // state
                this.expanded = false;
                // content el
                this.contentEl = this.el.querySelector('.morph-content');
                // init events
                this._initEvents();
            };

            UIMorphingButton.prototype._initEvents = function () {
                var self = this;
                // open
                this.button.addEventListener('click', function () {
                    self.toggle();
                });
                // close
                if (this.options.closeEl !== '') {
                    var closeEl = this.el.querySelector(this.options.closeEl);
                    if (closeEl) {
                        closeEl.addEventListener('click', function () {
                            self.toggle();
                        });
                    }
                }
            };

            UIMorphingButton.prototype.toggle = function () {
                if (this.isAnimating) return false;

                // callback
                if (this.expanded) {
                    this.options.onBeforeClose();
                }
                else {
                    // add class active (solves z-index problem when more than one button is in the page)
                    this.el.classList.add('active');
                    this.options.onBeforeOpen();
                }

                this.isAnimating = true;

                var self = this,
                    onEndTransitionFn = function (ev) {
                        if (ev.target !== this) return false;

                        if (support.transitions) {
                            // open: first opacity then width/height/left/top
                            // close: first width/height/left/top then opacity
                            if (self.expanded && ev.propertyName !== 'opacity' || !self.expanded && ev.propertyName !== 'width' && ev.propertyName !== 'height' && ev.propertyName !== 'left' && ev.propertyName !== 'top') {
                                return false;
                            }
                            this.removeEventListener(transEndEventName, onEndTransitionFn);
                        }
                        self.isAnimating = false;

                        // callback
                        if (self.expanded) {
                            // remove class active (after closing)
                            self.el.classList.remove('active');
                            self.options.onAfterClose();
                        }
                        else {
                            self.options.onAfterOpen();
                        }

                        self.expanded = !self.expanded;
                    };

                if (support.transitions) {
                    this.contentEl.addEventListener(transEndEventName, onEndTransitionFn);
                }
                else {
                    onEndTransitionFn();
                }

                // need to reset
                this.contentEl.classList.add('no-transition');

                // add/remove class "open" to the button wraper
                setTimeout(function () {
                    if (self.expanded) {
                        self.contentEl.classList.remove('no-transition');
                        self.el.classList.remove('open');
                    }
                    else {
                        setTimeout(function () {
                            self.contentEl.classList.remove('no-transition');
                            self.el.classList.add('open');
                        }, 25);
                    }
                }, 25);
            };

            // add to global namespace
            window.UIMorphingButton = UIMorphingButton;
        };
        var declareMorphButton = function () {
            var docElem = window.document.documentElement, didScroll, scrollPosition;

            // trick to prevent scrolling when opening/closing button
            function noScrollFn() {
                window.scrollTo(scrollPosition ? scrollPosition.x : 0, scrollPosition ? scrollPosition.y : 0);
            }

            function noScroll() {
                window.removeEventListener('scroll', scrollHandler);
                window.addEventListener('scroll', noScrollFn);
            }

            function scrollFn() {
                window.addEventListener('scroll', scrollHandler);
            }

            function canScroll() {
                window.removeEventListener('scroll', noScrollFn);
                scrollFn();
            }

            function scrollHandler() {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(function () {
                        scrollPage();
                    }, 60);
                }
            }

            function scrollPage() {
                scrollPosition = {
                    x: window.pageXOffset || docElem.scrollLeft,
                    y: window.pageYOffset || docElem.scrollTop
                };
                didScroll = false;
            }

            scrollFn();

            [].slice.call(document.querySelectorAll('.morph-button')).forEach(function (bttn) {
                new UIMorphingButton(bttn, {
                    closeEl: '.morph-content .close-button',
                    onBeforeOpen: function () {
                        // don't allow to scroll
                        noScroll();
                    },
                    onAfterOpen: function () {
                        // can scroll again
                        canScroll();
                    },
                    onBeforeClose: function () {
                        // don't allow to scroll
                        noScroll();
                    },
                    onAfterClose: function () {
                        // can scroll again
                        canScroll();
                    }
                });
            });
        };
        plugUIMorphing();
        declareMorphButton();

        $('.hcat__item').on('mouseenter', function () {
            $(this).find('.hcat__submenu').addClass('hcat__submenu--current');
        });
        $('.hcat__item').on('mouseleave', function () {
            $(this).find('.hcat__submenu').removeClass('hcat__submenu--current');
        });
    });

})(jQuery);
