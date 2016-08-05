
scale=1;
posX=0;
totalProblems=0;
timer=0

function calculateScale()
{
  width=window.innerWidth;
  width=9*(width/10);
  maxTime=360;
  scale=maxTime/width;
  offset=(window.innerWidth)/20;
}

function convertTime(t)
{
  if(t<0)
  {
    t=0;
  }
  if(t>360)
  {
    t=360;
  }
  hours=parseInt(t/60);
  minutes=parseInt(t%60);
  if(hours<=0)
  {
    return minutes+" minutes ";
  }
  if(minutes<=0)
  {
    return hours+" hours";
  }
  return hours+" hours and "+minutes+" minutes ";
}

function calculateTime(t)
{
  if(t<0||t>360)
  {
    t=360;
  }
  hours=parseInt(t/60);
  minutes=parseInt(t%60);
  return hours+':'+minutes+':0';
}


window.onresize=function(){
  calculateScale();
  timer=(posX-offset+20)*scale;
  time=convertTime(timer);
  $('.timeValue').text(time);
}

$('.problemIncrement').on('click',function(){
  if(totalProblems<10)
  {
    x=$(this);
    y=$(x.siblings()[1])
    y=$(y);
    y.text(String.valueOf()(parseInt($(y).text())+1));
    totalProblems++;
    if($('.timeValue').text()!="0 minutes ")
    {
      $('.disabled').removeClass('disabled');
    }
  }
  else {
    $('.errorMessage').css('display','initial');
  }
});

$('.problemDecrement').on('click',function(){
  x=$(this);
  y=$(x.siblings()[1])
  y=$(y);
  if(y.text()!="0")
  {
    y.text(String.valueOf()(parseInt($(y).text())-1));
    $('.errorMessage').css('display','none');
    totalProblems--;
  }
  if(y.text()=="0") {
    $('.startButton').addClass('disabled');
  }
});

$('.startButton').on('click',function(){
  if(!$(this).hasClass('disabled')){
    $('.mainDiv').slideUp(600,function(){
      $('.confirmLogin').slideDown(600);
    });
  }
});

$('.beginContest').on('click',function(){
  username=$('.usernameInput').val();
  easyCount=parseInt($('.easyVal').text());
  mediumCount=parseInt($('.mediumVal').text());
  hardCount=parseInt($('.hardVal').text());
  data={
    username:username,
    problems:[easyCount,mediumCount,hardCount],
    timer:calculateTime((posX-offset+20)*scale)
  }
  $.ajax({
        url:'/fetchContent',
        method:'POST',
        data:data,
        success:function(result){
          window.location='/contest';
        }
      });
});

$('document').ready(function(){
  var sliderHeld=-1;
  calculateScale();
  time=convertTime(0);
  $('.timeValue').text(time);
  $('.timerHandle').on('mousedown',function(){
    sliderHeld=1;
  });
  $('.dragArea').on('mousemove',function(e){
    if(sliderHeld==1)
    {
      posX=e.clientX;
      timer=((posX-offset+20)*scale);
      time=convertTime(timer);
      $('.timeValue').text(time);
      $('.timerSlide').css({'left':posX+'px'});
      if(totalProblems>0)
      {
        $('.disabled').removeClass('disabled');
      }
    }
  });
  $('body').on('mouseup',function(){
    sliderHeld=-1;
  });
  window.onblur=function(){
    sliderHeld=-1;
  }
});
