function fDoubleSliderInit
(
  MinSliderValue,
  MaxSliderValue,
  SliderStep,
  SliderDivID,
  DivForLeftHandleValueID,
  TextBeforLeftHandleValue,
  DivForRightHandleValueID,
  TextBeforRightHandleValue,
  TextUnits,
  InputForLeftHandleValueID,
  InputForRightHandleValueID
)
{
  jQuery('#' + SliderDivID).slider
  ({
    range: true,
    min: MinSliderValue,
    max: MaxSliderValue,
    step: SliderStep,
    values: [MinSliderValue, MaxSliderValue],

    create: function( event, ui )
    {
      SliderWidth = $('#' + SliderDivID).css('width');
      //???????? ??-?????????
      $('#' + DivForLeftHandleValueID).html( TextBeforLeftHandleValue + MinSliderValue + TextUnits ).css( {left : '0%'} );
      $('#' + DivForRightHandleValueID).html( TextBeforRightHandleValue + MaxSliderValue + TextUnits ).css( {left : SliderWidth} );
      $('#' + InputForLeftHandleValueID).attr('value', MinSliderValue);
      $('#' + InputForRightHandleValueID).attr('value', MaxSliderValue);
    },
    change: function( event, ui )
    {
      //????????? ??????? ???? ?????, ??? ??? ????? ???????? ?????? ? ??????? ?????
      $('#' + InputForLeftHandleValueID).attr('value', ui.values[0]);
      $('#' + InputForRightHandleValueID).attr('value', ui.values[1]);
    },
    slide: function( event, ui )
    {
      //???????? ???????? ? ??????? ??? ?? ????????
      var index = $(ui.handle).index();
      var bias = $(ui.handle).css("left");
      if(index == 1)
      {
        $('#' + DivForLeftHandleValueID).html( TextBeforLeftHandleValue + ui.values[0] + TextUnits ).css( {left : bias} );
      }
      else
      {
        $('#' + DivForRightHandleValueID).html( TextBeforRightHandleValue + ui.values[1] + TextUnits ).css( {left : bias} );
      }
    }
  })
};
function fSimpleSlider
(
 MinSliderValue,
 MaxSliderValue,
 SliderStep,
 SliderDivID,
 DivForHandleValueID,
 TextBeforHandleValue,
 TextAfterHandleValue,
 InputForHandleValueID
)
{
  jQuery('#' + SliderDivID).slider
  ({
    min: MinSliderValue,
    max: MaxSliderValue,
    value: MinSliderValue,
    step: SliderStep,
    range: false,
    create: function( event, ui )
   {
     var biasL = $(ui.handle).css('left');
     $('#' + DivForHandleValueID).html( TextBeforHandleValue + MinSliderValue + TextAfterHandleValue ).css( {left : biasL} );
     $('#' + InputForHandleValueID).attr('value', MinSliderValue);

   },
   change: function( event, ui )
   {
     //????????? ??????? ???? ?????, ??? ??? ????? ???????? ?????? ? ??????? ?????
     $('#' + InputForHandleValueID).attr( 'value', ui.value );
   },
   slide: function( event, ui )
   {
     //???????? ???????? ? ??????? ??? ?? ????????
     var biasL = $(ui.handle).css('left');
     $('#' + DivForHandleValueID).html( TextBeforHandleValue + ui.value + TextAfterHandleValue ).css( {left : biasL} );
   }
  });
};
