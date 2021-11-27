import React, { Component } from 'react'
import axios from 'axios'
import store from '../../../redux/store'
import './userSkills.css'
const { userBaseURL } = store.getState().generalReducer 

export default class UserSkills extends Component {

  state = { skills: [] }

  componentDidMount () {
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(`${userBaseURL}/skill`, config)
      .then(response => {
        if (response.data.status === 'error') return
        const { skills } = response.data
        this.setState({ skills })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { skills } = this.state

    return (
      <div className="user-skills">
        <h4>Skills</h4>
        <h5>Frontend</h5>
        <ul>
          {
            skills.map(item => {
              return (item.category === 'frontend'? <li key={item.id}>{item.name}</li>: '')
            })
          }
        </ul>
        <h5>Backend</h5>
        <ul>
          {
            skills.map(item => {
              return (item.category === 'backend' ? <li key={item.id}>{item.name}</li>: '')
            })
          }
        </ul>
        <h5>Database</h5>
        <ul>
          {
            skills.map(item => {
              return (item.category === 'database' ? <li key={item.id}>{item.name}</li>: '')
            })
          }
        </ul>
        <h5>Language</h5>
        <ul>
          {
            skills.map(item => {
              return (item.category === 'language' ? <li key={item.id}>{item.name}</li>: '')
            })
          }
        </ul>
      </div>
    )
  }
}
