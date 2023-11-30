const db = require('../util/database');
const Reaction = db.reactions;
const User = db.users;
const Post = db.posts;

// Create Reaction
const addReaction = async (req, res) => {
    try {
        let reactionInfo = {
            postId: req.body.postId,
            userId: req.body.userId,
            reaction: req.body.reaction
        };

        const user = await User.findByPk(reactionInfo.userId);
        const post = await Post.findByPk(reactionInfo.postId);

        if (!user || !post) {
            return res.status(404).json({ error: 'User or post not found.' });
        }
        
        const reaction = await Reaction.create(reactionInfo);
        res.status(200).send(reaction);
    } catch (error) {
        console.error('Error adding reaction:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid reaction data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Get all reactions
const getReactions = async (req, res) => {
    try {
        let reactions = await Reaction.findAll();
        res.status(200).send(reactions);
    } catch (error) {
        console.error('Error fetching reactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single reaction
const getOneReaction = async (req, res) => {
    try {
        let postId = req.params.postId;
        let userId = req.params.userId;

        let reaction = await Reaction.findOne({ where: { postId, userId : postId , userId} });
        res.status(200).send(reaction);
    } catch (error) {
        console.error('Error fetching reaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update reaction
const updateReaction = async (req, res) => {
    try {
        let postId = req.params.postId;
        let userId = req.params.userId;

        const reaction = await Reaction.update(req.body, { where: { postId, userId : postId , userId } });
        res.status(200).send(reaction);
    } catch (error) {
        console.error('Error updating reaction:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid reaction data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Delete reaction
const deleteReaction = async (req, res) => {
    try {
        let postId = req.params.postId;
        let userId = req.params.userId;

        await Reaction.destroy({ where: { postId, userId : postId , userId } });
        res.status(200).send('Reaction deleted');
    } catch (error) {
        console.error('Error deleting reaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addReaction,
    getReactions,
    getOneReaction,
    updateReaction,
    deleteReaction
};
