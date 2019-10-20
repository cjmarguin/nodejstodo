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
const Todo = require('./models/todo.model');

const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://testConnection:Gecko784@nodetodoexample-iqnde.mongodb.net/test?retryWrites=true&w=majority';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var task = [];
var complete = ["finish jquery"];



app.get("/", function(req, res) {
    Todo.find({"done": false}, function(err, todo) {
      if (err) {
        console.log(err);
      }else{
        task = [];
        for(i = 0; i < todo.length ; i++){
            task.push(todo[i].item);
        }
        res.render("index", { task: task, complete: complete});
      }
    });
});

app.post('/addtask', function (req, res) {
    let todo = new Todo(
      {
          item: req.body.newtask,
          done: false
      }
    );
    todo.save(function (err) {
      if (err) {
          console.log(err);
      }
      res.redirect("/");
    })
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
     complete.push(completeTask);
      task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
      for (var i = 0; i < completeTask.length; i++) {     
        complete.push(completeTask[i]);
        task.splice(task.indexOf(completeTask[i]), 1);
      }
    }
   return res.redirect("/");
});

http.createServer(app).listen(port, function(){
   console.log('example app' + port);
});
