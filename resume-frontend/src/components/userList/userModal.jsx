import axios from 'axios';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';


export default class UserModal extends Component {
  state = {
    id: '',
    name: '',
    role: '',
    isActive: '',
    password: '',
    checkPassword: '',
    language: '',
    errorMessage: '',
    displayStatus: true
  }

  handleSubmit = e => {
    e.preventDefault()
    const { id, name, role, isActive, password, checkPassword, language } = this.state
    const { handleError, addUser } = this.props
    if (!name || !role || !language) {
      return this.setState({errorMessage: "there's column missed, please check", displayStatus: false})
    }
    if (!password || (password !== checkPassword)) {
      return this.setState({errorMessage: "password inputs are not matched", displayStatus: false})
    }
    if (!addUser) {
      const token = localStorage.getItem('token')
      axios({
        method: 'put',
        url: `http://localhost:3001/user/${id}`,
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
        this.props.onClose()
        return window.location.reload(true)
      })
      .catch(err => console.log(err))
    } else {
      const token = localStorage.getItem('token')
      axios({
        method: 'post',
        url: `http://localhost:3001/user`,
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
          this.props.onClose()
          return window.location.reload(true)
        })
        .catch(err => console.log(err))
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { userInfo } = props
    if (userInfo.id && (userInfo.id !== state.id)) {
      return ({ ...userInfo })
    } else {
      return ({
        id: '',
        name: '',
        role: '',
        isActive: '',
        password: '',
        checkPassword: '',
        language: ''
       })
    }
  }

  handleSelect = () => {
    const value = this.Select.value === 'true'
    this.setState({ isActive: value })
  }

  handleRoleSelect = () => {
    const { value } = this.roleSelect
    this.setState({ role: value })
  }
  
  render() {
    const { onClose, open } = this.props
    const { name, password, checkPassword, language, errorMessage, displayStatus } = this.state
    console.log("🚀 ~ file: userModal.jsx ~ line 104 ~ UserModal ~ render ~ this.state", this.state)
    
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
          {/* <form onSubmit={ this.handleSubmit } method={ addUser? "post": "put" } className="userInfo-form"> */}
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" id="input-name" value={ name } onChange={e => this.setState({ name: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-role">Role</label>
              <select ref={e => this.roleSelect = e} onBlur={this.handleRoleSelect} id="input-role">
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-isActive">isActive</label>
              <select ref={e => this.Select = e} onBlur={ this.handleSelect } id="input-isActive">
                <option value={ true }>true</option>
                <option value={ false }>false</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-password">Password</label>
              <input type="text" id="input-password" value={password} onChange={e => this.setState({ password: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-checkPassword">Check Password</label>
              <input type="text" id="input-checkPassword" value={checkPassword} onChange={e => this.setState({ checkPassword: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" id="input-language" value={language} onChange={e => this.setState({ language: e.target.value })}/>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}