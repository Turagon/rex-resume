const Portfolio = require('../models').Portfolio
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const portfolioController = {
  getPortfolios: async (req, res) => {
    try {
      const portfolios = await Portfolio.findAll({ raw: true })
      const user = req.user.toJSON()
      return res.json({ portfolios, user })
    }
    catch { err => console.log(err) }
  },

  editPortfolio: (req, res) => {
    const portfolioId = Number(req.params.id)
    const portfolioData = req.body
    const file = req.file
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        portfolioData.image = img.data.link
        Portfolio.findByPk(portfolioId)
          .then(portfolio => {
            return portfolio.update({ ...portfolioData })
          })
          .then(portfolio => {
            return res.json({ status: 'success', message: 'portfolio updated', portfolio })
          })
          .catch(err => res.json({ status: 'error', message: 'server error' }))
      })
    } else {
      Portfolio.findByPk(portfolioId)
        .then(portfolio => {
          return portfolio.update({ ...portfolioData })
        })
        .then(portfolio => {
          return res.json({ status: 'success', message: 'portfolio updated', portfolio })
        })
        .catch(err => res.json({ status: 'error', message: 'server error' }))
    }
  },

  addPortfolio: async (req, res) => {
    const portfolioData = req.body
    const file = req.file
    try {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, async (err, img) => {
          portfolioData.image = img.data.link
          const portfolio = await Portfolio.create({ ...portfolioData })
          if (portfolio) {
            return res.json({ status: 'success', message: 'portfolio created', portfolio })
          }
          return res.json({ status: 'error', message: 'server error' })
        })
      } else {
        const portfolio = await Portfolio.create({ ...portfolioData })
        if (portfolio) {
          return res.json({ status: 'success', message: 'portfolio created', portfolio })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
    }
    catch { err => console.log(err) }
  },

  deletePortfolio: async (req, res) => {
    const portfolioId = Number(req.params.id)
    try {
      let portfolio = await Portfolio.findByPk(portfolioId)
      if (portfolio) {
        portfolio = await portfolio.destroy()
        if (portfolio) {
          return res.json({ status: 'success', message: 'portfolio deleted', portfolio })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = portfolioController