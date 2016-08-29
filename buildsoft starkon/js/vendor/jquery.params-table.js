/**
 * @package   Params table plugin
 * @author    m.nikitin
 */
'use strict';
(function ($) {
    var paramsTable = {
        settings: {},
        self: {},
        init: function(options) {
            var settings, final_width, amount;
            paramsTable.settings = $.extend({
                // These are the defaults.
                width: 110
            }, options );

            paramsTable.self = $(this);

            paramsTable.recalculateWidth();
            paramsTable.addBindings();

            return this;/*.each(function() {
             return this.each(function() {
             this.css({
             color: settings.color,
             backgroundColor: settings.backgroundColor
             });
             });*/
        },
        addBindings: function() {
            //добавение колонки
            $(paramsTable.self).on('click', ".params-table__more", function (e) {
                e.preventDefault();
                var delete_btn = '' +
                    '<div class="params-table__column params-table__cell text-center">' +
                    '<a class="params-table__delete with-sign" href="#delete_column"><i class="sign">&times;</i></a>' +
                    '</div>';
                var input = '<div class="params-table__column params-table__cell"><input type="text"></div>';

                paramsTable.self
                    .find(".params-table__more").parent().before(delete_btn)
                    .end()
                    .end()
                    .find(".params-table__row").not(":eq(0)").append(input);
                paramsTable.recalculateWidth();
            });

            //удаление колонки
            $(paramsTable.self).on('click', ".params-table__delete", function (e) {
                e.preventDefault();

                var searched = $(this).parent();
                var row = $(this).parent().parent(".params-table__row").find(".params-table__column");
                var index = $(row).index(searched);

                paramsTable.self
                    .find(".params-table__row").each(function() {
                        $(this).find(".params-table__column").eq(index).remove();
                    });
                paramsTable.recalculateWidth();
            });

            //ресайз
            $(window).on('load resize', function () {
                paramsTable.recalculateWidth();
            });
        },
        recalculateWidth: function() {
            var amount, final_width, parent_width;
            amount = paramsTable.self.find(".params-table__row").eq(0).find(".params-table__column").size();
            final_width = amount * paramsTable.settings.width;
            parent_width = $(".params-table__wrap").parent().width();
            $(".params-table__wrap").width(final_width);

            if (final_width > parent_width) {
                $(".params-table__scrollable").removeClass("params-table__scrollable_active");
            } else
                $(".params-table__scrollable").addClass("params-table__scrollable_active");
        }
    };

    $.fn.paramsTable = function( options ) {
        if ( paramsTable[options] ) {
            return paramsTable[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof options === 'object' || ! options ) {
            return paramsTable.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }
    };

}(jQuery));