const ReplyThreadController = require('../controllers/replythreadController.js');

const router = require('express').Router();

router.post('/addReplyThread', ReplyThreadController.addReplyThread);

router.get('/getAllThreads', ReplyThreadController.getReplyThreads);

//dynamic routers comes after specific ones

router.get('/:commentId/:userId', ReplyThreadController.getOneReplyThread);

router.put('/:commentId/:userId', ReplyThreadController.updateReplyThread);

router.delete('/:commentId/:userId', ReplyThreadController.deleteReplyThread);


module.exports = router;