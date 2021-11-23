import React, { Component } from 'react'
import axios from 'axios'
import './login.css'
import store from '../../redux/store'

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    nameWarning: false,
    passwordWarning: false,
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
        store.dispatch({ type: 'editError', data: response.data.message })
        store.dispatch({ type: 'editDisplay', data: false })
        return
      }

      const token = response.data.token
      const { name, type } = response.data.user
      store.dispatch({type: 'editGeneralUsername', data: name})
      localStorage.setItem('token', token)
      
      if (type === 'user') {
        return this.props.history.push('/user') 
      } else if (type === 'admin') {
        this.resetError()
        return this.props.history.push('/admin') 
      }
    })
    .catch(err => console.log(err))
  } 

  resetError = () => {
    store.dispatch({ type: 'editError', data: '' })
    store.dispatch({ type: 'editDisplay', data: true })
    return 
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
    const { nameWarning, passwordWarning } = this.state
    const { error, display } = store.getState().generalReducer
    return (
      <div className="login">
        <h3>Thank you for visiting my resume</h3>
        <div style={{ display: display ? 'none' : 'block' }} className="login-warning">
          <span>{error}</span>
          <button onClick={this.resetError}>X</button>
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
