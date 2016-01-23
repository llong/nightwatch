var express = require('express');
var app = express();


app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.get('/', function(req,res){
  res.render('index');
});

app.get('/login', function(req,res){
  res.render('login');
});

app.get('/signup', function(req,res){
  res.render('signup');
});

app.listen(3000);
