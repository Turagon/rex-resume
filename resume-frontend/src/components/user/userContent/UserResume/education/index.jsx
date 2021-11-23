import React, { Component } from 'react'
import axios from 'axios'
import store from '../../../../../redux/store'
import './education.css'

const { userBaseURL } = store.getState().generalReducer

export default class Educations extends Component {

  state = { educations: [] }

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

    axios.get(`${userBaseURL}/education`, config)
      .then(response => {
        const { educations } = response.data
        this.setState({ educations })
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
    const { educations } = this.state

    return (
      <div className="user-educations-box">
        <h5 className="user-educations-sub">Educations</h5>
        <div className="user-educations">
          {
            educations.map(item => {
              return (
                <div className="user-education" key={item.id}>
                  <div className="user-edu">
                    <div className="user-jobtitle">
                      <span>School : </span>
                      <span>{item.name}</span>
                    </div>
                  </div>
                  <div className="user-major-degree">
                    <div className="user-major">
                      <span>Major : </span>
                      <span>{item.major}</span>
                    </div>
                    <div>
                      <span>Degree : </span>
                      <span>{item.degree}</span>
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
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
