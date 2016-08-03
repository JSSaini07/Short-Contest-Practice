
var express=require('express');

var router = express.Router();
router.post('/fetchContent',function(req,res){
  problems=req.body.problems;
  timer=req.body.timer;
  res.end('/');
});

module.exports=router;
