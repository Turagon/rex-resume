const Education = require('../models').Education

const educationController = {
  getEducations: async (req, res) => {
    try {
      const educations = await Education.findAll({ raw: true })
      const user = req.user.toJSON()
      return res.json({ educations, user })
    }
    catch { err => console.log(err) }
  },

  editEducation: async (req, res) => {
    const eduId = Number(req.params.id)
    const eduData = req.body
    const { name, from, to, degree, location, language } = eduData
    try {
      if (!name || !from || !to || !degree || !location || !language) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      const educationRecord = await Education.findByPk(eduId)
      if (educationRecord) {
        education = await educationRecord.update(eduData)
        if (education) {
          return res.json({ status: 'success', message: 'education record updated', education })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
      return res.json({ status: 'error', message: 'there is no such record' })
    }
    catch { err => console.log(err) }
  }, 

  addEducation: async (req, res) => {
    const eduData = req.body
    const { name, from, to, degree, location, language } = eduData
    try {
      if (!name || !from || !to || !degree || !location || !language) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      const education = await Education.create(eduData)
      if (education) {
        return res.json({ status: 'success', message: 'education record created', education })
      }
      return res.json({ status: 'error', message: 'server operation failed' })
    }
    catch { err => console.log(err) }
  },

  deleteEducation: async (req, res) => {
    const eduId = Number(req.params.id)
    try {
      let education = await Education.findByPk(eduId)
      if (education) {
        education = await education.destroy()
        if (education) {
          return res.json({ status: 'success', message: 'education record deleted', education })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = educationController