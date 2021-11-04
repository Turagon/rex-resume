import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// pack NavLink for repeat usage
export default class MyNavLink extends Component {
  render() {
    return (
      <NavLink className="links" {...this.props}></NavLink>
    )
  }
}