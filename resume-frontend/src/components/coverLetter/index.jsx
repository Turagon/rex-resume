import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import CoverLetterModal from './coverLetterModal'
import './coverLetter.css'

export default class CoverLetter extends Component {
  state = {
    letters: [],
    user: {},
    open: false, //switch modal open
    errorMessage: '', //store error msg
    displayStatus: true //switch warning display which is from server
  }

  componentDidMount() {
    const { token } = store.getState().generalReducer
    if (!token) {
      return this.props.history.push('/')
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get('http://localhost:3001/letter', config)
      .then(response => {
        const { letters, user } = response.data
        this.setState({ letters, user })
      })
      .catch(err => console.log(err))
  }

  deleteLetterItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const { token } = store.getState().generalReducer
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`http://localhost:3001/letter/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { letters } = this.state
        if (result === 'success') {
          letters = letters.filter(item => item.id !== id)
          return this.setState({ letters })
        } else {
          return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
        }
      })
      .catch(err => console.log(err))
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
    const { letters, user, open, errorMessage, displayStatus } = this.state

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
                <th>User Name</th>
                <th>Content</th>
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
                      <td>{item.content}</td>
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
