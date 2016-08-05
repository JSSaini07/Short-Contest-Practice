
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var session = require('express-session');
var index=require('./server/routes/index.js');
var update=require('./server/routes/update.js');
var fetchContent=require('./server/routes/fetchContent.js');
var contest=require('./server/routes/contest.js');
var routine=require('./server/routes/routine.js');
var endTest=require('./server/routes/endTest.js');

app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/public/views')
app.set('view engine','jade');
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 36000000 }}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',index);
app.get('/update',update);
app.get('/contest',contest)
app.post('/fetchContent',fetchContent);
app.post('/routine',routine);
app.post('/endTest',endTest);

var port=process.env.PORT||3030;

app.listen(port);
