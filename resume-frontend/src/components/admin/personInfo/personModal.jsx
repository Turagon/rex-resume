import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class PersonModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }


  handleAvatar (e) {
    const { files } = e.target
    if (files.length === 0) {
      return store.dispatch({ type: 'editImage', data: '' })
    }
    const imageURL = window.URL.createObjectURL(files[0])
    store.dispatch({ type: 'editImage', data: imageURL })
  }

  handlePersonSubmit = e => {
    e.preventDefault()
    const { id, name, birthday, address, phone, email, language } = store.getState().personReducer
    const { handleError, updatePersonInfos } = this.props

    if (!name || !birthday || !address || !phone || !email || !language) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    const form = e.target
    const formData = new FormData(form)

    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/person/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.person
          this.props.onClose()
          return updatePersonInfos('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/person`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.person
          this.props.onClose()
          return updatePersonInfos('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { name, image, birthday, address, phone, email, language  } = store.getState().personReducer

    if (!open) return null

    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="personModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={this.handlePersonSubmit} encType="multipart/form-data" className="userInfo-form">
            <div className="img-input">
              <label htmlFor="input-image"><i className="fas fa-camera"></i></label>
              <img src={image} alt="" />
              <input type="file" name="image" id="input-image" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={ this.handleAvatar } />
            </div>
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" name="name" id="input-name" value={name} onChange={e => store.dispatch({ type: 'editPersonName', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-birthday">Date of Birth</label>
              <input type="date" name="birthday" id="input-birthday" value={birthday} onChange={e => store.dispatch({ type: 'editBirthday', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-address">Address</label>
              <input type="text" name="address" id="input-address" value={address} onChange={e => store.dispatch({ type: 'editAddress', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-phone">Phone No.</label>
              <input type="text" name="phone" id="input-phone" value={phone} onChange={e => store.dispatch({ type: 'editPhone', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-email">Email</label>
              <input type="text" name="email" id="input-email" value={email} onChange={e => store.dispatch({ type: 'editEmail', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" name="language" id="input-language" value={language} onChange={e => store.dispatch({ type: 'editLanguage', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}
