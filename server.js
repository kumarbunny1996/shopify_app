const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//initializing app
const app = express();

//including the static file to server
app.use(express.static(__dirname));
app.use(express.static('public'));


//connection to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server is running at ' + port));