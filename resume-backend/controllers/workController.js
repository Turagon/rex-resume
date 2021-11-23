const Work = require('../models').Work

const workController = {
  getWorks: async (req, res) => {
    try {
      const works = await Work.findAll({ raw: true })
      return res.json({ works })
    }
    catch { err => console.log(err) }
  },

  editWork: async (req, res) => {
    const workId = Number(req.params.id)
    const workData = req.body
    const { company, jobTitle, from, to, description, location } = workData
    try {
      if (!company || !jobTitle || !from || !to || !description || !location) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      let work = await Work.findByPk(workId)
      if (work) {
        work = await work.update({ ...workData })
        if (work) {
          return res.json({ status: 'success', message: 'work updated', work })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
      return res.json({ status: 'error', message: 'there is no such data' })
    }
    catch { err => console.log(err) }
  },

  addWork: async (req, res) => {
    const workData = req.body
    const { company, jobTitle, from, to, description, location } = workData
    try {
      if (!company || !jobTitle || !from || !to || !description || !location) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      const work = await Work.create({ ...workData })
      if (work) {
        return res.json({ status: 'success', message: 'work added', work })
      }
      return res.json({ status: 'error', message: 'server operation error' })
    }
    catch{ err => console.log(err) }
  },

  deleteWork: async (req, res) => {
    const workId = Number(req.params.id)
    try {
      let work = await Work.findByPk(workId)
      if (work) {
        work = await work.destroy()
        if (work) {
          return res.json({ status: 'success', message: 'work deleted', work })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = workController 