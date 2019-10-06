const express = require('express');
const app = express();

app.get('/', function (req, res){
  res.send('hello world');
});

app.listen(app.get("port"), function(){
   console.log('example app' + app.get("port"));
});