
var express=require('express');
var request=require('request');
var router = express.Router();
router.get('/contest',function(req,res){
  body=req.session.data;
  if(body==undefined)
  {
    res.redirect('/');
  }
  else {
    res.render('contest',{data:{'username':body.username,'easy':body.easy,'medium':body.medium,'hard':body.hard,'timer':body.timer}});
  }
});

module.exports=router;
