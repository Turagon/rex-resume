import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MyNavLink from '../../components/NavLinks'
import UserList from '../../components/userList'
import WorkExp from '../../components/workExp'

export default class Admin extends Component {

  render() {
    return (
      <div>
        <div>
          <MyNavLink to='/admin'>User List</MyNavLink>
          <MyNavLink to='/admin/workExp'>Work Exps</MyNavLink>
          <MyNavLink to='/admin/education'>Education</MyNavLink>
          <MyNavLink to='/admin/skill'>Skills</MyNavLink>
          <MyNavLink to='/admin/personInfo'>Personal Info</MyNavLink>
          <MyNavLink to='/admin/portfolio'>Portfolios</MyNavLink>
          <MyNavLink to='/admin/coverletter'>Cover Letter</MyNavLink>
        </div>
        <div>
          <Switch>
            <Route path="/admin" component={UserList} />
            <Route path="/admin/workExp" component={WorkExp} />
            {/* <Route path="/admin/education" component={Home} />
            <Route path="/admin/skill" component={Home} />
            <Route path="/admin/personInfo" component={Home} />
            <Route path="/admin/portfolio" component={Home} />
            <Route path="/admin/coverletter" component={Home} /> */}
            <Redirect to="/admin" />
          </Switch>
        </div>
      </div>
    )
  }
}
