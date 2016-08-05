
var express=require('express');
var router = express.Router();
router.post('/endTest',function(req,res){
  req.session.data=undefined;
  console.log(JSON.stringify(req.session));
  res.end();
});

module.exports=router;
