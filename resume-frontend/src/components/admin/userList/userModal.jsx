import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class UserModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }

  handleSubmit = e => {
    e.preventDefault()
    const { id, name, role, isActive, password, checkPassword, language } = store.getState().userReducer
    const { handleError, updateUsers } = this.props
    if (!name || !role || !language) {
      return this.setState({errorMessage: "there's column missed, please check", displayStatus: false})
    }
    if (!password || (password !== checkPassword)) {
      return this.setState({errorMessage: "password inputs are not matched", displayStatus: false})
    }
    const token = localStorage.getItem('token')
    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/user/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: name,
          role: role,
          isActive: isActive,
          password: password,
          checkPassword: checkPassword,
          language: language
        }
      })
      .then(response => {
        if (response.data.status === 'error') {
          const error = response.data.message
          this.props.onClose()
          return handleError(error)
        }
        const data = response.data.user
        this.props.onClose()
        return updateUsers('edit', data)
      })
      .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/user`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          name: name,
          role: role,
          isActive: isActive,
          password: password,
          checkPassword: checkPassword,
          language: language
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.user
          this.props.onClose()
          return updateUsers('add', data)
        })
        .catch(err => console.log(err))
    }
  }
  
  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { name, password, checkPassword, language } = store.getState().userReducer
    
    if (!open) return null
    
    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{ errorMessage }</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="userModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={ this.handleSubmit } className="userInfo-form">
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" id="input-name" value={ name } onChange={e => store.dispatch({ type: 'editUsername', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-role">Role</label>
              <select onBlur={e => store.dispatch({ type: 'editRole', data: e.target.value })} id="input-role">
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-isActive">isActive</label>
              <select onBlur={e => store.dispatch({ type: 'editIsActive', data: e.target.value })} id="input-isActive">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-password">Password</label>
              <input type="text" id="input-password" value={password} onChange={e => store.dispatch({ type: 'editPassword', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-checkPassword">Check Password</label>
              <input type="text" id="input-checkPassword" value={checkPassword} onChange={e => store.dispatch({ type: 'editCheckPassword', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" id="input-language" value={language} onChange={e => store.dispatch({ type: 'editUserLanguage', data: e.target.value })}/>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}