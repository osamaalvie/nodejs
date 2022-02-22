const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


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




//logging
app.use(express.static('public'));

app.use(morgan('dev'));


//routes

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'nodejs',
        snippet: 'about nodejs',
        body: 'details will be shared later'
    });

    blog.save().then((result) => {
        res.send(result);
    })
        .catch((err) => {
            console.log(err);
        });

});


app.get('/', (req, res) => {
    let blogs = [];
    Blog.find().then((result) => {
        console.log(result);
        blogs = result;
    }).catch((err) => {
        console.log(err);
    });

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/about-me', (req, res) => {
    res.render('about', { title: 'About' });
});

//middleware
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});