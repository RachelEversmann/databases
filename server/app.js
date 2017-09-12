var express = require('express');
var db = require('./db');
var cors = require('cors');
// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);

app.use(cors())

// app.use("/*", function(req, res, next){
//   console.log('getting options request');
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   res.send(200);
// });
// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());

// Set up our routes
app.use('/classes', router);



// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}
