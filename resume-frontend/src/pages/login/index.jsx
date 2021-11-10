import React, { Component } from 'react'
import axios from 'axios'
import './login.css'

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    nameWarning: false,
    passwordWarning: false,
    displayStatus: true,
    loginWarning: ''
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, password } = this.state
    if (!name) {
      return this.setState({ nameWarning: true })
    }

    if (!password) {
      return this.setState({ passwordWarning: true })
    }

    axios.post('http://localhost:3001', {name, password})
    .then(response => {
      if (response.data.status === 'error') {
        return this.setState({ loginWarning: response.data.message, displayStatus: false})
      }

      const token = response.data.token
      localStorage.setItem('token', token)
      
      if (response.data.user.type === 'user') {
        return this.props.history.push('/user') 
      } else if (response.data.user.type === 'admin') {
        return this.props.history.push('/admin/user') 
      }
    })
    .catch(err => console.log(err))
  } 

  handleNameChange = e => {
    const name = e.target.value
    this.setState({ name })
  }

  handlePasswordChange = e => {
    const password = e.target.value
    this.setState({ password })
  }

  render() {
    const { nameWarning, passwordWarning, loginWarning, displayStatus } = this.state

    return (
      <div className="login">
        <h3>Thank you for visiting my resume</h3>
        <div style={{ display: displayStatus ? 'none' : 'block' }} className="login-warning">
          <span>{loginWarning}</span>
          <button onClick={() => this.setState({displayStatus: true})}>X</button>
        </div>
        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="input-name-box">
            <label htmlFor="input-name"><i className="far fa-user"></i>Name</label>
            <input onChange={ this.handleNameChange } onFocus={() => this.setState({nameWarning: false})} type="text" maxLength="40" id="input-name" name="name" placeholder="case sensitive"/>
            <span style={{ display: nameWarning ? 'block' : 'none' }}>name can't be empty</span>
          </div>

          <div className="input-password-box">
            <label htmlFor="input-password"><i className="fas fa-key"></i>Password</label>
            <input onChange={this.handlePasswordChange} onFocus={() => this.setState({ passwordWarning: false })} type="text" maxLength="40" id="input-password" name="password" placeholder="case sensitive"/>
            <span style={{ display: passwordWarning ? 'block' : 'none' }}>password can't be empty</span>
          </div>

          <button type="submit" className="signin-btn">Submit</button>
        </form>
      </div>
    )
  }
}
