import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import store from '../../../../redux/store'
import './userPortfolio.css'

const { userBaseURL } = store.getState().generalReducer

export default class UserPortfolio extends Component {

  state = { portfolios: [] }

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

    axios.get(`${userBaseURL}/portfolio`, config)
      .then(response => {
        const { portfolios } = response.data
        this.resetError()
        this.setState({ portfolios })
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
    const { portfolios } = this.state

    return (
      <div className="user-portfolio">
        <div className="user-portfolio-container">
        {
          portfolios.map(item => {
            return (
              <div key={item.id} className="user-portfolio-box">
                <div className="user-portfolio-upper">
                  <div className="user-portfolio-imgBox">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="user-portfolio-linkBox">
                    <span>Name : {item.name}</span>
                    <span>Github : <a href={item.github}>{item.github}</a></span>
                    <span>Web Link : <a href={item.heroku}>{item.heroku}</a></span>
                  </div>
                </div>
                <div className="user-portfolio-lower">
                  <ReactMarkdown children={item.description} className="portfolio-content" />
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
