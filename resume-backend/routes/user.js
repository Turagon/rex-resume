const router = require('express').Router()
const endUserController = require('../controllers/endUserController')

router.get('/person', endUserController.getPersonInfo)

router.get('/skill', endUserController.getSkills)

router.get('/letter', endUserController.getCoverLetter)

router.get('/work', endUserController.getWorks)

router.get('/education', endUserController.getEducations)

module.exports = router