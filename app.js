const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/web');


//initialize express
const app = express();

//connect to mongo db
const conString = 'mongodb://localhost:27017/db_blogs?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(conString).then((result) => {
    console.log(result.Collection);
    //staring server
    app.listen(3000);
})
    .catch((err) => {
        console.log(err);
    });
//setting view engine
app.set('view engine', 'ejs');




//Middlewares
//static files
app.use(express.static('public'));
//request body
app.use(express.urlencoded({ extended: true }));
//logging
app.use(morgan('dev'));


//routes
app.use(routes);

//middleware
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});