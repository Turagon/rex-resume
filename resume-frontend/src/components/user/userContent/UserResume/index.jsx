import React, { Component } from 'react'
import WorkExperiences from './workExp'
import Educations from './education'
import './userResume.css'

export default class UserResume extends Component {
  render() {
    return (
      <div className="user-resume">
        <WorkExperiences/>
        <Educations/>
      </div>
    )
  }
}
