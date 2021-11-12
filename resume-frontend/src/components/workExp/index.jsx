import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import WorkModal from './workModal'
import './workExp.css'

export default class WorkExp extends Component {
  state = {
    works: [],
    user: {},
    open: false, //switch modal open
    errorMessage: '', //store error msg
    displayStatus: true //switch warning display which is from server
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get('http://localhost:3001/work', config)
      .then(response => {
        const { works, user } = response.data
        this.setState({ works, user })
      })
      .catch(err => console.log(err))
  }

  deleteWorkItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`http://localhost:3001/work/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { works } = this.state
        if (result === 'success') {
          works = works.filter(item => item.id !== id)
          return this.setState({ works })
        } else {
          return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
        }
      })
      .catch(err => console.log(err))
  }

  initEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initEdit', data: { id: item.id, company: item.company, jobTitle: item.jobTitle, from: item.from, to: item.to, description: item.description, location: item.location, language: item.language } })
  }

  addItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initEdit', data: { company: '', jobTitle: '', from: '', to: '', description: '', location: '', language: '' } })
  }

  updateWorks = (type, data) => {
    let { works } = this.state
    if (type === 'edit') {
      for (let i in works) {
        if (works[i].id === data.id) {
          works[i] = data
          return this.setState({ works }) 
        }
      }
    }
    works.push(data)
    return this.setState({ works })
  }

  render() {
    const { works, user, open, errorMessage, displayStatus } = this.state

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
                <th>company</th>
                <th>job-title</th>
                <th>from</th>
                <th>to</th>
                <th>description</th>
                <th>location</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>delete</th>
              </tr>
            </thead>
            <tbody>
              {
                works.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.company}</td>
                      <td>{item.jobTitle}</td>
                      <td>{item.from}</td>
                      <td>{item.to}</td>
                      <td>{item.description}</td>
                      <td>{item.location}</td>

                      <td onClick={() => this.initEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deleteWorkItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={ this.addItem } style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <WorkModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updateWorks={this.updateWorks}/>
        </div>
      </div>
    )
  }
}
