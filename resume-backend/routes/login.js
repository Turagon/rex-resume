const router = require('express').Router()
const loginController = require('../controllers/loginControllers')

router.post('/', loginController.login)

module.exports = router