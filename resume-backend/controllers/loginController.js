const User = require('../models').User
const bcrypt = require('bcryptjs')
const issueJwt = require('../config/tokenIssue')

const loginController = {
  login: async (req, res) => {
    const name = req.body.name
    const inputPassword = req.body.password

    // check request data
    if (!name || !inputPassword) {
      return res.json({ status: 'error', message: "name or password can't be empty" })
    }

    const user = await User.findOne({
      where: { name },
      raw: true
    })

    if (!user) {
      return res.json({ status: 'error', message: 'Username or password incorrect' })
    }

    // check password
    if (!bcrypt.compareSync(inputPassword, user.password)) {
      return res.json({ status: 'error', message: 'Username or password incorrect' })
    }

    // sign token
    const token = issueJwt(user)
    return res.json({
      status: 'success',
      message: 'ok',
      token,
      user: {
        id: user.id,
        name: user.name,
        type: user.role
      }
    })
  }
}

module.exports = loginController