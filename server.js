
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var index=require('./server/routes/index.js')
var update=require('./server/routes/update.js')
var fetchContent=require('./server/routes/fetchContent.js')
var contest=require('./server/routes/contest.js')

app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/public/views')
app.set('view engine','jade');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',index);
app.get('/update',update);
app.post('/fetchContent',fetchContent);
app.post('/contest',contest)

var port=process.env.PORT||3030;

app.listen(port);
