'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var name;
var arr;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req,res){
  var html = fs.readFileSync('./index.html').toString();
  res.send(html);
 });


app.post('/tasks', function(req, res) {
  fs.readFile('./tasks.json', function(err, data) {
    if(err) return res.status(400).send(err);
    var arr = JSON.parse(data);
    var description = req.body.description;
    var date = req.body.date;
    var descAndDate = {
    	description : description,
    	date : date
    }
    arr.push(descAndDate);
    fs.writeFile('./names.json', JSON.stringify(arr), function(err) {
      if(err) return res.status(400).send(err);
      res.send(arr);
    });
  });
});

app.listen(4000, function(){
  console.log('express server listenin on 4000');
});