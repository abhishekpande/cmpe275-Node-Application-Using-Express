var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var pub = __dirname + '/public';

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(pub));

// Routes

// Homepage (Login)
var home = require('./routes/index');
app.get('/', home.get);
app.post('/', home.post);

// Registration
var register = require('./routes/register');
app.get('/register', register.get);
app.post('/register', register.post);

// Post
var adPost = require('./routes/post_ad');
app.get('/adPost', adPost.get);
app.post('/adPost', adPost.post);

// Search
var search = require('./routes/search');
app.get('/search', search.get);
app.post('/search', search.post);

// Result
var result = require('./routes/result');
app.get('/result', result.get);

// Manage Ad
var adManage = require('./routes/adManage');
app.get('/adManage', adManage.get);

// Update Ad
var updateAd = require('./routes/updateAd');
app.get('/updateAd', updateAd.get);
app.post('/updateAd', updateAd.post);
app.get('/delete', updateAd.deleteAd);

// Delete Ad
//var deleteAd = require('./routes/deleteAd');


app.listen(3000);

module.exports = app;
