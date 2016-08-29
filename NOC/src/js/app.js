;
$(document).foundation();

(function($) {
    "use strict";
    $(function() {
        refreshSelect();

        //begin  b-buy and other main functions
        (function changeSizeStamping() {
            var widthX = 181;
            var heightY = 197;

            $('.b-info__centi_x').keyup(function() {
                widthX = +$(this).val() * 16;
                $('.tisnenie__big').attr("style", "left:calc(50% - " + widthX / 2 + "px);width:" + widthX + "px;height: " + heightY + "px; background-size:" + widthX + "px " + heightY + "px;");
            });
            $('.b-info__centi_y').keyup(function() {
                heightY = +$(this).val() * 16;
                $('.tisnenie__big').attr("style", "left:calc(50% - " + widthX / 2 + "px);width:" + widthX + "px;height: " + heightY + "px; background-size:" + widthX + "px " + heightY + "px;");
            });

            $('.b-info__centi_x2').keyup(function() {
                widthX = +$(this).val() * 16;
                $('.tisnenie__big-two').attr("style", "left:calc(50% - " + widthX / 2 + "px);width:" + widthX + "px;height: " + heightY + "px; background-size:" + widthX + "px " + heightY + "px;");
            });
            $('.b-info__centi_y2').keyup(function() {
                heightY = +$(this).val() * 16;
                $('.tisnenie__big-two').attr("style", "left:calc(50% - " + widthX / 2 + "px);width:" + widthX + "px;height: " + heightY + "px; background-size:" + widthX + "px " + heightY + "px;");
            });

        })();

        //hide all blocks
        function hideAll() {
            $('.razvorot-big').hide();
            $('.big-oblozka').hide();
            $('.map-big').hide();
            $('.srez-big').hide();
            $('.reklama-big').hide();
        }

        function scrollCalc() {
            var obj = $('.calculator__result');
            var offset = obj.offset();
            var leftOffset = offset.left;
            var bodyH = $("body").height();
            var bodyTop = parseInt(bodyH);
            var scrollTop = $(window).scrollTop();
            var bottomHeight = 480;
            var topperHeight = 354;
            var calcHeight = 500;
            if (scrollTop < topperHeight) {
                obj.css({
                    position: 'relative',
                    left: 0,
                    top: 0
                });
            } else if (scrollTop > (bodyTop - bottomHeight - calcHeight)) {
                obj.css({
                    left: leftOffset,
                    bottom: bottomHeight,
                    top: 'auto',
                    position: 'fixed',
                });
            } else {
                obj.css({
                    top: "30px",
                    left: leftOffset,
                    position: 'fixed',
                });
            }


        }

        var numEzhe = 99;
        var typeOfProduct = 'Ежедневник на ниткошвейном блоке';
        var classesRibbon = ['js-red', 'js-green', 'js-yellow'];
        var numMaterial;
        var imgSrc1;
        var imgSrc2;


        function chooseTypeBlock() {
            blockThread();
            $('#a-styler li').click(function() {
                var num = $(this).index() + 1;
                var typeOfClickProduct = $(this).text();
                if (typeOfClickProduct != typeOfProduct) {
                    offThreadBlock();
                    typeOfProduct = typeOfClickProduct;
                }
                hideAll();

                switch (num) {
                    case 2:
                        blockThread();
                        break;
                    case 3:
                        springThread();
                        break;
                    default:
                        $('#exampleModal1').foundation('open');
                        offThreadBlock();
                        blockThread();
                        setTimeout(function() {
                            $('#a-styler li').eq(1).trigger('click');
                        }, 20);
                        break;
                }
            });
        }

        function springThread() {
            $('.calculator__result').addClass('calculator__result_spring');
            $('.big-oblozka').show();
            $('#formatProduct').find('.b-info__value').load('./formatProduct2.html', function() {
                refreshSelect();
            });
            $('#typeOblo').find('.b-info__value').load('./typeOblo2.html', function() {
                refreshSelect();
            });
            $('#colorPrint').find('.b-info__value').load('./colorPrint2.html');
            $('#typeFastening').load('./typeFastening2.html');
            $('#coverView').load('./coverView2.html');
            $('#vikleyka').load('./vikleyka2.html');
            $('#pocketInstall').load('./pocketInstall2.html');
            $('#elasticR').html('');
            $('#perfoAndOther').hide();
            $('#viruAndOther').hide();
            $('#glue').load('./glue2.html', function() {
                refreshSelect();
                $('#b-styler li').click(typeObloBlock);
                $('.b-buy').click(clickBuySpring);
                $('#easycover').closest('.b-info__value').click(easyCovering);

                $('#oblozka_261').closest('.b-info__value').click(leatherCovering);
                $('.b-info__stock').click(selectColor);
                $('.b-buy__add-stamping').click(addStamping);
            });
        }

        function refreshSelect() {
            $('.b-info__select').styler();
            $('.b-buy__file').styler();
        }

        function unlockActivity() {
            $("#blk1, #blk2").prop('disabled', false);
            $("#blk1, #blk2").prop('checked', false);
        }

        function disableAllColors() {
            $("#block__print").closest('.b-info__value').find('input').prop('disabled', true);
            $("#block__print").closest('.b-info__value').find('input').prop('checked', false);
        }

        //off all functions of the Thread Block
        function offThreadBlock() {
            $('#blk1, #block__print, #colorpaper, #easycover').closest('.b-info__value').find('input').attr('checked', false);
            $('#blk1, #block__print, #colorpaper, #easycover').closest('.b-info__value').find('input').attr('disabled', false);
            $('#blk1').attr('checked', true);

            $('.oblozka-color__one, .oblozka-shi1, .oblozka-shi2, .oblozka-shi3, .oblozka-texture').attr('style', '');
            $('.petlya__pen, .ugol, .obvodka, .virubka__img, .perforation__img').hide();
            $('.oblozka-line').html('');

            $('.lyasse__one').attr('class', 'lyasse__one');
            $('.hlyastic__big').attr('class', 'hlyastic__big');
            $('.rezinka__oblozhka').attr('class', 'rezinka__oblozhka');
            $('.rezinka__col').attr('class', 'rezinka__col');
            $('.tisnenie__big').attr('class', 'tisnenie__big');
            $('.tisnenie__big-two').attr('class', 'tisnenie__big-two');
            $('.calculator__result').attr('class', 'calculator__result');
            $(".tisnenie__big, .tisnenie__big-two").attr('style', '');

            $('#b-styler li').unbind('click', typeObloBlock);
            $('.b-buy').unbind('click', clickBuySpring);

            $('#reklama-place-styler li').unbind('click', blockAdvert);
            $('#e-styler li').unbind('click', forzacOpen);
            $('#nah-styler li').unbind('click', nahzacOpen);
            $('#c-styler li').unbind('click', blockStandartBlocks);
            $('.js-dated .b-buy').unbind('click', logicColor);
            $('.b-buy').unbind('click', colorAndPerforation);

            $('#panel2v, #panel5v').unbind('click', razvorotBig);
            $('#panel3v, #panel4v').unbind('click', bigOblozka);


            $('.b-info__rekla-show').unbind('click', reklaShow);
            $('.b-info__map-show').unbind('click', mapShow);
            $('.b-info__srez-show').unbind('click', srezShow);

            $('.b-buy__add-stamping').unbind('click', addStamping);
            $('#easycover').closest('.b-info__value').unbind('click', easyCovering);
            $('#oblozka_259').closest('.b-info__value').unbind('click', hardCovering);

            $('#oblozka_260').closest('.b-info__value').unbind('click', laminCovering);
            $('#oblozka_261').closest('.b-info__value').unbind('click', leatherCovering);

            $('.b-buy_js-lasse img').unbind('click', lyasseOne);
            $('.b-buy_js-lasse2 img').unbind('click', lyasseTwo);

            $('.b-buy_color img').unbind('click', rubberShow);
            $('.b-info__lyasse-btn').unbind('click', addLyasseOpening);

            $('.b-info__main-blocks .b-info__option').unbind('click', paintBlock);
            $('.b-info__contr .b-info__option').unbind('click', paintComby1);

            $('.b-info__contr2 .b-info__option').unbind('click', paintComby2);

            $('.b-info__nat-leather img').unbind('click', leatherChange);

            $('.b-info__stock').unbind('click', selectColor);

            $('.b-info__shivka').unbind('click', shivkaChange);

            $('.b-info__indi').unbind('click', openIndividual);
        }

        function clickBuySpring() {
            if ($('#blk3').prop('checked') || $('#blk4').prop('checked')) {
                $("#block__print3, #block__print4").prop('disabled', false);
                $('#block__print').prop('disabled', true).prop('checked', false);
            } else {
                $('#block__print').prop('disabled', false);
                $("#block__print3, #block__print4").prop('checked', false).prop('disabled', true);
            }

            if ($("#block__print3").prop('checked') || $("#block__print4").prop('checked')) {
                $('#colorpaper2').prop('disabled', false);
            } else {
                $('#colorpaper2').prop('disabled', true).prop('checked', false);
            }
            if ($('#oblozka_259').prop('checked') || $('#oblozka_260').prop('checked')) {
                $('.b-info__lamination').slideDown();
            } else {
                $('.b-info__lamination').slideUp();
            }

            if ($('#typeF2').prop('checked') || $('#typeF4').prop('checked') || $('#typeF5').prop('checked') || $('#typeF6').prop('checked')) {
                $('#proshivka').prop('checked', true);
                $('#proshivka2').prop('disabled', true);
            } else {
                $('#proshivka2').prop('disabled', false);
            }

            if ($('#typeF5').prop('checked') || $('#typeF6').prop('checked')) {
                $('#verticalpocket2').prop('checked', true);
                $('#verticalpocket').prop('disabled', true);
            } else {
                $('#verticalpocket').prop('disabled', false);
            }

            if ($('#typeF2').prop('checked') || $('#typeF4').prop('checked')) {
                $('#verticalpocketback2').prop('checked', true);
                $('#verticalpocketback').prop('disabled', true);
            } else {
                $('#verticalpocketback').prop('disabled', false);
            }

            //foil
            if ($('#tisnenie_select').prop('checked')) {
                $('.b-info__tis').slideUp();
            } else {
                $('.b-info__tis').slideDown();

            }

            if ($('#tisnenie_select30').prop('checked')) {
                $('#foil10').prop('checked', false);
                $('#foil20').prop('checked', false);
                $('.tisnenie__big-two').addClass('blint');
            } else {
                $('.tisnenie__big-two').removeClass('blint');
            }

            if ($('#tisnenie_select20').prop('checked')) {
                $('.tisnenie__big-two').addClass('folga');
                $('.b-info__value_foil0').slideDown();
            } else {
                $('.tisnenie__big-two').removeClass('folga');
                $('.b-info__value_foil0').slideUp();
            }


            if ($('#tisnenie_select3').prop('checked')) {
                $('#foil1').prop('checked', false);
                $('#foil2').prop('checked', false);
                $('.tisnenie__big').addClass('blint');
            } else {
                $('.tisnenie__big').removeClass('blint');
            }

            if ($('#tisnenie_select2').prop('checked')) {
                $('.tisnenie__big').addClass('folga');
                $('.b-info__value_foil').slideDown();
            } else {
                $('.tisnenie__big').removeClass('folga');
                $('.b-info__value_foil').slideUp();
            }

            if ($('#foil2').prop('checked')) {
                $('.tisnenie__big').addClass('folga-zoloto');
            } else {
                $('.tisnenie__big').removeClass('folga-zoloto');
            }

            if ($('#foil20').prop('checked')) {
                $('.tisnenie__big-two').addClass('folga-zoloto');
            } else {
                $('.tisnenie__big-two').removeClass('folga-zoloto');
            }

            //obvodka
            if ($('#proshivka').prop('checked')) {
                $('.obvodka').show();
            } else {
                $('.obvodka').hide();
            }
            if ($('#typeF5').prop('checked') || $('#typeF6').prop('checked')) {
                $('#hlyastic').closest('.b-info__value').find('input').prop('disabled', true);
                $('#hlyastic').prop('checked', true);
            } else {
                $('#hlyastic').closest('.b-info__value').find('input').prop('disabled', false);
            }
            if ($('#typeF5').prop('checked') || $('#typeF6').prop('checked')) {
                $('#petlya_for_pen').closest('.b-info__value').find('input').prop('disabled', true);
                $('#petlya_for_pen').prop('checked', true);
            } else {
                $('#petlya_for_pen').closest('.b-info__value').find('input').prop('disabled', false);
            }

            //corners
            if ($('#ugol_metal').prop('checked')) {
                $('.b-info__col').slideDown();
                $('.ugol').show();
            } else {
                $('.b-info__col').slideUp();
                $('.ugol').hide();
            }
            //loop
            if ($('#petlya_for_pen').prop('checked')) {
                $('.petlya__pen').hide();
            } else {
                $('.petlya__pen').show();
            }
            //strap
            if ($('#hlyastic2').prop('checked')) {
                $('.hlyastic__big').addClass('hlyastic__big_button');
            } else {
                $('.hlyastic__big').removeClass('hlyastic__big_button');
            }

            if ($('#hlyastic3').prop('checked')) {
                $('.hlyastic__big').addClass('hlyastic__big_magnet');
            } else {
                $('.hlyastic__big').removeClass('hlyastic__big_magnet');
            }
            if ($(this).find('.b-buy__inpt_hide').prop('checked')) {
                $(this).siblings('.b-buy_hide').slideDown();
            } else {
                $(this).siblings('.b-buy_hide').slideUp();
            }
            if ($('#reklama2').prop('checked')) {
                $('.b-buy_di').slideDown();
            } else {
                $(".b-buy_di").slideUp();
            }
        }

        function typeObloBlock() {
            var num = $(this).index();
            switch (num) {
                case 1:
                    $('#typeF1').closest('.b-info__value').find('input').prop('disabled', true);
                    $("#typeF3").prop('checked', true);
                    break;
                default:
                    $('#typeF1').closest('.b-info__value').find('input').prop('disabled', false).prop('checked', false);
                    break;

            }
        }

        function blockAdvert() {

            var num = $(this).index();
            var classArr = ['reklama-place__before', 'reklama-place__after', 'reklama-place__inner'];
            $('.reklama-big').removeClass(classArr.join(' '));
            $('.reklama-big').addClass(classArr[num]);
        }

        function forzacOpen() {
            var num = $(this).index() + 1;
            hideAll();
            $('.map-big').show();
            $('.map-big').attr('class', 'map-big');
            switch (num) {
                case 1:
                    $('.map-big').addClass('forzac_russia');
                    break;
                case 2:
                    $('.map-big').addClass('forzac_europe');
                    break;
                case 3:
                    $('.b-buy_forzac').slideDown();
                    break;
                default:
                    $('.b-buy_forzac').slideUp();
                    break;

            }
        }

        function nahzacOpen() {
            var num = $(this).index() + 1;
            hideAll();
            $('.map-big').show();
            $('.map-big').attr('class', 'map-big');
            switch (num) {
                case 1:
                    $('.map-big').addClass('nahzac_russia');
                    break;
                case 2:
                    $('.map-big').addClass('nahzac_europe');
                    break;
                case 3:
                    $('.b-buy_nahzac').slideDown();
                    break;
                default:
                    $('.b-buy_nahzac').slideUp();
                    break;

            }
        }

        function blockStandartBlocks() {

            numEzhe = $(this).index() + 1;
            switch (numEzhe) {
                case 4:
                    unlockActivity();
                    $("#blk1").prop('disabled', true);
                    break;
                case 5:
                    unlockActivity();
                    $("#blk2").prop('disabled', true);
                    break;
                default:
                    unlockActivity();
                    break;

            }
        }

        function logicColor() {
            disableAllColors();
            if ($('#blk1').prop('checked') || ($('#blk2').prop('checked'))) {
                $('#block__print').prop('disabled', false); //red and black print
            }
            if ($('#blk1').prop('checked') && numEzhe == 2) {
                $('#block__print2').prop('disabled', false); //grey print
            }
            if ($('#blk2').prop('checked') && numEzhe == 2) {
                $('#block__print2').prop('disabled', false); //grey print
            }
            if ($('#blk3').prop('checked') || $('#blk4').prop('checked')) {
                $('#block__print3, #block__print4').prop('disabled', false); //individual print

            }
        }

        function colorAndPerforation() {
            if ($('#block__print').prop('checked')) {
                $('#colorpaper').prop('checked', true);
            }
            if ($('#block__print2').prop('checked')) {
                $('#colorpaper2').prop('checked', true);
            }
            if ($('#block__print3').prop('checked') || $('#block__print4').prop('checked')) {
                $('#colorpaper, #colorpaper2').prop('disabled', false);
                $('#perforation').prop('checked', true);


            } else {
                $('#perforation2').prop('checked', true);
                $('#colorpaper, #colorpaper2').prop('disabled', true);
            }

            //perforation
            if ($('#perforation2').prop('checked')) {
                $('.perforation__img').show();
            } else {
                $('.perforation__img').hide();
            }

            //color of razvorot__type
            var imgRazv = "red.jpg";
            if ($('#blk1').prop('checked') || $('#blk3').prop('checked')) {
                if ($('#block__print').prop('checked') && $('#colorpaper').prop('checked')) {

                    imgRazv = "462.jpg";
                    if ($('#virubka2').prop('disabled') === false) {
                        imgRazv = "461.jpg";
                    }
                }
                if ($('#block__print2').prop('checked') && $('#colorpaper').prop('checked')) {
                    imgRazv = "463.jpg";
                }
                if ($('#block__print2').prop('checked') && $('#colorpaper2').prop('checked')) {
                    imgRazv = "464.jpg";
                }

            }

            if ($('#blk2').prop('checked') || $('#blk4').prop('checked')) {
                if ($('#block__print').prop('checked') && $('#colorpaper').prop('checked')) {
                    imgRazv = "412.jpg";
                }
                if ($('#block__print2').prop('checked') && $('#colorpaper2').prop('checked')) {
                    imgRazv = "416.jpg";
                }
            }

            if (imgRazv) {
                $('.razvorot__type').attr("style", "background:url(./images/" + imgRazv + ") no-repeat;background-size:contain;");
            }


            //register cutting
            if ($('#blk1').prop('checked') || $('#blk3').prop('checked')) {
                $('#virubka2').prop('disabled', false);
            } else {
                $('#virubka2').prop('disabled', true);
                $('#virubka').prop('checked', true);

            }


            //envelope

            if ($('#konver_type2').prop('checked')) {
                $('.konvert-big').addClass('konvert_type-white');

            } else {
                $('.konvert-big').removeClass('konvert_type-white');
            }

            if ($('#konver_type3').prop('checked')) {
                $('.konvert-big').addClass('konvert_type-tonic');

            } else {
                $('.konvert-big').removeClass('konvert_type-tonic');
            }



            //gilding
            if ($('#zolochenie').prop('checked')) {

                $('#printsrez').closest('.b-info__value').find('input').prop('disabled', false);
            } else {
                $('#printsrez').closest('.b-info__value').find('input').prop('disabled', true);
                $('#printsrez').prop('checked', true);
            }

            if ($('#printsrez').prop('checked')) {
                $('#zolochenie').closest('.b-info__value').find('input').prop('disabled', false);
            } else {
                $('#zolochenie').closest('.b-info__value').find('input').prop('disabled', true);
                $('#zolochenie').prop('checked', true);
            }

            if ($('#zolochenie2').prop('checked')) {
                $('.srez-big').addClass('zolochenie__gold');
            } else {
                $('.srez-big').removeClass('zolochenie__gold');
            }

            if ($('#zolochenie3').prop('checked')) {
                $('.srez-big').addClass('zolochenie__silver');
            } else {
                $('.srez-big').removeClass('zolochenie__silver');
            }
            //felling
            if ($('#virubka2').prop('checked')) {
                $('.virubka__img').show();
            } else {
                $('.virubka__img').hide();
            }

            //ribbon
            if ($('#lyasse').prop('checked')) {
                $('.lyasse__one').addClass('js-gold');
            } else {
                $('.lyasse__one').removeClass('js-gold');
            }


            if ($('#lyasse2').prop('checked')) {
                $('.lyasse__one').addClass('js-red');
            } else {
                $('.lyasse__one').removeClass('js-red');
            }


            if ($('#lyasse3').prop('checked')) {
                $('.lyasse__one').addClass('js-print');
            } else {
                $('.lyasse__one').removeClass('js-print');
            }

            if ($('#lyasse4').prop('checked')) {
                $('.lyasse__two').addClass('js-gold');
            } else {
                $('.lyasse__two').removeClass('js-gold');
            }

            if ($('#lyasse5').prop('checked')) {
                $('.lyasse__two').addClass('js-red');
            } else {
                $('.lyasse__two').removeClass('js-red');
            }

            if ($('#lyasse6').prop('checked')) {
                $('.lyasse__two').addClass('js-print');
            } else {
                $('.lyasse__two').removeClass('js-print');
            }
            //print on side
            if ($('#printsrez').prop("checked")) {
                $('.b-buy_hide-maket').slideUp();
                $('.b-info__topper').slideUp();
            } else {
                $('.b-buy_hide-maket').slideDown();
                $('.b-info__topper').slideDown();
            }

            //elastic
            if ($('#rezinka').prop('checked')) {
                $('.b-buy_color').slideUp();
            } else {
                $('.b-buy_color').slideDown();
            }

            if ($('#rezinka2').prop('checked')) {
                $('.rezinka__oblozhka, .rezinka__col').addClass('rezinka__horizontal');
            } else {
                $('.rezinka__oblozhka, .rezinka__col').removeClass('rezinka__horizontal');
            }

            if ($('#rezinka3').prop('checked')) {
                $('.rezinka__oblozhka, .rezinka__col').addClass('rezinka__vertical');
            } else {
                $('.rezinka__oblozhka, .rezinka__col').removeClass('rezinka__vertical');
            }

            //corners
            if ($('#ugol_metal').prop('checked')) {
                $('.b-info__col').slideDown();
                $('.ugol').show();
            } else {
                $('.b-info__col').slideUp();
                $('.ugol').hide();
            }
            //loop
            if ($('#petlya_for_pen').prop('checked')) {
                $('.petlya__pen').hide();
            } else {
                $('.petlya__pen').show();
            }
            //strap
            if ($('#hlyastic2').prop('checked')) {
                $('.hlyastic__big').addClass('hlyastic__big_button');
            } else {
                $('.hlyastic__big').removeClass('hlyastic__big_button');
            }

            if ($('#hlyastic3').prop('checked')) {
                $('.hlyastic__big').addClass('hlyastic__big_magnet');
            } else {
                $('.hlyastic__big').removeClass('hlyastic__big_magnet');
            }
            //foil
            if ($('#tisnenie_select').prop('checked')) {
                $('.b-info__tis').slideUp();
            } else {
                $('.b-info__tis').slideDown();

            }

            if ($('#tisnenie_select30').prop('checked')) {
                $('#foil10').prop('checked', false);
                $('#foil20').prop('checked', false);
                $('.tisnenie__big-two').addClass('blint');
            } else {
                $('.tisnenie__big-two').removeClass('blint');
            }

            if ($('#tisnenie_select20').prop('checked')) {
                $('.tisnenie__big-two').addClass('folga');
                $('.b-info__value_foil0').slideDown();
            } else {
                $('.tisnenie__big-two').removeClass('folga');
                $('.b-info__value_foil0').slideUp();
            }


            if ($('#tisnenie_select3').prop('checked')) {
                $('#foil1').prop('checked', false);
                $('#foil2').prop('checked', false);
                $('.tisnenie__big').addClass('blint');
            } else {
                $('.tisnenie__big').removeClass('blint');
            }

            if ($('#tisnenie_select2').prop('checked')) {
                $('.tisnenie__big').addClass('folga');
                $('.b-info__value_foil').slideDown();
            } else {
                $('.tisnenie__big').removeClass('folga');
                $('.b-info__value_foil').slideUp();
            }

            if ($('#foil2').prop('checked')) {
                $('.tisnenie__big').addClass('folga-zoloto');
            } else {
                $('.tisnenie__big').removeClass('folga-zoloto');
            }

            if ($('#foil20').prop('checked')) {
                $('.tisnenie__big-two').addClass('folga-zoloto');
            } else {
                $('.tisnenie__big-two').removeClass('folga-zoloto');
            }

            //obvodka
            if ($('#proshivka').prop('checked')) {
                $('.obvodka').show();
            } else {
                $('.obvodka').hide();
            }

            if ($(this).find('.b-buy__inpt_hide').prop('checked')) {
                $(this).siblings('.b-buy_hide').slideDown();
            } else {
                $(this).siblings('.b-buy_hide').slideUp();
            }
            if ($('#combycover').prop('checked')) {
                $('.b-info__enter-shivka').slideDown();
            } else {
                $('.b-info__enter-shivka').slideUp();
            }







            if ($('#lam1').prop('checked')) {
                var imgSrc = './images/lam1.png';
                // purify from other images
                clearTexture();
                $('.oblozka-color__one').attr("style", "background:url(" + imgSrc + ");");
            }
            if ($('#lam2').prop('checked')) {
                var imgSrc = './images/lam2.png';
                // purify from other images
                clearTexture();
                $('.oblozka-color__one').attr("style", "background:url(" + imgSrc + ");");
            }
            if ($('#lam3').prop('checked')) {
                var imgSrc = './images/lam3.png';
                // purify from other images
                clearTexture();
                $('.oblozka-color__one').attr("style", "background:url(" + imgSrc + ");");
            }
            if ($('#lam4').prop('checked')) {
                var imgSrc = './images/lam4.png';
                // purify from other images
                clearTexture();
                $('.oblozka-color__one').attr("style", "background:url(" + imgSrc + ");");
            }


            if ($(this).find('.b-buy__inpt_hide2').prop('checked')) {
                $(this).siblings('.b-buy_hide2').slideDown();
            } else {
                $(this).siblings('.b-buy_hide2').slideUp();
            }
        }

        function razvorotBig() {
            hideAll();
            $('.razvorot-big').show();
        }

        function bigOblozka() {
            hideAll();
            $('.big-oblozka').show();
        }

        function clearTexture() {

            $('.oblozka-line').html('');
            $('.oblozka-texture, .oblozka-color__two, .oblozka-color__one').attr("style", "");

            clearStaple();
            imgSrc1 = null;
            imgSrc2 = null;
        }

        function clearStaple() {
            $('.oblozka-shi1, .oblozka-shi2, .oblozka-shi3').attr("style", "");
        }

        function replaceStaple() {
            clearStaple();

            if (numMaterial === 0) {
                if (imgSrc2 !== (undefined || null)) {
                    $('.oblozka-shi1').attr("style", "background-image:url(./images/mat/" + imgSrc2 + ");");
                }

            } else if (numMaterial === 1) {
                if (imgSrc2 !== (undefined || null)) {
                    $('.oblozka-shi2').attr("style", "background-image:url(./images/mat/" + imgSrc2 + ");");
                }
                if (imgSrc1 !== (undefined || null)) {
                    $('.oblozka-shi3').attr("style", "background-image:url(./images/mat/" + imgSrc1 + ");");
                }


            }
        }

        function reklaShow() {
            //advertising
            setTimeout(function() {
                if ($('#reklama2').prop('checked')) {
                    hideAll();
                    $('.map-big').show();
                    $('.reklama-big').show();
                    $('.b-buy_di').slideDown();
                } else {
                    $('.reklama-big').hide();
                    $('.b-buy_di').slideUp();
                }
            }, 10);
        }

        function mapShow() {
            setTimeout(function() {
                hideAll();
                $('.map-big').show();
            }, 20);
        }

        function srezShow() {
            setTimeout(function() {
                hideAll();
                $('.srez-big').show();
            }, 20);
        }

        function addStamping() {
            $('.b-info__tis2').slideDown();
        }

        function easyCovering() {
            if ($('#easycover').prop('checked')) {
                clearTexture();
                $('.b-info__row_mat').slideDown();
            } else {
                $('.b-info__fabric').hide();
                $('.b-info__row_mat').slideUp();
            }
        }

        function hardCovering() {
            if ($('#oblozka_259').prop('checked')) {
                $('.b-info__leather').slideDown();
                clearTexture();
            } else {
                $('.b-info__leather').slideUp();
            }
        }

        function laminCovering() {
            if ($('#oblozka_260').prop('checked')) {
                //prohibition of taking a loop and strap
                $('#proshivka2').prop('checked', true);
                $('#proshivka').closest('.b-info__value').find('input').prop('disabled', true);
                $('#hlyastic').prop('checked', true);
                $('#hlyastic').closest('.b-info__value').find('input').prop('disabled', true);

                $('.b-info__lamination').slideDown();
                clearTexture();
            } else {

                $('#proshivka').closest('.b-info__value').find('input').prop('disabled', false);
                $('#hlyastic').closest('.b-info__value').find('input').prop('disabled', false);

                $('.b-info__lamination').slideUp();
                $('.b-info__lamination input').prop('checked', false);
            }
        }

        function leatherCovering() {
            if ($('#oblozka_261').prop('checked')) {
                $('.b-info__nat-leather').slideDown();
                clearTexture();
                var styleTex = $('.b-info__nat-leather').data("src-mat");
                $('.oblozka-texture').attr("style", "background:url(" + styleTex + ");");

            } else {
                $('.b-info__nat-leather').slideUp();
            }
        }

        function lyasseOne() {
            $('.lyasse__one').attr('class', 'lyasse__one');
            var indx = $(this).index() - 1;
            $('.lyasse__one').addClass(classesRibbon[indx]);
        }

        function lyasseTwo() {
            $('.lyasse__two').attr('class', 'lyasse__two');
            var indx = $(this).index() - 1;
            $('.lyasse__two').addClass(classesRibbon[indx]);
        }

        function rubberShow() {
            var imgPath = $(this).attr('src');
            $('.rezinka__col').attr('style', 'background:url(' + imgPath + ');');
        }

        function addLyasseOpening() {
            $(this).parent().next('.b-info__hide-block').slideDown();
        }

        function paintBlock() {
            var imgSrc = $(this).data('value');
            $('.b-info__option.js-selected').removeClass('js-selected');
            $(this).addClass('js-selected');
            $('.oblozka-color__one').attr("style", "background-image:url(./images/mat/" + imgSrc + ");");
        }

        function paintComby1() {
            imgSrc1 = $(this).data('value');
            $('.b-info__option.js-selected').removeClass('js-selected');
            $(this).addClass('js-selected');

            $('.oblozka-color__one').attr("style", "background-image:url(./images/mat/" + imgSrc1 + ");");

            replaceStaple();

            $('.b-info__contr2 .b-info__row_mat').slideDown();
        }

        function paintComby2() {
            imgSrc2 = $(this).data('value');
            $('.b-info__option.js-selected').removeClass('js-selected');
            $(this).addClass('js-selected');

            //clear staple
            $('.oblozka-shi1').attr("style", "");
            $('.oblozka-shi2').attr("style", "");

            replaceStaple();

            $('.b-info__contr2 .b-info__row_mat').slideDown();
        }

        function leatherChange() {
            var imgSrc = $(this).attr('src');
            $('.oblozka-color__one').attr("style", "background:url(" + imgSrc + ");");
        }

        function selectColor() {
            var num = $(this).index();
            $('.b-info__stock.js-selected').removeClass('js-selected');
            $(this).addClass('js-selected');
            $(this).closest('.b-info__row_mat').next().find('.b-info__fabric').hide();
            $(this).closest('.b-info__row_mat').next().find('.b-info__fabric').eq(num).show();
        }

        function shivkaChange() {
            $('.b-info__value_download').slideUp();
            $('.b-info__contr').slideDown();
            $('.b-info__contr').find('.b-info__row_mat').first().slideDown();
            numMaterial = $(this).index();
            replaceStaple();
            var imgShivka = $(this).find('img').data('src-mat');
            $('.oblozka-line').html('<img src="' + imgShivka + '"/>');
        }

        function openIndividual() {
            $('.b-info__contr').slideUp();
            $('.oblozka-line').html('');
            $('.b-info__value_download').slideDown();
            clearStaple();
        }

        function blockThread() {
            $('#formatProduct').find('.b-info__value').load('./formatProduct.html', function() {
                refreshSelect();
            });
            $('#typeOblo').find('.b-info__value').load('./typeOblo.html');
            $('#colorPrint').find('.b-info__value').load('./colorPrint.html');
            $('#typeFastening, #vikleyka, #pocketInstall').html('');
            $('#coverView').load('./coverView.html');
            $('#elasticR').load('./elasticR.html', function() {
                refreshSelect();
                $('.big-oblozka').show();

                //block advert
                $('#reklama-place-styler li').click(blockAdvert);

                $('#e-styler li').click(forzacOpen);

                $('#nah-styler li').click(nahzacOpen);

                disableAllColors();

                $('#c-styler li').click(blockStandartBlocks);
                $('.js-dated .b-buy').click(logicColor);
                //color of paper
                $('.b-buy').click(colorAndPerforation);

                $('#panel2v, #panel5v').click(razvorotBig);
                $('#panel3v, #panel4v').click(bigOblozka);


                $('.b-info__rekla-show').click(reklaShow);
                $('.b-info__map-show').click(mapShow);
                $('.b-info__srez-show').click(srezShow);


                $('.b-buy__add-stamping').click(addStamping);

                $('#easycover').closest('.b-info__value').click(easyCovering);
                $('#oblozka_259').closest('.b-info__value').click(hardCovering);

                $('#oblozka_260').closest('.b-info__value').click(laminCovering);
                $('#oblozka_261').closest('.b-info__value').click(leatherCovering);

                $('.b-buy_js-lasse img').click(lyasseOne);
                $('.b-buy_js-lasse2 img').click(lyasseTwo);

                $('.b-buy_color img').click(rubberShow);
                $('.b-info__lyasse-btn').click(addLyasseOpening);

                $('.b-info__main-blocks .b-info__option').click(paintBlock);

                $('.b-info__contr .b-info__option').click(paintComby1);

                $('.b-info__contr2 .b-info__option').click(paintComby2);

                $('.b-info__nat-leather img').click(leatherChange);

                $('.b-info__stock').click(selectColor);

                $('.b-info__shivka').click(shivkaChange);

                $('.b-info__indi').click(openIndividual);
            });
            $('#perfoAndOther').show();
            $('#viruAndOther').show();
            $('#glue').load('./glue.html', function() {
                refreshSelect();
            });
        }




        $(document).ready(function() {
            chooseTypeBlock();
        });
        $(window).scroll(function() {
            scrollCalc();
        });


        //begin of cover and spread
        $('.b-main__link').click(function() {
            var num = $(this).index();
            if (num === 0) {

                hideAll();
                $(".big-oblozka").show();
            } else {
                hideAll();
                $(".razvorot-big").show();

            }
        });
        //end of cover and spread
        //begin of tabs extra buttons
        $('.b-info__next-step').click(function() {
            $('.b-steps .is-active').next().children('a').click();
        });
        $('.b-info__prev-step').click(function() {
            $('.b-steps .is-active').prev().children('a').click();
        });
        //end of tabs extra buttons

    });
})(jQuery);