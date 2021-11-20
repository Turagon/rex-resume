const router = require('express').Router()
const endUserController = require('../controllers/endUserController')

router.get('/person', endUserController.getPersonInfo)
router.get('/skill', endUserController.getSkills)

module.exports = router