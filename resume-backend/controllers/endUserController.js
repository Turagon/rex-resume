const Person = require('../models').Person
const Skill = require('../models').Skill
const CoverLetter = require('../models').CoverLetter
const Work = require('../models').Work
const Education = require('../models').Education
const Portfolio = require('../models').Portfolio

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
      let works = ''
      if (req.headers['accept-language'].slice(0, 2) === 'en') {
        works = await Work.findAll({ where: { language: 'English' } })
      } else {
        works = await Work.findAll({ where: { language: 'Chinese' } })
      }
      return res.json({ works })
    }
    catch { err => console.log(err) }
  },

  getEducations: async (req, res) => {
    try {
      let educations = ''
      if (req.headers['accept-language'].slice(0, 2) === 'en') {
        educations = await Education.findAll({ where: { language: 'English' } })
      } else {
        educations = await Education.findAll({ where: { language: 'Chinese' } })
      }
      return res.json({ educations })
    }
    catch { err => console.log(err) }
  },

  getPortfolios: async (req, res) => {
    try {
      let portfolios = ''
      if (req.headers['accept-language'].slice(0, 2) === 'en') {
        portfolios = await Portfolio.findAll({ where: { language: 'English' } })
      } else {
        portfolios = await Portfolio.findAll({ where: { language: 'Chinese' } })
      }
      return res.json({ portfolios })
    }
    catch { err => console.log(err) }
  },

  getCertificates: async (req, res) => {
    
  }
}

module.exports = endUserController