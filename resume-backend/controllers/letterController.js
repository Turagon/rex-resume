const CoverLetter = require('../models').CoverLetter

const letterController = {
  getLetters: async (req, res) => {
    try {
      const letters = await CoverLetter.findAll({ raw: true })
      const user = req.user.toJSON()
      return res.json({ letters, user })
    }
    catch { err => console.log(err) }
  },

  editLetter: async (req, res) => {
    const letterId = Number(req.params.id)
    const letterData = req.body
    const { username, content, to, attention, date } = letterData
    try {
      if (!username || !content || !to || !attention || !date) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      let letter = await CoverLetter.findByPk(letterId)
      if (letter) {
        letter = await letter.update({ ...letterData })
        if (letter) {
          return res.json({ status: 'success', message: 'letter updated', letter })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
      return res.json({ status: 'error', message: 'there is no such data' })
    }
    catch { err => console.log(err) }
  },

  addLetter: async (req, res) => {
    const letterData = req.body
    const { username, content, to, attention, date } = letterData
    try {
      if (!username || !content || !to || !attention || !date) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      const letter = await CoverLetter.create({ ...letterData })
      if (letter) {
        return res.json({ status: 'success', message: 'letter added', letter })
      }
      return res.json({ status: 'error', message: 'server operation error' })
    }
    catch { err => console.log(err) }
  },

  deleteLetter: async (req, res) => {
    const letterId = Number(req.params.id)
    try {
      let letter = await CoverLetter.findByPk(letterId)
      if (letter) {
        letter = await letter.destroy()
        if (letter) {
          return res.json({ status: 'success', message: 'letter deleted', letter })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = letterController