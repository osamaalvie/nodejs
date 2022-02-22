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




//Middlewares
//static files
app.use(express.static('public'));
//request body
app.use(express.urlencoded({ extended: true }));
//logging
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

    res.redirect('/blogs');
});

app.get('/blogs', (req, res) => {

    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        }).catch((err) => {
            console.log(err);
        });

});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result) => {
        res.redirect('/blogs');
    })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then((result) => {
        res.render('details', { title: 'Blog Details', blog: result });
    }).catch((err) => {
        console.log(err);
    });

});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Blog' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create Blog' });
});

//middleware
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});