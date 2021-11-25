const router = require('express').Router()
const multer = require('multer')
const upload = multer({ dest: 'temp/' })
const certificateController = require('../../controllers/certificateController')

router.get('/', certificateController.getCertificates)

router.put('/:id', upload.single('image'), certificateController.editCertificate)

router.post('/', upload.single('image'), certificateController.addCertificate)

router.delete('/:id', certificateController.deleteCertificate)

module.exports = router