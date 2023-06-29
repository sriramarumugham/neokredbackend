const express = require('express');

const PORT = 8080;
var cors = require('cors')

const app = express();

var bodyParser = require('body-parser')
const db = require("./config/mongoose");
db();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log('trouble starting express app');
        return;
    }
    console.log(`express app listning on port:${PORT}`)
})