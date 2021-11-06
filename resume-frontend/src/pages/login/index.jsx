import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    nameWarning: false,
    passwordWarning: false,
    loginStatus: true,
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
        return this.setState({ loginWarning: response.data.message, loginStatus: false})
      }

      const token = response.data.token
      localStorage.setItem('token', token)
      
      if (response.data.user.type === 'user') {
        return this.props.history.push('/user') 
      } else if (response.data.user.type === 'admin') {
        return this.props.history.push('/admin') 
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
    const { nameWarning, passwordWarning, loginWarning, loginStatus } = this.state

    return (
      <div className="login">
        <h5>Thank you for visiting my resume</h5>
        <div style={{ display: loginStatus ? 'none' : 'block' }}>
          <span>{loginWarning}</span>
          <button onClick={() => this.setState({loginStatus: true})}>X</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="#input-name">Name</label>
          <input onChange={ this.handleNameChange } onFocus={() => this.setState({nameWarning: false})} type="text" maxLength="40" id="input-name" name="name"/>
          <span style={{ display: nameWarning ? 'block' : 'none' }}>name can't be empty</span>

          <label htmlFor="#input-password">Password</label>
          <input onChange={this.handlePasswordChange} onFocus={() => this.setState({ passwordWarning: false })} type="text" maxLength="40" id="input-password" name="password"/>
          <span style={{ display: passwordWarning ? 'block' : 'none' }}>password can't be empty</span>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}