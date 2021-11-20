const { ensureAuthenticated } = require('../config/helps')
const login = require('./login')
const admin = require('./admin')
const user = require('./user')

module.exports = (app) => {
  app.use('/admin', ensureAuthenticated, admin)
  app.use('/user', ensureAuthenticated, user)
  app.use('/', login)
}