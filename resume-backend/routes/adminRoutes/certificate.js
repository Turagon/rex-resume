const router = require('express').Router()
const certificateController = require('../../controllers/certificateController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/', certificateController.getCertificates)

router.put('/:id', upload.single('image'), certificateController.editCertificate)

router.post('/', upload.single('image'), certificateController.addCertificate)

router.delete('/:id', certificateController.deleteCertificate)

module.exports = router