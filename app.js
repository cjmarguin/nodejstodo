var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const fetch = require('node-fetch');

var img = '';
var year = '';
var title = '';
var total = 2220;

app.get("/", function(req, res) {
    fetchComic(null);
    res.render("index", { img: img, year: year, title: title, showButton: false});
});

app.get('/getRandom', function(req, res){
  var rand = Math.floor((Math.random() * total) + 1);
  fetchComic(rand);
  res.render("index", { img: img, year: year, title: title, showButton: true});
});

app.get('/updateRandom', function(req, res){
  var rand = Math.floor((Math.random() * total) + 1);
  fetchComic(rand);
  res.render("comicFrame", { img: img, year: year, title: title, showButton: true});
});

function fetchComic(rand) {
  var url;
  var current = false;
  if(rand){
    url = 'http://xkcd.com/' + rand + '/info.0.json';
  }else{
    current = true;
    url = 'http://xkcd.com/info.0.json'
  }
  fetch(url)
    .then(res => res.json())
    .then(data => {
    img = data.img;
    title = data.title;
    year = data.year;
    if(current){
      total = data.num;
    }
    }).catch(err => {
      res.redirect('/error');
    });
}

http.createServer(app).listen(port, function(){
   console.log('example app' + port);
});
