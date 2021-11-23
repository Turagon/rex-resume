const Person = require('../models').Person
const Skill = require('../models').Skill
const CoverLetter = require('../models').CoverLetter
const Work = require('../models').Work
const Education = require('../models').Education

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
  },

  getCoverLetter: async (req, res) => {
    const username = req.user.name
    try {
      const coverLetter = await CoverLetter.findOne({ where: { username } })
      return res.json({ coverLetter })
    }
    catch { err => console.log(err) }
  },

  getWorks: async (req, res) => {
    try {
      const works = await Work.findAll()
      return res.json({ works })
    }
    catch { err => console.log(err) }
  },

  getEducations: async (req, res) => {
    try {
      const educations = await Education.findAll()
      return res.json({ educations })
    }
    catch { err => console.log(err) }
  }
}

module.exports = endUserController