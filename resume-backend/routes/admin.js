const router = require('express').Router()
const user = require('./adminRoutes/user')
const work = require('./adminRoutes/work')
const education = require('./adminRoutes/education')
const person = require('./adminRoutes/person')
const skill = require('./adminRoutes/skill')
const letter = require('./adminRoutes/letter')
const portfolio = require('./adminRoutes/portfolio')
const { roleVerify } = require('../config/helps')

router.use('/user', roleVerify, user)
router.use('/work', roleVerify, work)
router.use('/education', roleVerify, education)
router.use('/person', roleVerify, person)
router.use('/skill', roleVerify, skill)
router.use('/letter', roleVerify, letter)
router.use('/portfolio', roleVerify, portfolio)

module.exports = router