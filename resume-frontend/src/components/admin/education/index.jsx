import React, { Component } from 'react'
import axios from 'axios'
import store from '../../../redux/store'
import EducationModal from './eduModal'
import './education.css'

const { adminBaseURL } = store.getState().generalReducer

export default class WorkExp extends Component {
  state = {
    educations: [],
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

    axios.get(`${adminBaseURL}/education`, config)
      .then(response => {
        const { educations, user } = response.data
        this.setState({ educations, user })
      })
      .catch(err => console.log(err))
  }

  deleteEducationItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`${adminBaseURL}/education/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { educations } = this.state
        if (result === 'success') {
          educations = educations.filter(item => item.id !== id)
          return this.setState({ educations })
        } else {
          return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
        }
      })
      .catch(err => console.log(err))
  }

  initEducationEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initEducationEdit', data: { id: item.id, name: item.name, major: item.major, degree: item.degree, from: item.from, to: item.to, location: item.location, language: item.language } })
  }

  addItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initEducationEdit', data: { name: '', mojor: '', degree: '', from: '', to: '', location: '', language: '' } })
  }

  updateEducations = (type, data) => {
    let { educations } = this.state
    if (type === 'edit') {
      for (let i in educations) {
        if (educations[i].id === data.id) {
          educations[i] = data
          return this.setState({ educations })
        }
      }
    }
    educations.push(data)
    return this.setState({ educations })
  }

  render() {
    const { educations, user, open, errorMessage, displayStatus } = this.state

    return (
      <div>
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="education-table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>School</th>
                <th>Major</th>
                <th>Degree</th>
                <th>From</th>
                <th>To</th>
                <th>Location</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                educations.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.major}</td>
                      <td>{item.degree}</td>
                      <td>{item.from}</td>
                      <td>{item.to}</td>
                      <td>{item.location}</td>

                      <td onClick={() => this.initEducationEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deleteEducationItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <EducationModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updateEducations={this.updateEducations} />
        </div>
      </div>
    )
  }
}

