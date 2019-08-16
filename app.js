const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    env = require('./environment')


;
app.use(cors());


//Mongo Connection

mongoose.connect(process.env.MongoUrl || env.env.MongoUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes
app.post('/fetchImages', (req, res) => {
    res.send(`${req.body.searchText}`);
});

// start page for API
app.get('/*', (req, res) => {
    res.sendFile('./fetchImages.html', {root: __dirname});
});


module.exports = app;
