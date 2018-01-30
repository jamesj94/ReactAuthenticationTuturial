//Main starting point of the application.
const express    = require('express');
const http       = require('http');
//bodyParser and morgan are express middleware
//bodyParser parses incoming requests -> specifically json
const bodyParser = require('body-parser');
//morgan is a logging framework.
const morgan     = require('morgan');

const app = express();

//App setup
//Getting express to talk to the world
//*use* registers packages as middleware.
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));


//Server Setup
const port = process.envPORT || 3090;

//create an http server that knows
//how to receive requests. We will add
//functionality to app.
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
