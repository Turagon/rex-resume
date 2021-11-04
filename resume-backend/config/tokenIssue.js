const jwt = require('jsonwebtoken')
module.exports = (user) => {
  const TOKEN_KEY = process.env.TOKEN_SECRET
  const payload = {
    id: user.id,
    iat: Date.now()
  }

  const signToken = jwt.sign(payload, TOKEN_KEY)

  return { token: signToken }
}