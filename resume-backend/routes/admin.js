const router = require('express').Router()
const user = require('./adminRoutes/user')
const work = require('./adminRoutes/work')
const education = require('./adminRoutes/education')
const person = require('./adminRoutes/person')
const skill = require('./adminRoutes/skill')
const letter = require('./adminRoutes/letter')
const portfolio = require('./adminRoutes/portfolio')

router.use('/user', user)
router.use('/work', work)
router.use('/education', education)
router.use('/person', person)
router.use('/skill', skill)
router.use('/letter', letter)
router.use('/portfolio', portfolio)

module.exports = router