const User = require('../models').User
const bcrypt = require('bcryptjs')

const userController = {
  getUsers: async (req, res) => {
    try {
      const role = req.user.role
      const user = req.user.toJSON()
      if (role === 'user') {
        const id = req.user.id
        const users = await User.findAll({ where: { id } })
        return res.json({ users, user })
      } else {
        const users = await User.findAll()
        return res.json({ users, user })
      }
    }
    catch{
      err => console.log(err)
    }
  },

  editUser: async (req, res) => {
    const userId = req.params.id
    const userData = req.body
    const { name, password, checkPassword } = userData
    if (!name) {
      return res.json({ status: 'error', message: 'username can not be empty' })
    }
    if (password !== checkPassword) {
      return res.json({ status: 'error', message: 'password inputs are not matched' })
    }
    try {
      const user = await User.findByPk(userId)
      if (user) {
        userData.password = await bcrypt.hash(userData.password, 10)
        const userUpdate = await user.update({ ...userData })
        return res.json({ status: 'success', message: 'user updated', user: userUpdate })
      }
      return res.json({ status: 'error', message: 'user not found' })
    }
    catch { err => console.log(err) }
  },

  addUser: async (req, res) => {
    const userData = req.body
    const { name, password, checkPassword } = userData
    if (!name) {
      return res.json({ status: 'error', message: 'username can not be empty' })
    }
    if (password !== checkPassword) {
      return res.json({ status: 'error', message: 'password inputs are not matched' })
    }
    try {
      const user = await User.findOne({ where: { name } })
      if (user) {
        return res.json({status: 'error', message: 'user already existed'})
      }
      userData.password = await bcrypt.hash(userData.password, 10)
      userData.isActive = userData.isActive === 'true'? true: false
      const newUser = await User.create({ ...userData })
      if (newUser) {
        return res.json({ status: 'success', message: 'user added', user: newUser })
      }
    }
    catch { err => console.log(err) }
  },

  deleteUser: async (req, res) => {
    try {
      const id = Number(req.params.id)
      const user = await User.findByPk(id)
  
      if (user) {
        await user.destroy()
        return res.json({ status: 'success' })
      } else {
        return res.json({ status: 'fail' })
      }
    }
    catch {
      err => console.log(err)
    }
  }
}

module.exports = userController