const userController = require('../controllers/userController.js');

const router = require('express').Router();

router.post('/addUser', userController.addUser);

router.get('/getAllUsers', userController.getUsers);

//dynamic routers comes after specific ones

router.get('/:id', userController.getOneUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteuser);


module.exports = router 