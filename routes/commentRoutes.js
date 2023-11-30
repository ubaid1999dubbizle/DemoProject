const CommentController = require('../controllers/commentController');

const router = require('express').Router();

router.post('/addComment', CommentController.addComment);

router.get('/getAllComments', CommentController.getComments);

//dynamic routers comes after specific ones

router.get('/:id', CommentController.getOneComment);

router.put('/:id', CommentController.updateComment);

router.delete('/:id', CommentController.deleteComment);


module.exports = router 