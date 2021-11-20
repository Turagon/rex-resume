const router = require('express').Router()
const userController = require('../../controllers/userController')

router.get('/', userController.getUsers)

router.put('/:id', userController.editUser)

router.post('/', userController.addUser)

router.delete('/:id', userController.deleteUser)

module.exports = router