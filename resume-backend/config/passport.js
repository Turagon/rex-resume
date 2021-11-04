const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwtStrategy = passportJWT.Strategy
const extractJWT = passportJWT.ExtractJwt
const TOKEN_SECRET = process.env.TOKEN_SECRET
const User = require('../models').User

const options = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: TOKEN_SECRET
}

passport.use('jwt', new jwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.id)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  }
  catch (error) {
    console.log(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {raw: true})
    if (user) return done(null, user)
    return done(null, false)
  }
  catch{err => console.log(err)}
});

module.exports = passport