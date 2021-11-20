import React, { Component } from 'react'
import UserHeader from '../../components/user/userHeader'
import UserSkills from '../../components/user/userSkills'
import UserContent from '../../components/user/userContent'
import './user.css'
// import axios from 'axios'
// import store from '../../redux/store'

export default class User extends Component {
  // state = {
  //   token: ''
  // }
  
  render() {

    return (
      <div className="user-page">
        <UserHeader/>
        <div className="user-container">
          <UserSkills/>
          <UserContent/>
        </div>
      </div>
    )
  }
}