
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
var index=require('./server/routes/index.js')
var fetchContent=require('./server/routes/fetchContent.js')

app.use(express.static(__dirname+'/public'));
app.set('views',__dirname+'/public/views')
app.set('view engine','jade');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',index);
app.post('/fetchContent',fetchContent);

app.listen(3030);
