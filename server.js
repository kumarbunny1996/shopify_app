const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//initializing app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//db connection
const db = process.env.DB_URL_CONNECTION;
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('db is connected'))
    .catch((e) => console.log(e));
mongoose.connection;

//including the static file to server
app.use(express.static(__dirname));
app.use(express.static('public'));

app.post('/api/register', (req, res) => {
    //let { name, mobile, email, password, confirmPassword } = req.body;
    let data = req.body;
    res.json(data);
});

//connection to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('server is running at ' + port));