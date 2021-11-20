import axios from 'axios'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class WorkModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }


  handleWorkSubmit = e => {
    e.preventDefault()
    const { id, company, jobTitle, from, to, description, location, language } = store.getState().workReducer
    const { handleError, updateWorks } = this.props
    if (!company || !jobTitle || !from || !to || !description || !location || !language) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL }/work/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          company: company,
          jobTitle: jobTitle,
          from: from,
          to: to,
          description: description,
          location: location,
          language: language
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.work
          this.props.onClose()
          return updateWorks('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL }/work`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          company: company,
          jobTitle: jobTitle,
          from: from,
          to: to,
          description: description,
          location: location,
          language: language
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.work
          this.props.onClose()
          return updateWorks('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { company, jobTitle, from, to, description, location, language } = store.getState().workReducer

    if (!open) return null

    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="workModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={this.handleWorkSubmit} className="userInfo-form">
            <div>
              <label htmlFor="input-company">Company</label>
              <input type="text" id="input-company" value={company} onChange={e => store.dispatch({ type: 'editCompany', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-title">Job Title</label>
              <input type="text" id="input-title" value={jobTitle} onChange={e => store.dispatch({ type: 'editTitle', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-from">From</label>
              <input type="date" id="input-from" value={from} onChange={e => store.dispatch({ type: 'editFrom', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-to">To</label>
              <input type="date" id="input-to" value={to} onChange={e => store.dispatch({ type: 'editTo', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-description">Description</label>
              <textarea type="text" id="input-description" value={description} onChange={e => store.dispatch({ type: 'editDescription', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-location">Location</label>
              <input type="text" id="input-location" value={location} onChange={e => store.dispatch({ type: 'editLocation', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" id="input-language" value={language || ''} onChange={e => store.dispatch({ type: 'editLanguage', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}