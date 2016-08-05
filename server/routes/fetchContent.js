
var express=require('express');
var request=require('request');
var fs=require('fs');

var router = express.Router();
router.post('/fetchContent',function(req,res){
  username=req.body.username;
  problems=req.body.problems;
  timer=req.body.timer;
  easyProblems=[];
  mediumProblems=[];
  hardProblems=[];
  loggedIn=1;
  fetchProblems(problems[0],'easy',easyProblems);
  fetchProblems(problems[1],'medium',mediumProblems);
  fetchProblems(problems[2],'hard',hardProblems);
  interval=setInterval(function(){
    if(easyProblems.length==problems[0]&&mediumProblems.length==problems[1]&&hardProblems.length==problems[2])
    {
      sendResponse(req,res,username,easyProblems,mediumProblems,hardProblems);
      clearInterval(interval);
    }
  },1000);
});

function sendResponse(req,res,username,easyProblems,mediumProblems,hardProblems) {
  data={
    username:username,
    easy:easyProblems,
    medium:mediumProblems,
    hard:hardProblems,
    timer:timer
  };
  req.session.data=data;
  res.end();
}

function fetchProblems(count,fileName,problemsArray) {
  fs.readFile('./public/problemsList/'+fileName+'.txt',function(err,data){
    data=data.toString();
    data=data.split(',');
    i=0;
    while(i<count)
    {
      problemNumber=parseInt((Math.random()*10000)%(data.length-1));
      problem=data[problemNumber];
      request({
        url: 'https://www.codechef.com/api/contests/PRACTICE/problems/'+problem,
        method: "GET",
      },function(error,response,body) {
        err=0;
        try{
          problemObject=JSON.parse(body);
        }catch(e){err=1;i--;console.log('problem');}
        if(err==0){
          name=problemObject.problem_code;
          content=problemObject.body;
          problemsArray.push({'name':name,'content':content});
        }
      });
      i++;
    }
  });
}


module.exports=router;
