Person = require('../models').Person
const Skill = require('../models').Skill

const endUserController = {
  getPersonInfo: async (req, res) => {
    try {
      let personInfo = ''
      if (req.headers['accept-language'].slice(0, 2) === 'en') {
        personInfo = await Person.findOne({ where: { language: 'English' } })
      } else {
        personInfo = await Person.findOne({ where: { language: 'Chinese' } })
      }
      return res.json({ personInfo })
    }
    catch { err => console.log(err) }
  },

  getSkills: async (req, res) => {
    try {
      const skills = await Skill.findAll({ raw: true, nest:true, plain: false, order: ['category'] })
      return res.json({ skills })
    }
    catch { err => console.log(err) }
  }
}

module.exports = endUserController