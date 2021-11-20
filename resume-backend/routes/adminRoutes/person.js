const router = require('express').Router()
const personController = require('../../controllers/personController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/', personController.getPersons)

router.put('/:id', upload.single('image'), personController.editPerson)

router.post('/', upload.single('image'), personController.addPerson)

router.delete('/:id', personController.deletePerson)

module.exports = router