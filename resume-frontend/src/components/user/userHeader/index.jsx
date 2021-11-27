import React, { Component } from 'react'
import axios from 'axios'
import MyNavLink from '../../NavLinks'
import store from '../../../redux/store'
import './userHeader.css'

const { userBaseURL } = store.getState().generalReducer

export default class UserHeader extends Component {
  state = { personInfo: ''}

  componentDidMount () {
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(`${userBaseURL}/person`, config)
      .then(response => {
        if (response.data.status === 'error') return
        const { personInfo } = response.data
        this.setState({ personInfo })
      })
      .catch(err => console.log(err))
  }

  handleLogout = () => {
    return localStorage.removeItem('token')
  }

  render() {
    const { name, image, phone, address, email, birthday , language } = this.state.personInfo

    return (
      <div className="user-header">
        <div className="user-avatar">
          <img src={image} alt="" />
        </div>
        <div className="user-info">
          <h2>{name}</h2>
          <div className="user-person-box">
            <div className="user-person-info">
              <span><i className="fas fa-mobile-alt"></i>{phone}</span>
              <span><i className="far fa-envelope"></i>{email}</span>
              <span><i className="far fa-address-card"></i>{address}</span>
              <span style={{ display: language === 'Chinese' ? 'table-cell' : 'none' }}><i className="far fa-calendar-alt"></i>{birthday}</span>
            </div>
            <div className="user-logout">
              <MyNavLink onClick={this.handleLogout} to='/'><i className="fas fa-sign-out-alt"></i></MyNavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
