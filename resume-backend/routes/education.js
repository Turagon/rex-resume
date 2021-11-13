const router = require('express').Router()
const educationController = require('../controllers/educationController')

router.get('/', educationController.getEducations)

router.put('/:id', educationController.editEducation)

router.post('/', educationController.addEducation)

router.delete('/:id', educationController.deleteEducation)

module.exports = router