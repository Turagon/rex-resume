import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class CertificateModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }


  handleImage(e) {
    const { files } = e.target
    if (files.length === 0) {
      return store.dispatch({ type: 'editCertificateImage', data: '' })
    }
    const imageURL = window.URL.createObjectURL(files[0])
    store.dispatch({ type: 'editCertificateImage', data: imageURL })
  }

  handleCertificateSubmit = e => {
    e.preventDefault()
    const { id, name, image, institution, date } = store.getState().certificateReducer
    const { handleError, updateCertificates } = this.props

    if (!name || !image || !institution || !date) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    const form = e.target
    const formData = new FormData(form)

    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/certificate/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.certificate
          this.props.onClose()
          return updateCertificates('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/certificate`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.certificate
          this.props.onClose()
          return updateCertificates('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { name, image, institution, date } = store.getState().certificateReducer

    if (!open) return null

    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="certificateModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={this.handleCertificateSubmit} encType="multipart/form-data" className="userInfo-form">
            <div className="img-input">
              <label htmlFor="input-image"><i className="fas fa-camera"></i></label>
              <img src={image} alt="" />
              <input type="file" name="image" id="input-image" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={this.handleImage} />
            </div>
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" name="name" id="input-name" value={name} onChange={e => store.dispatch({ type: 'editCertificateName', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-institution">Institution</label>
              <input type="text" name="institution" id="input-institution" value={institution} onChange={e => store.dispatch({ type: 'editInstitution', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-date">Date</label>
              <input type="date" name="date" id="input-date" value={date} onChange={e => store.dispatch({ type: 'editDate', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}
