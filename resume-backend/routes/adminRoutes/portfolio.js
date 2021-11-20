const router = require('express').Router()
const portfolioController = require('../../controllers/portfolioController')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

router.get('/', portfolioController.getPortfolios)

router.put('/:id', upload.single('image'), portfolioController.editPortfolio)

router.post('/', upload.single('image'), portfolioController.addPortfolio)

router.delete('/:id', portfolioController.deletePortfolio)

module.exports = router