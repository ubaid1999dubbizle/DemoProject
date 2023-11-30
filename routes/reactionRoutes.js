const reactionController = require('../controllers/reactionController.js');

const router = require('express').Router();

router.post('/addreaction', reactionController.addReaction);

router.get('/getAllReaction', reactionController.getReactions);

//dynamic routers comes after specific ones

router.get('/:id', reactionController.getOneReaction);

router.put('/:id', reactionController.updateReaction);

router.delete('/:id', reactionController.deleteReaction);


module.exports = router 