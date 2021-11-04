const passport = require('./passport')

const ensureAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    req.user = user
    if (err) {
      return res.json({ status: 'error', message: 'Oops! something wrong, please try again.' })
    }
    if (user) {
      return next()
    } else {
      return res.json({ status: 'error', message: 'Authentication denied' })
    }
  })(req, res, next)
}

module.exports = { ensureAuthenticated }