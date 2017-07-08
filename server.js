//server.js

//==================================--BASE SETUP--============================
//LOAD PACKAGES-------------------------------
var express = require ('express'); //EXPRESS Package
var app = express();	//define our app using express
var bodyParser = require('body-parser');// get body-parser
var morgan = require('morgan'); //use to see requests
var mongoose = require('mongoose') //for working with mongoDB
var config = require('./config'); //get config file
var path = require('path');
var jwt = require('jsonwebtoken');


app.use(morgan('dev')); //HTTP logger

//==================================--APP--====================================
var superSecret = config.secret;
// APP CONFIGURATION------------------------------------------
// use body parser to grab information from POST
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// configure app to handle CORS requests
app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Orgin','*');
	res.setHeader('Access-Control-Allow-Method','GET,POST');
	res.setHeader('Access-Control-Allow-Headers','X-Request-With,content-type,\Authorization');
	next();
});

//==================================--DB--====================================
mongoose.connect('mongodb://localhost:27017/mydb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('MONGO: successfully connected to db');
});

// set static files location
// used for requests that frontend will make
app.use(express.static(__dirname + '/public'));

//=========================--ROUTES/API--====================================
//API ROUTES 
var apiRoutes = require(__dirname + '/server/routes/api')(app,express);
//REGISTER ROUTES----------------------------------------
app.use('/api',apiRoutes); //all /api routes

// MAIN CATCHALL ROUTE-----------------------------------------------------
// has to be registered after API ROUTES

// set up our one route to the index.html file
// route for the home page
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(config.port);
console.log("Magic happens on port" + config.port);
