import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import store from '../../../redux/store'
import CoverLetterModal from './coverLetterModal'
import './coverLetter.css'

const { adminBaseURL } = store.getState().generalReducer

export default class CoverLetter extends Component {
  state = {
    letters: [],
    open: false, //switch modal open
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

    axios.get(`${adminBaseURL}/letter`, config)
      .then(response => {
        const { letters, user } = response.data
        this.setState({ letters, user })
      })
      .catch(err => console.log(err))
  }

  deleteLetterItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`${adminBaseURL}/letter/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { letters } = this.state
        if (result === 'success') {
          letters = letters.filter(item => item.id !== id)
          return this.setState({ letters })
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

  initLetterEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initLetterEdit', data: { id: item.id, username: item.username, content: item.content, to: item.to, attention: item.attention, date: item.date } })
  }

  addLetterItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initLetterEdit', data: { username: '', content: '', to: '', attention: '', date: '' } })
  }

  updateLetters = (type, data) => {
    let { letters } = this.state
    if (type === 'edit') {
      for (let i in letters) {
        if (letters[i].id === data.id) {
          letters[i] = data
          return this.setState({ letters })
        }
      }
    }
    letters.push(data)
    return this.setState({ letters })
  }

  render() {
    const { letters, open } = this.state
    const { user, error, display } = store.getState().generalReducer

    return (
      <div>
        <div className="error-message" style={{ display: display ? 'none' : 'block' }}>
          <span>{error}</span>
          <button type="button" onClick={this.resetError}>X</button>
        </div>
        <div className="coverLetter-table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>User Name</th>
                <th className="coverLetter-des-title">Content</th>
                <th>To</th>
                <th>Attention</th>
                <th>Date</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                letters.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td className="coverLetter-content"><ReactMarkdown children={item.content} /></td>
                      <td>{item.to}</td>
                      <td>{item.attention}</td>
                      <td>{item.date}</td>

                      <td onClick={() => this.initLetterEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deleteLetterItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addLetterItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <CoverLetterModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updateLetters={this.updateLetters} />
        </div>
      </div>
    )
  }
}
