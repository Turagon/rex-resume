import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import store from '../../../redux/store'
import WorkModal from './workModal'
import './workExp.css'

const { adminBaseURL } = store.getState().generalReducer

export default class WorkExp extends Component {
  state = {
    works: [],
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.handleError('Please login first')
      return this.props.history.push('/')
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(`${ adminBaseURL }/work`, config)
      .then(response => {
        const { works } = response.data
        this.setState({ works })
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

    axios.delete(`${ adminBaseURL }/work/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { works } = this.state
        if (result === 'success') {
          works = works.filter(item => item.id !== id)
          return this.setState({ works })
        } else {
          return this.handleError('Operation failed')
        }
      })
      .catch(err => console.log(err))
  }

  handleError = (error) => {
    store.dispatch({ type: 'editError', data: error })
    store.dispatch({ type: 'editDisplay', data: false })
    return
  }

  resetError = () => {
    store.dispatch({ type: 'editError', data: '' })
    store.dispatch({ type: 'editDisplay', data: true })
    return
  }

  initEdit = (item) => {
    store.dispatch({ type: 'editOpen', data: true })
    store.dispatch({ type: 'initEdit', data: { id: item.id, company: item.company, jobTitle: item.jobTitle, from: item.from, to: item.to, description: item.description, location: item.location, language: item.language } })
  }

  addItem = () => {
    store.dispatch({ type: 'editOpen', data: true })
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
    const { works } = this.state
    const { user, open, error, display } = store.getState().generalReducer

    return (
      <div>
        <div className="error-message" style={{ display: display ? 'none' : 'block' }}>
          <span>{error}</span>
          <button type="button" onClick={this.resetError}>X</button>
        </div>
        <div className="work-table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Company</th>
                <th>Job Title</th>
                <th>From</th>
                <th>To</th>
                <th className="work-des-title">Description</th>
                <th>Location</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
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
                      <td className="work-description"><ReactMarkdown children={item.description}/></td>
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
          <WorkModal open={open} onClose={() => store.dispatch({ type: 'editOpen', data: false })} handleError={this.handleError} updateWorks={this.updateWorks}/>
        </div>
      </div>
    )
  }
}
