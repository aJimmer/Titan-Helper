var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

// APP CONFIGURATION -------------------------------
// use body-parser to grab information from post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization ');
	next();
});

// log all requests to the console

app.use(morgan('dev'));

// connect to database
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// API Routes ------------------------
var apiRoutes = require('./app/routes/api')(app, express);
var buildingApi = require('./app/routes/buildingApi')(app, express);

app.use('/api', apiRoutes);
app.use('/building-api', buildingApi);

// set up our one route to the index.html file
app.get('*', function(req,res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// Start the server
app.listen(config.port);
console.log('Listening on port: ' + config.port);

