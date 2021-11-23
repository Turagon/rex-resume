const passport = require('./passport')

const ensureAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    req.user = user
    if (err) {
      return res.json({ status: 'error', message: 'Please try again.' })
    }
    if (user) {
      return next()
    } else {
      return res.json({ status: 'error', message: 'Authentication failed' })
    }
  })(req, res, next)
}

const roleVerify = (req, res, next) => {
  const role = req.user.dataValues.role
  if (role !== 'admin') {
    return res.json({ status: 'error', message: 'Authorization denied' })
  }

  return next()
}

module.exports = { ensureAuthenticated, roleVerify }