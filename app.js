const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', function (req, res){
  res.send('hello world');
});

app.listen(port, function(){
   console.log('example app' + port);
});
