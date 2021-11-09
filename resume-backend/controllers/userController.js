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

  },

  addUser: async (req, res) => {

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