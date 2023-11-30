const db = require('../util/database');
const Comment = db.comments
const Post = db.posts;
const User = db.users;


// Create Comment
const addComment = async (req, res) => {
    try {
        let commentInfo = {
            id: req.body.id,
            commentorID: req.body.commentorID,
            postId: req.body.postId,
            content: req.body.content
        };

        const user = await User.findByPk(commentInfo.commentorID);
        if(!user){
            return res.status(404).json({ error: 'Commentor not found.' });
        }

        const post = await Post.findByPk(commentInfo.postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found.' });
        }

        const comment = await Comment.create(commentInfo);
        res.status(200).send(comment);
    } catch (error) {
        console.error('Error adding comment:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid comment data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Get all comments
const getComments = async (req, res) => {
    try {
        let comments = await Comment.findAll();
        res.status(200).send(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a single comment
const getOneComment = async (req, res) => {
    try {
        let id = req.params.id;
        let comment = await Comment.findOne({ where: { id: id } });
        res.status(200).send(comment);
    } catch (error) {
        console.error('Error fetching comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update comment
const updateComment = async (req, res) => {
    try {
        let id = req.params.id;

        const comment = await Comment.update(req.body, { where: { id: id } });
        res.status(200).send(comment);
    } catch (error) {
        console.error('Error updating comment:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid comment data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Delete comment
const deleteComment = async (req, res) => {
    try {
        let id = req.params.id;
        await Comment.destroy({ where: { id: id } });
        res.status(200).send('Comment deleted');
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addComment,
    getComments,
    getOneComment,
    updateComment,
    deleteComment
};
