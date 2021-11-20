import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class PortfolioModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }


  handleImage(e) {
    const { files } = e.target
    if (files.length === 0) {
      return store.dispatch({ type: 'editPortfolioImage', data: '' })
    }
    const imageURL = window.URL.createObjectURL(files[0])
    store.dispatch({ type: 'editPortfolioImage', data: imageURL })
  }

  handlePortfolioSubmit = e => {
    e.preventDefault()
    const { id, name, image, github, heroku, description, language } = store.getState().portfolioReducer
    const { handleError, updatePortfolios } = this.props

    if (!name || !image || !github || !heroku || !description || !language) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    const form = e.target
    const formData = new FormData(form)

    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/portfolio/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.portfolio
          this.props.onClose()
          return updatePortfolios('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/portfolio`,
        headers: { Authorization: `Bearer ${token}` },
        data: formData
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.portfolio
          this.props.onClose()
          return updatePortfolios('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { name, image, github, heroku, description, language } = store.getState().portfolioReducer

    if (!open) return null

    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="portfolioModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={this.handlePortfolioSubmit} encType="multipart/form-data" className="userInfo-form">
            <div className="img-input">
              <label htmlFor="input-image"><i className="fas fa-camera"></i></label>
              <img src={image} alt="" />
              <input type="file" name="image" id="input-image" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={this.handleImage} />
            </div>
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" name="name" id="input-name" value={name} onChange={e => store.dispatch({ type: 'editPortfolioName', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-github">Github</label>
              <input type="text" name="github" id="input-github" value={github} onChange={e => store.dispatch({ type: 'editGithub', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-heroku">Heroku</label>
              <input type="text" name="heroku" id="input-heroku" value={heroku} onChange={e => store.dispatch({ type: 'editHeroku', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-description">Description</label>
              <textarea type="text" name="description" id="input-description" value={description} onChange={e => store.dispatch({ type: 'editPortfolioDescription', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" name="language" id="input-language" value={language} onChange={e => store.dispatch({ type: 'editPortfolioLanguage', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}
