import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import store from '../../../../../redux/store'
import './workExp.css'

const { userBaseURL } = store.getState().generalReducer

export default class WorkExperiences extends Component {

  state = { works: [] }

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

    axios.get(`${userBaseURL}/work`, config)
      .then(response => {
        const { works } = response.data
        this.resetError()
        this.setState({ works })
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
    const { works } = this.state

    return (
      <div className="user-workExps-box">
        <h5 className="user-workExps-sub">Work Experiences</h5>
        <div className="user-workExps">
        {
          works.map(item => {
            return (
              <div className="user-workExp" key={item.id}>
                <div className="user-title">
                  <div className="user-jobtitle">
                    <span>Job Title : </span>
                    <span>{item.jobTitle}</span>
                  </div>
                  <div>
                    <span>Company : </span>
                    <span>{item.company}</span>
                  </div>
                </div>
                <div className="user-period">
                  <div className="user-duration">
                    <span>Duration : </span>
                    <span>From: {item.from} &nbsp; &nbsp;To : {item.to}</span>
                  </div>
                  <div>
                    <span>Location : </span>
                    <span>{item.location}</span>
                  </div>
                </div>
                <div>
                  <ReactMarkdown children={item.description} className="user-description"/>
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
