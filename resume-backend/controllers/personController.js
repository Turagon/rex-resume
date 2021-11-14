const Person = require('../models').Person
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const personController = {
  getPersons: async (req, res) => {
    try {
      const personInfos = await Person.findAll({ raw: true })
      const user = req.user.toJSON()
      return res.json({ personInfos, user })
    }
    catch { err => console.log(err) }
  },

  editPerson: (req, res) => {
    const personId = Number(req.params.id)
    const personData = req.body
    const file = req.file
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        personData.image = img.data.link
        Person.findByPk(personId)
          .then(person => {
            return person.update({ ...personData })
          })
          .then(person => {
            return res.json({ status: 'success', message: 'personInfo updated', person })
          })
          .catch(err => res.json({ status: 'error', message: 'server error' }))
      })
    } else {
      Person.findByPk(personId)
        .then(person => {
          return person.update({ ...personData })
        })
        .then(person => {
          return res.json({ status: 'success', message: 'personInfo updated', person })
        })
        .catch(err => res.json({ status: 'error', message: 'server error' }))
    }
  },

  addPerson: async (req, res) => {
    const personData = req.body
    const file = req.file
    try {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, async (err, img) => {
          personData.image = img.data.link
          const person = await Person.create({ ...personData })
          if (person) {
            return res.json({ status: 'success', message: 'personInfo created', person })
          }
          return res.json({ status: 'error', message: 'server error' })
        })
      } else {
        const person = await Person.create({ ...personData })
        if (person) {
          return res.json({ status: 'success', message: 'personInfo created', person })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
    }
    catch { err => console.log(err) }
  },

  deletePerson: async (req, res) => {
    const personId = Number(req.params.id)
    try {
      let person = await Person.findByPk(personId)
      if (person) {
        person = await person.destroy()
        if (person) {
          return res.json({ status: 'success', message: 'personInfo deleted', person })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = personController