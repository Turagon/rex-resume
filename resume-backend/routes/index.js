const user = require('./user')
const work = require('./work')
const login = require('./login')
const education = require('./education')
const person = require('./person')
const skill = require('./skill')
const { ensureAuthenticated } = require('../config/helps')

module.exports = (app) => {
  app.use('/user', ensureAuthenticated, user)
  app.use('/work', ensureAuthenticated, work)
  app.use('/education', ensureAuthenticated, education)
  app.use('/person', ensureAuthenticated, person)
  app.use('/skill', ensureAuthenticated, skill)
  app.use('/', login)
}