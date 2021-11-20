const router = require('express').Router()
const letterController = require('../../controllers/letterController')

router.get('/', letterController.getLetters)

router.put('/:id', letterController.editLetter)

router.post('/', letterController.addLetter)

router.delete('/:id', letterController.deleteLetter)

module.exports = router