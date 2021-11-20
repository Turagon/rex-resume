import axios from 'axios';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class EducationModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }


  handleEducationSubmit = e => {
    e.preventDefault()
    const { id, name, major, degree, from, to, location, language } = store.getState().educationReducer
    const { handleError, updateEducations } = this.props
    if (!name || !from || !to || !degree || !location || !language) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/education/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: name,
          major: major,
          degree: degree,
          from: from,
          to: to,
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
          const data = response.data.education
          this.props.onClose()
          return updateEducations('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/education`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: name,
          major: major,
          degree: degree,
          from: from,
          to: to,
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
          const data = response.data.education
          this.props.onClose()
          return updateEducations('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { name, major, degree, from, to, location, language } = store.getState().educationReducer

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
          <form onSubmit={this.handleEducationSubmit} className="userInfo-form">
            <div>
              <label htmlFor="input-school">School</label>
              <input type="text" id="input-school" value={name} onChange={e => store.dispatch({ type: 'editSchoolName', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-major">Major</label>
              <input type="text" id="input-major" value={major || ''} onChange={e => store.dispatch({ type: 'editMajor', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-degree">Degree</label>
              <input type="text" id="input-degree" value={degree || ''} onChange={e => store.dispatch({ type: 'editDegree', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-from">From</label>
              <input type="date" id="input-from" value={from} onChange={e => store.dispatch({ type: 'editEducationFrom', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-to">To</label>
              <input type="date" id="input-to" value={to} onChange={e => store.dispatch({ type: 'editEducationTo', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-location">Location</label>
              <input type="text" id="input-location" value={location} onChange={e => store.dispatch({ type: 'editEducationLocation', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" id="input-language" value={language || ''} onChange={e => store.dispatch({ type: 'editEducationLanguage', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}