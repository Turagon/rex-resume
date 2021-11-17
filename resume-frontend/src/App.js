import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import store from './redux/store'
import Login from './pages/login'
import User from './pages/user'
import Admin from './pages/admin'
import './App.css'

export default class App extends Component {

  componentDidMount() {
    store.subscribe(() => {
      this.setState({})
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/user" component={User}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/" component={Login}/>
          <Redirect to="/"/>
        </Switch>
      </div>
    )
  }
}