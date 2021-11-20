import axios from 'axios';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class SkillModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }


  handleSkillSubmit = e => {
    e.preventDefault()
    const { id, category, name } = store.getState().skillReducer
    const { handleError, updateSkills } = this.props
    if (!category || !name) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/skill/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          category,
          name
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.skill
          this.props.onClose()
          return updateSkills('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/skill`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          category,
          name
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.skill
          this.props.onClose()
          return updateSkills('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { category, name } = store.getState().skillReducer

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
          <form onSubmit={this.handleSkillSubmit} className="userInfo-form">
            <div>
              <label htmlFor="input-category">Category</label>
              <select name="category" value={category} onChange={e => store.dispatch({ type: 'editCategory', data: e.target.value })} id="input-category">
                <option value=""></option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="language">Language</option>
                <option value="database">Database</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" id="input-name" value={name} onChange={e => store.dispatch({ type: 'editSkillName', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}