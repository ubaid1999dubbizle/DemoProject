const db = require('../util/database');


const ReplyThread = db.replythreads;
const comment = db.comments
const User = db.users;

// Create Reply Thread
const addReplyThread = async (req, res) => {
    try {
        let replyThreadInfo = {
            commentId: req.body.commentId,
            userId: req.body.userId,
            content: req.body.content
        };
        const user = await User.findByPk(replyThreadInfo.userId);
        const Comment = await comment.findByPk(replyThreadInfo.commentId);
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }
        if(!Comment){
            return res.status(404).json({ error: 'User not found.' });
        }

        const replyThread = await ReplyThread.create(replyThreadInfo);
        res.status(200).send(replyThread);
    } catch (error) {
        console.error('Error adding reply thread:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid reply thread data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Get all reply threads
const getReplyThreads = async (req, res) => {
    try {
        let replyThreads = await ReplyThread.findAll();
        res.status(200).send(replyThreads);
    } catch (error) {
        console.error('Error fetching reply threads:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single reply thread
const getOneReplyThread = async (req, res) => {
    try {
        let commentId = req.params.commentId;
        let userId = req.params.userId;

        let replyThread = await ReplyThread.findOne({ where: { commentId, userId : commentId , userId } });
        res.status(200).send(replyThread);
    } catch (error) {
        console.error('Error fetching reply thread:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update reply thread
const updateReplyThread = async (req, res) => {
    try {
        let commentId = req.params.commentId;
        let userId = req.params.userId;

        const replyThread = await ReplyThread.update(req.body, { where: { commentId, userId : commentId , userId } });
        res.status(200).send(replyThread);
    } catch (error) {
        console.error('Error updating reply thread:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid reply thread data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Delete reply thread
const deleteReplyThread = async (req, res) => {
    try {
        let commentId = req.params.commentId;
        let userId = req.params.userId;

        await ReplyThread.destroy({ where: { commentId, userId : commentId , userId } });
        res.status(200).send('Reply thread deleted');
    } catch (error) {
        console.error('Error deleting reply thread:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addReplyThread,
    getReplyThreads,
    getOneReplyThread,
    updateReplyThread,
    deleteReplyThread
};
