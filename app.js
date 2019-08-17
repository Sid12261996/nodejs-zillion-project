const express = require('express'),
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    env = require('./environment'),
    scraper = require('images-scraper'),
    google = new scraper.Google(),
    imageOperation = require('./save-image-to-mongo')
;
app.use(cors());


//Mongo Connection

mongoose.connect(process.env.MongoUrl || env.env.MongoUrl, {useNewUrlParser: true});
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/public',express.static('public'));
//Routes
app.post('/fetchImages', (req, res) => {
    google.list({
        keyword: req.body.searchText,
        num: 2,
        detail: true,
        nightmare: {
            show: true
        }
    })
        .then(function (result) {

            console.log('first 15 results from google', result);
            const response = [];
            for (let singleImage of result) {
                response.push(imageOperation.SaveImageToDB(singleImage));
            }
            console.log(response);
            res.json(response);
        }).catch(function (err) {
        console.log('error is this', err);
    });

});

app.get('/getImages',(req,res)=>{
    res.sendFile('./public/Views/getAllImages.html' ,{root: __dirname});
});

app.get('/seeAll',(req,res)=>{
    imageOperation.retrieveImage().then(data=>{
        console.log(data[0].contentType);
        res.contentType(data[0].contentType);
        res.send(data[0].imageBinary);
    });

});

// start page for API
app.get('/*', (req, res) => {
    res.sendFile('./public/Views/fetchImages.html', {root: __dirname});
});


module.exports = app;
