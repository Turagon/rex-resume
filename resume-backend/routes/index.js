const user = require('./user')
const work = require('./work')
const login = require('./login')
const { ensureAuthenticated } = require('../config/helps')

module.exports = (app) => {
  app.use('/user', ensureAuthenticated, user)
  app.use('/work', ensureAuthenticated, work)
  app.use('/', login)
}