const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//initializing app
const app = express();
const init = require('./Server/Routes/mainApiRoutes');
init(app);

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

//including the static file to server
app.use(express.static(__dirname));
app.use(express.static('public'));


//connection to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server is running at ' + port));

//db connection
const db = process.env.DB_URL_CONNECTION_PROD;
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('db is connected'))
    .catch((e) => console.log(e));
mongoose.connection;
