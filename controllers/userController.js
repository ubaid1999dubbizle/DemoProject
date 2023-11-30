const db = require('../util/database');

const User = db.users;


//create User
const addUser = async (req, res) => {
    try {
      let info = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        dob: req.body.dob,
        organizationId: req.body.organizationId
      };
  
      const user = await User.create(info);
      res.status(200).send(user);
    } catch (error) {
      console.error('Error adding user:', error);
  
      // Check if the error is due to validation or constraint failure
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'Invalid user data. Please check the provided information.' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
  

//get all users

const getUsers = async (req,res) => {

    let users = await User.findAll({
    });
    res.status(200).send(users)
}

//get single user

const getOneUser = async (req, res) => {
    
    let id = req.params.id
    let user = await User.findOne({where: { id : id }})
    res.status(200).send(user)
}

//update user
const updateUser = async (req, res) => {
  
    try {
    let id = req.params.id

    const user = await User.update(req.body, { where: { id : id } }) 

    res.status(200).send(user)
    } catch (error) {
      console.error('Error adding user:', error);
    
        // Check if the error is due to validation or constraint failure
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
          res.status(400).json({ error: 'Invalid user data. Please check the provided information.' });
        } else {
          res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

//delete user

const deleteuser = async (req, res) => {
    
    let id = req.params.id
    
    await User.destroy({ where: {id : id }})

    res.status(200).send('User deleted')
}

module.exports = {
    addUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteuser
}