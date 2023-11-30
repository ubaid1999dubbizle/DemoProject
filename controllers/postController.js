const db = require('../util/database');
const Post = db.posts;
const User = db.users;

// Create Post
const addPost = async (req, res) => {
    try {
        let postInfo = {
            id: req.body.id,
            userId: req.body.userId,
            content: req.body.content
        };
        const user = await User.findByPk(postInfo.userId);
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }
        const post = await Post.create(postInfo);
        res.status(200).send(post);
    } catch (error) {
        console.error('Error adding post:', error);

        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Invalid post data. Please check the provided information.' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

//get all Posts

const getPosts = async (req,res) => {

    let post = await Post.findAll({
    });
    res.status(200).send(post)
}

//get single Post

const getOnePost = async (req, res) => {
    
    let id = req.params.id
    let post = await Post.findOne({where: { id : id }})
    res.status(200).send(post)
}

//update Post
const updatePost = async (req, res) => {
  
    try {
    let id = req.params.id

    const post = await Post.update(req.body, { where: { id : id } }) 

    res.status(200).send(post)
    } catch (error) {
      console.error('Error adding Post:', error);
    
        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({ error: 'Invalid Post data. Please check the provided information.' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}


//delete Post

const deletePost = async (req, res) => {
    
    let id = req.params.id
    
    await Post.destroy({ where: {id : id }})

    res.status(200).send('Post deleted')
}


module.exports = {
    addPost,
    getPosts,
    getOnePost,
    updatePost,
    deletePost
};
