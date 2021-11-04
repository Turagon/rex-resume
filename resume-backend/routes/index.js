const admin = require('./admin')
const user = require('./user')
const login = require('./login')
const { ensureAuthenticated } = require('../config/helps')

module.exports = (app) => {
  app.use('/admin', ensureAuthenticated, admin)
  app.use('/user', ensureAuthenticated, user)
  app.use('/', login)
}