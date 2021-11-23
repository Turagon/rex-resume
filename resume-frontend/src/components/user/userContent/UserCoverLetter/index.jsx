import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import store from '../../../../redux/store'
import './userCoverLetter.css'

const { userBaseURL } = store.getState().generalReducer

export default class UserCoverLetter extends Component {
  state = { coverLetter: '' }

  componentDidMount () {
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

    axios.get(`${userBaseURL}/letter`, config)
      .then(response => {
        const { coverLetter } = response.data
        this.resetError()
        this.setState({ coverLetter })
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

  render() {
    const { coverLetter } = this.state

    return (
      <div className="user-coverLetter">
        <ReactMarkdown children={ coverLetter.content } className="user-letter-content"/>
      </div>
    )
  }
}
