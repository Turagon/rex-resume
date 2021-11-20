import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MyNavLink from '../../NavLinks'
import UserCoverLetter from './UserCoverLetter'
import UserResume from './UserResume'
import UserPortfolio from './UserPortfolio'
import UserCertificate from './UserCertificate'
import './userContent.css'

export default class UserContent extends Component {
  render() {
    return (
      <div className="user-content">
        <div className="user-links">
          <MyNavLink to='/user/coverletter'>Cover Letter</MyNavLink>
          <MyNavLink to='/user/resume'>Resume</MyNavLink>
          <MyNavLink to='/user/portfolio'>Portfolio</MyNavLink>
          <MyNavLink to='/user/certificate'>Certificates</MyNavLink>
        </div>
        <div>
          <Switch>
            <Route path="/user/coverletter" component={UserCoverLetter} />
            <Route path="/user/resume" component={UserResume} />
            <Route path="/user/portfolio" component={UserPortfolio} />
            <Route path="/user/certificate" component={UserCertificate} />
            <Redirect to="/user/coverletter" />
          </Switch>
        </div>
      </div>
    )
  }
}
