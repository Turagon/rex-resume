import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MyNavLink from '../../components/NavLinks'
import UserList from '../../components/userList'
import WorkExp from '../../components/workExp'
import Education from '../../components/education'
import PersonInfo from '../../components/personInfo'
import Skill from '../../components/skills'
import './admin.css'

export default class Admin extends Component {

  render() {
    return (
      <div className="admin">
        <header className="admin-header">
          <div className="admin-header-box">
            <span>Username</span>
            <MyNavLink to='/user'>User Page</MyNavLink>
            <button><i className="fas fa-sign-out-alt"></i></button>
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
        </div>
        <div>
          <Switch>
            <Route path="/admin/user" component={UserList} />
            <Route path="/admin/workExp" component={WorkExp} />
            <Route path="/admin/education" component={Education} />
            <Route path="/admin/skill" component={Skill} />
            <Route path="/admin/personInfo" component={PersonInfo} />
            {/* <Route path="/admin/portfolio" component={Home} /> */}
            {/* <Route path="/admin/coverletter" component={Home} /> */}
            <Redirect to="/admin/user" />
          </Switch>
        </div>
      </div>
    )
  }
}
