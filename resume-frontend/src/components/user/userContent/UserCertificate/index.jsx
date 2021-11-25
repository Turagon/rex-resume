import React, { Component } from 'react'
import axios from 'axios'
import store from '../../../../redux/store'
import './userCertificate.css'

const { userBaseURL } = store.getState().generalReducer

export default class UserCertificate extends Component {
  state = { certificates: [] }

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

    axios.get(`${userBaseURL}/certificate`, config)
      .then(response => {
        const { certificates } = response.data
        this.resetError()
        this.setState({ certificates })
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
    const { certificates } = this.state

    return (
      <div className="user-certificate">
        <div className="user-certificate-container">
          {
            certificates.map(item => {
              return (
                <div key={item.id} className="user-certificate-box">
                  <div className="user-certificate-info">
                    <div className="user-certificate-imgBox">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="user-certificate-linkBox">
                      <span>Name : {item.name}</span>
                      <span>Institution : {item.institution}</span>
                      <span>Date : {item.date}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
