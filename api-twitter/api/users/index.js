const router = require('express').Router();
const userController = require('./user.controller');

//GET que busque usuario
router.get('/:userName',userController.getUser);

//POST que añade usuarios
router.post('/', userController.postUsers);

//DELETE que borra un usuario por su userName
router.delete('/:userName', userController.deleteUser);

//POST que modifica el email o el name del usuario
router.patch('/:userName', userController.userPatch);

module.exports = router;
