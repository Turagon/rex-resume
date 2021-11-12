const router = require('express').Router()
const workController = require('../controllers/workController')

router.get('/', workController.getWorks)

router.put('/:id', workController.editWork)

router.post('/', workController.addWork)

router.delete('/:id', workController.deleteWork)

module.exports = router