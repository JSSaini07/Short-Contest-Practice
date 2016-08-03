
var express=require('express');
var router = express.Router();
router.post('/contest',function(req,res){
  body=req.body.data;
  body=JSON.parse(body);
  res.render('contest',{data:{'easy':body.easy,'medium':body.medium,'hard':body.hard,'timer':body.timer}});
});

module.exports=router;
