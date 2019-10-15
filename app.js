const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.arguments(express.static('public'));

app.get('/', function (req, res){
  res.render('index', {image : 'this is it', err: 'this is error'});
});

app.post('/', function(req, res){
  res.render('index', {image : 'this is it', err: 'this is error'});
});

app.listen(port, function(){
   console.log('example app' + port);
});
