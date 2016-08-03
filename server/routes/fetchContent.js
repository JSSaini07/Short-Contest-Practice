
var express=require('express');
var request=require('request');
var fs=require('fs');

var router = express.Router();
router.post('/fetchContent',function(req,res){
  problems=req.body.problems;
  timer=req.body.timer;
  easyProblems=[];
  mediumProblems=[];
  hardProblems=[];
  fetchProblems(problems[0],'easy',easyProblems);
  fetchProblems(problems[1],'medium',mediumProblems);
  fetchProblems(problems[2],'hard',hardProblems);
  flag=-1;
  interval=setInterval(function(){
    if(easyProblems.length==problems[0]&&mediumProblems.length==problems[1]&&hardProblems.length==problems[2])
    {
      sendResponse(res,easyProblems,mediumProblems,hardProblems);
      clearInterval(interval);
    }
  },1000);
});

function sendResponse(res,easyProblems,mediumProblems,hardProblems) {
  data={
    easy:easyProblems,
    medium:mediumProblems,
    hard:hardProblems,
    timer:timer
  };
  res.end(JSON.stringify(data));
}

function fetchProblems(count,fileName,problemsArray) {
  fs.readFile('./public/problemsList/'+fileName+'.txt',function(err,data){
    data=data.toString();
    data=data.split(',');
    for(i=0;i<count;i++)
    {
      problemNumber=parseInt((Math.random()*10000)%(data.length-1));
      problem=data[problemNumber];
      request({
        url: 'https://www.codechef.com/api/contests/PRACTICE/problems/'+problem,
        method: "GET",
      },function(error,response,body) {
        problemObject=JSON.parse(body);
        name=problemObject.problem_code;
        content=problemObject.body;
        problemsArray.push({'name':name,'content':content});
      });
    }
  });
}


module.exports=router;
