import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import store from '../../redux/store'
import MyNavLink from '../../components/NavLinks'
import UserList from '../../components/admin/userList'
import WorkExp from '../../components/admin/workExp'
import Education from '../../components/admin/education'
import PersonInfo from '../../components/admin/personInfo'
import Skill from '../../components/admin/skills'
import CoverLetter from '../../components/admin/coverLetter'
import Portfolio from '../../components/admin/portfolios'
import Certificate from '../../components/admin/certificates'
import './admin.css'

export default class Admin extends Component {

  handleLogout = () => {
    localStorage.removeItem('token')
    return this.props.history.push('/')
  }

  render() {
    const { username } = store.getState().generalReducer

    return (
      <div className="admin">
        <header className="admin-header">
          <div className="admin-header-box">
            <span>{username}</span>
            <button onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i></button>
          </div>
        </header>
        <div className="admin-links">
          <MyNavLink to='/admin/user'>User List</MyNavLink>
          <MyNavLink to='/admin/workExp'>Work Exps</MyNavLink>
          <MyNavLink to='/admin/education'>Education</MyNavLink>
          <MyNavLink to='/admin/skill'>Skills</MyNavLink>
          <MyNavLink to='/admin/personInfo'>Personal Info</MyNavLink>
          <MyNavLink to='/admin/portfolio'>Portfolios</MyNavLink>
          <MyNavLink to='/admin/coverletter'>Cover Letter</MyNavLink>
          <MyNavLink to='/admin/certificate'>Certificates</MyNavLink>
        </div>
        <div>
          <Switch>
            <Route path="/admin/user" component={UserList} />
            <Route path="/admin/workExp" component={WorkExp} />
            <Route path="/admin/education" component={Education} />
            <Route path="/admin/skill" component={Skill} />
            <Route path="/admin/personInfo" component={PersonInfo} />
            <Route path="/admin/portfolio" component={Portfolio} />
            <Route path="/admin/coverletter" component={CoverLetter} />
            <Route path="/admin/certificate" component={Certificate} />
            <Redirect to="/admin/user" />
          </Switch>
        </div>
      </div>
    )
  }
}
