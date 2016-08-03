
var express=require('express');
var cheerio=require('cheerio');
var request=require('request');
var fs=require('fs');

var router = express.Router();
router.get('/update',function(req,res){
  easy=[];
  medium=[];
  hard=[];
  fillArray('https://www.codechef.com/problems/easy',easy,'easy');
  fillArray('https://www.codechef.com/problems/medium',medium,'medium');
  fillArray('https://www.codechef.com/problems/hard',hard,'hard');
  res.end('Problem List Updated!');
});

function fillArray(link,problemsArray,fileName) {
  request({
    url: link,
    method: "GET",
  },function(error,response,body) {
    $ = cheerio.load(body);
    prob=$('.problemname');
    for(i=0;i<prob.length;i++)
    {
      problem=$(prob[i]).html();
      problem=problem.split('<a href="/problems/')[1];
      problem=problem.split('">');
      problemname=problem[0];
      problemsArray.push(problemname);
    }
    checkNewProblems(problemsArray,fileName);
  });
}

function checkNewProblems(problemsArray,fileName) {
  fs.readFile('./public/problemsList/'+fileName+'.txt',function(err,data){
    data=data.toString();
    checkNow(problemsArray,data,fileName);
  });
}

function checkNow(problemsArray,data,fileName) {
  for(i=0;i<problemsArray.length;i++)
  {
    if(data.indexOf(problemsArray[i])==-1)
    {
      fs.appendFile('./public/problemsList/'+fileName+'.txt',problemsArray[i]+',',function(){});
    }
  }
}
module.exports=router;
