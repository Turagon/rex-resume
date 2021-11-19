import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import SkillModal from './skillModal'
import './skill.css'

export default class Skill extends Component {
  state = {
    skills: [],
    user: {},
    open: false, //switch modal open
    errorMessage: '', //store error msg
    displayStatus: true //switch warning display which is from server
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!token) {
      return this.props.history.push('/')
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get('http://localhost:3001/skill', config)
      .then(response => {
        const { skills, user } = response.data
        this.setState({ skills, user })
      })
      .catch(err => console.log(err))
  }

  deleteSkillItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`http://localhost:3001/skill/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { skills } = this.state
        if (result === 'success') {
          skills = skills.filter(item => item.id !== id)
          return this.setState({ skills })
        } else {
          return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
        }
      })
      .catch(err => console.log(err))
  }

  initSkillEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initSkillEdit', data: { id: item.id, category: item.category, name: item.name } })
  }

  addSkillItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initSkillEdit', data: { category: '', name: '' } })
  }

  updateSkills = (type, data) => {
    let { skills } = this.state
    if (type === 'edit') {
      for (let i in skills) {
        if (skills[i].id === data.id) {
          skills[i] = data
          return this.setState({ skills })
        }
      }
    }
    skills.push(data)
    return this.setState({ skills })
  }

  render() {
    const { skills, user, open, errorMessage, displayStatus } = this.state

    return (
      <div>
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="user-table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Category</th>
                <th>Name</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                skills.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.category}</td>
                      <td>{item.name}</td>

                      <td onClick={() => this.initSkillEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deleteSkillItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addSkillItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <SkillModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updateSkills={this.updateSkills} />
        </div>
      </div>
    )
  }
}