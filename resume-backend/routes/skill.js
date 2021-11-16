const router = require('express').Router()
const skillController = require('../controllers/skillController')

router.get('/', skillController.getSkills)

router.put('/:id', skillController.editSkill)

router.post('/', skillController.addSkill)

router.delete('/:id', skillController.deleteSkill)

module.exports = router