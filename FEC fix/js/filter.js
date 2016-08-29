/**
 * Created by HardCore4life on 11.12.2015.
 */
jQuery(document).ready(function(){


    /* слайдер цен */

    jQuery("#slider").slider({
        min: 2000,
        max: 9999,
        values: [4000,7500],
        range: true,
        stop: function(event, ui) {
            jQuery("input#minCost").val("от " + jQuery("#slider").slider("values",0) + " руб.");
            jQuery("input#maxCost").val("до " + jQuery("#slider").slider("values",1) + " руб.");

        },
        slide: function(event, ui){
            jQuery("input#minCost").val("от " + jQuery("#slider").slider("values",0) + " руб.");
            jQuery("input#maxCost").val("до " + jQuery("#slider").slider("values",1) + " руб.");
        }
    });

    jQuery("input#minCost").change(function(){

        var value1=jQuery("input#minCost").val();
        var value2=jQuery("input#maxCost").val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            jQuery("input#minCost").val(value1);
        }
        jQuery("#slider").slider("values",0,value1);
    });


    jQuery("input#maxCost").change(function(){

        var value1=jQuery("input#minCost").val();
        var value2=jQuery("input#maxCost").val();

        if (value2 > 9999) { value2 = 9999; jQuery("input#maxCost").val(9999)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            jQuery("input#maxCost").val(value2);
        }
        jQuery("#slider").slider("values",1,value2);
    });



// фильтрация ввода в поля
    jQuery('.formCost input').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;

        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);

        if(!/\d/.test(keyChar))	return false;

    });


});



