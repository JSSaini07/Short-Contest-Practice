
var express=require('express');
var router = express.Router();
router.get('/',function(req,res){
  if(req.session.data!=undefined){
    res.render('contest');
  }
  else {
    res.render('index');
  }
});

module.exports=router;
