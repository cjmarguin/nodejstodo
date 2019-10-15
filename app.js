const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const task = ["buy socks", "practise with nodejs"];
const complete = ["finish jquery"];

app.get("/", function(req, res) {
    res.render("index", { task: task});
});

app.post('/addtask', function (req, res) {
    const newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    const completeTask = req.body.check;
    if (typeof completeTask === "string") {
     complete.push(completeTask);
      task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
      for (var i = 0; i < completeTask.length; i++) {     
        complete.push(completeTask[i]);
        task.splice(task.indexOf(completeTask[i]), 1);
      }
    }
   res.redirect("/");
});

app.listen(port, function(){
   console.log('example app' + port);
});
