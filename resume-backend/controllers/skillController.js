const Skill = require('../models').Skill

const skillController = {
  getSkills: async (req, res) => {
    try {
      const skills = await Skill.findAll({ raw: true })
      return res.json({ skills })
    }
    catch { err => console.log(err) }
  },

  editSkill: async (req, res) => {
    const skillId = Number(req.params.id)
    const skillData = req.body
    const { category, name } = skillData
    try {
      if (!category || !name) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      let skill = await Skill.findByPk(skillId)
      if (skill) {
        skill = await skill.update({ ...skillData })
        if (skill) {
          return res.json({ status: 'success', message: 'skill updated', skill })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
      return res.json({ status: 'error', message: 'there is no such data' })
    }
    catch { err => console.log(err) }
  },

  addSkill: async (req, res) => {
    const skillData = req.body
    const { category, name } = skillData
    try {
      if (!category || !name) {
        return res.json({ status: 'error', message: 'there is column missed' })
      }
      const skill= await Skill.create({ ...skillData })
      if (skill) {
        return res.json({ status: 'success', message: 'skill added', skill })
      }
      return res.json({ status: 'error', message: 'server operation error' })
    }
    catch { err => console.log(err) }
  },

  deleteSkill: async (req, res) => {
    const skillId = Number(req.params.id)
    try {
      let skill = await Skill.findByPk(skillId)
      if (skill) {
        skill = await skill.destroy()
        if (skill) {
          return res.json({ status: 'success', message: 'skill deleted', skill })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = skillController