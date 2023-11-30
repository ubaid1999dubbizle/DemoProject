const PostController = require('../controllers/postController');

const router = require('express').Router();

router.post('/addPost', PostController.addPost);

router.get('/getAllPost', PostController.getPosts);

//dynamic routers comes after specific ones

router.get('/:id', PostController.getOnePost);

router.put('/:id', PostController.updatePost);

router.delete('/:id', PostController.deletePost);


module.exports = router 