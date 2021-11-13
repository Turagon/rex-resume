const user = require('./user')
const work = require('./work')
const login = require('./login')
const education = require('./education')
const { ensureAuthenticated } = require('../config/helps')

module.exports = (app) => {
  app.use('/user', ensureAuthenticated, user)
  app.use('/work', ensureAuthenticated, work)
  app.use('/education', ensureAuthenticated, education)
  app.use('/', login)
}