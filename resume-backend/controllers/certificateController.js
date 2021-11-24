const Certificate = require('../models').Certificate
const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const certificateController = {
  getCertificates: async (req, res) => {
    try {
      const certificates = await Certificate.findAll({ raw: true })
      return res.json({ certificates })
    }
    catch { err => console.log(err) }
  },

  editCertificate: (req, res) => {
    const certificateId = Number(req.params.id)
    const certificateData = req.body
    const file = req.file
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID)
      imgur.upload(file.path, async (err, img) => {
        certificateData.image = img.data.link
        Certificate.findByPk(certificateId)
          .then(certificate => {
            return certificate.update({ ...certificateData })
          })
          .then(certificate => {
            return res.json({ status: 'success', message: 'certificate updated', certificate })
          })
          .catch(err => res.json({ status: 'error', message: 'server error' }))
      })
    } else {
      Certificate.findByPk(certificateId)
        .then(certificate => {
          return certificate.update({ ...certificateData })
        })
        .then(certificate => {
          return res.json({ status: 'success', message: 'certificate updated', certificate })
        })
        .catch(err => res.json({ status: 'error', message: 'server error' }))
    }
  },

  addCertificate: async (req, res) => {
    const certificateData = req.body
    const file = req.file
    try {
      if (file) {
        imgur.setClientID(IMGUR_CLIENT_ID)
        imgur.upload(file.path, async (err, img) => {
          certificateData.image = img.data.link
          const certificate = await Certificate.create({ ...certificateData })
          if (certificate) {
            return res.json({ status: 'success', message: 'certificate created', certificate })
          }
          return res.json({ status: 'error', message: 'server error' })
        })
      } else {
        const certificate = await Certificate.create({ ...certificateData })
        if (certificate) {
          return res.json({ status: 'success', message: 'certificate created', certificate })
        }
        return res.json({ status: 'error', message: 'server error' })
      }
    }
    catch { err => console.log(err) }
  },

  deleteCertificate: async (req, res) => {
    const certificateId = Number(req.params.id)
    try {
      let certificate = await Certificate.findByPk(certificateId)
      if (certificate) {
        certificate = await certificate.destroy()
        if (certificate) {
          return res.json({ status: 'success', message: 'certificate deleted', certificate })
        }
        return res.json({ status: 'error', message: 'server operation error' })
      }
      return res.json({ status: 'error', message: 'Can not find in records' })
    }
    catch { err => console.log(err) }
  }
}

module.exports = certificateController