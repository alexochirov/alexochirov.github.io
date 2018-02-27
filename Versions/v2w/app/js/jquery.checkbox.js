(function($) {
    $(function() {

        $('ul.menu').on('click', 'li:not(.current)', function() {
            $(this).addClass('current').siblings().removeClass('current')
                .parents('div.wrapper').find('div.box').removeClass('visible').eq($(this).index()).addClass('visible');
            window.location.hash = $(this).data('hash');
            $('input').blur();
        });
        hash = window.location.hash.replace(/#(.+)/, '$1');
        if ( hash !== '' ) {
            $('ul.menu li[data-hash='+hash+']').click();
        }

        $.fn.toggleDisabled = function() {
            return this.each(function() {
                this.disabled = !this.disabled;
            });
        };

        $.fn.toggleChecked = function() {
            return this.each(function() {
                this.checked = !this.checked;
            });
        };

        $('button').click(function(e) {
            e.preventDefault();
        });

        $('button.add-checkbox').click(function() {
            var inputs = '';
            for (var i = 1; i <= 5; i++) {
                inputs += '<label><input type="checkbox" name="checkbox" /> чекбокс ' + i + '</label><br />';
            }
            $(this).closest('div.section').append('<div>' + inputs + '</div>');
            $('input:checkbox').styler();
        });



        $('button.check').click(function() {
            $(this).closest('div.section').find('input').toggleChecked().trigger('refresh');
        });

        $('button.disable-input').click(function() {
            $(this).closest('div.section').find('input').toggleDisabled().trigger('refresh');
        });

        $('button.disable-select').click(function() {
            $(this).closest('div.section').find('select').toggleDisabled().trigger('refresh');
        });

        $('button.disable-options').click(function() {
            $(this).closest('div.section').find('option').toggleDisabled().trigger('refresh');
        });

    });
})(jQuery);

(function($) {
    $(function() {
        $('.b-catalog-spisok__checked span input').styler({
            selectSearch: true
        });
    });
})(jQuery);
(function($) {
    $(function() {
        $('.b-catalog-spisok__checked-list span input').styler({
            selectSearch: true
        });
    });
})(jQuery);
(function($) {
    $(function() {
        $('.b-filter__color input').styler({
            selectSearch: true
        });
    });
})(jQuery);
(function($) {
    $(function() {
        $('.b-filter__menu-check').styler({
            selectSearch: true
        });
    });
})(jQuery);

(function($) {
    $(function() {
        $('body .b-bay_grup-rulbox-check').styler({
            selectSearch: true
        });

    });
})(jQuery);

///

$('#myModal').on('opened', function(){
    $(window).trigger('resize');
});
(function($) {
    $(function() {
        $('#check1').change(function() {
            var checked = $("#check1").is(':checked');
            if(checked){
                $('#text1').attr('disabled', false).trigger('refresh');
                $('#text2').attr('disabled', true).trigger('refresh');
                $('#text3').attr('disabled', true).trigger('refresh');

            }
            else{
                $('#text1').attr('disabled', true).trigger('refresh');
            }
        });
        $('#check2').change(function() {
            var checked = $("#check2").is(':checked');
            if(checked){
                $('#text2').attr('disabled', false);
                $('#text1').attr('disabled', true).trigger('refresh');
                $('#text3').attr('disabled', true).trigger('refresh');
            }
            else{
                $('#text2').attr('disabled', true);
            }
        });
        $('#check3').change(function() {
            var checked = $("#check3").is(':checked');
            if(checked){
                $('#text3').attr('disabled', false).trigger('refresh');
                $('#text1').attr('disabled', true).trigger('refresh');
                $('#text2').attr('disabled', true).trigger('refresh');
            }
            else{
                $('#text3').attr('disabled', true).trigger('refresh');
            }
        })
    })
})(jQuery);

//tooltips + calendar
$('.b-bay_grup-salebox-tool').foundation({
    tooltip: {

        selector : '.b-bay_grup-salebox-has-tip',
        additional_inheritable_classes : [],
        tooltip_class : '.b-bay_grup-salebox-tooltip',
        touch_close_text: 'b-bay_grup-salebox-tap to close',
        disable_for_touch: false,
        tip_template : function (selector, content) {
            return '<span data-selector="' + selector + '" class="'
            + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
            + '">' + content + '<span class="nub"></span></span>';
        }

    }
});

$('.b-bay_grup-salebox-tool2').foundation({
    tooltip: {

        selector : '.b-bay_grup-salebox-has-tip2',
        additional_inheritable_classes : [],
        tooltip_class : '.b-bay_grup-salebox-tooltip2',
        touch_close_text: 'b-bay_grup-salebox-tap2 to close',
        disable_for_touch: false,
        tip_template : function (selector, content) {
            return '<span data-selector="' + selector + '" class="'
            + Foundation.libs.tooltip.settings.tooltip_class.substring(1)
            + '">' + content + '<span class="nub"></span></span>';
        }

    }
});

$(function() {
    $( "#text3" ).datepicker();
});
