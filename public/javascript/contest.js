
$('document').ready(function(){
  pass=0;
  if($($('.easyLeft')).children().length<=3)
  {
    $('.easy').addClass('disabled');
    pass=1;
  }
  else {
      $('.easy').addClass('active');
      $($('.easyLeft').children()[3]).addClass('selected');
      $('.mainContent').html($($('.easyLeft').children()[3]).data('problem'));
      pass=1;
  }
  if($($('.mediumLeft')).children().length<=3)
  {
    $('.medium').addClass('disabled');
  }
  else
  if(pass==1) {
      $('.medium').addClass('active');
      $($('.mediumLeft').children()[3]).addClass('selected');
      $('.easyLeft').css({'display':'none'});
      $('.mediumLeft').css({'display':'inline-block'});
      $('.mainContent').html($($('.mediumLeft').children()[3]).data('problem'));
      pass=0;
  }
  if($($('.hardLeft')).children().length<=3)
  {
    $('.hard').addClass('disabled');
  }
  else
  if(pass==1) {
    $('.hard').addClass('active');
    $($('.hardLeft').children()[3]).addClass('selected');
    $('.easyLeft').css({'display':'none'});
    $('.hardLeft').css({'display':'inline-block'});
    $('.mainContent').html($($('.hardLeft').children()[3]).data('problem'));
  }
  $('.easy').on('click',function(){
    if(!$(this).hasClass('disabled')){
      $('.active').removeClass('active');
      $(this).addClass('active');
      $('.mediumLeft').css({'display':'none'});
      $('.hardLeft').css({'display':'none'});
      $('.easyLeft').css({'display':'inline-block'});
      $($('.easyLeft').children()[3]).addClass('selected');
      $('.mainContent').html($($('.easyLeft').children()[3]).data('problem'));
    }
  });
  $('.medium').on('click',function(){
    if(!$(this).hasClass('disabled')){
      $('.active').removeClass('active');
      $(this).addClass('active');
      $('.easyLeft').css({'display':'none'});
      $('.hardLeft').css({'display':'none'});
      $('.mediumLeft').css({'display':'inline-block'});
      $($('.mediumLeft').children()[3]).addClass('selected');
      $('.mainContent').html($($('.mediumLeft').children()[3]).data('problem'));
    }
  });
  $('.hard').on('click',function(){
    if(!$(this).hasClass('disabled')){
      $('.active').removeClass('active');
      $(this).addClass('active');
      $('.easyLeft').css({'display':'none'});
      $('.mediumLeft').css({'display':'none'});
      $('.hardLeft').css({'display':'inline-block'});
      $($('.hardLeft').children()[3]).addClass('selected');
      $('.mainContent').html($($('.hardLeft').children()[3]).data('problem'));
    }
  });
  $('.problemName').on('click',function(){
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    $('.mainContent').html($(this).data('problem'));
  });
});