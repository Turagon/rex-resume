import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
// import MyNavLink from './components/NavLinks'
import Login from './pages/login'
import User from './pages/user'
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/user" component={User}/>
          <Route path="/" component={Login}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    )
  }
}