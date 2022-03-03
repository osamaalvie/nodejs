const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')

//Home Page
router.get('/', homeController.blog_index);

//New Blog Create
router.post('/blogs', homeController.blog_create_post);

//New Blog Page
router.get('/blogs/create', homeController.blog_create_get);

//Blog detail
router.get('/blogs/:id', homeController.blog_details);

//Blog Delete
router.delete('/blogs/:id', homeController.blog_delete);


//Blog about
router.get('/about',  homeController.about);




module.exports = router;
