
var express=require('express');
var request=require('request');
var cheerio=require('cheerio');

var router = express.Router();

router.post('/routine',function(req,res){
  console.log('called routine');
  req.session.data.completed={
    easy:[],
    medium:[],
    hard:[]
  }
  username=req.session.data.username;
  profileUrl='https://www.codechef.com/recent/user?page=undefined&user_handle='+username;
  request({
    url: profileUrl,
    method: "GET",
  },function(error,response,body) {
    err=0;
    try{
      body=JSON.parse(body);
    }catch(e){err=1;}
    if(err==0){
      content=body.content;
      $ = cheerio.load(content);
      n=$('tr').length
      problems=[req.session.data.easy,req.session.data.medium,req.session.data.hard];
      for(k=0;k<3;k++)
      {
          problemArray=problems[k];
          completed=[];
          for(j=0;j<problems[k].length;j++)
          {
            problemName=problemArray[j];
            problemName=problemName.name;
            console.log('checking '+problemName);
            solved=0;
            for(i=0;i<n;i++)
              {
                str=$($('tr')[i]).html();
                if(str.indexOf(problemName)>0&&str.indexOf('tick-icon.gif')>0){
                  solved=1;
                  break;
                }
              }
            if(solved==1)
            {
              completed.push(problemName);
            }
        }
        if(k==0)
        {
          req.session.data.completed.easy=completed;
        }
        else
        if(k==1){
          req.session.data.completed.medium=completed;
        }
        else
        if(k==2){
          req.session.data.completed.hard=completed;
        }
      }
      console.log(JSON.stringify(req.session.data.completed));
      easyCompleted=req.session.data.completed.easy.length;
      mediumCompleted=req.session.data.completed.medium.length;
      hardCompleted=req.session.data.completed.hard.length;
      easyTotal=req.session.data.easy.length;
      mediumTotal=req.session.data.medium.length;
      hardTotal=req.session.data.hard.length;
      totalCompleted=String.valueOf()(easyCompleted+mediumCompleted+hardCompleted);
      total=String.valueOf()(easyTotal+mediumTotal+hardTotal);
      score=(totalCompleted+'/'+total);
      res.end(score);
      }
    else {
      easyCompleted=req.session.data.completed.easy.length;
      mediumCompleted=req.session.data.completed.medium.length;
      hardCompleted=req.session.data.completed.hard.length;
      easyTotal=req.session.data.easy.length;
      mediumTotal=req.session.data.medium.length;
      hardTotal=req.session.data.hard.length;
      totalCompleted=String.valueOf()(easyCompleted+mediumCompleted+hardCompleted);
      total=String.valueOf()(easyTotal+mediumTotal+hardTotal);
      score=(totalCompleted+'/'+total);
      res.end(score);
  }
  });
});

module.exports=router;
