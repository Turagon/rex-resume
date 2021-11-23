import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import store from '../../../redux/store'
import PortfolioModal from './portfolioModal'
import './portfolio.css'

const { adminBaseURL } = store.getState().generalReducer

export default class Portfolio extends Component {
  state = {
    portfolios: [],
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

    axios.get(`${adminBaseURL}/portfolio`, config)
      .then(response => {
        const { portfolios, user } = response.data
        this.setState({ portfolios, user })
      })
      .catch(err => console.log(err))
  }

  deletePortfolioItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`${adminBaseURL}/portfolio/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { portfolios } = this.state
        if (result === 'success') {
          portfolios = portfolios.filter(item => item.id !== id)
          return this.setState({ portfolios })
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

  initPortfolioEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initPortfolioEdit', data: { id: item.id, name: item.name, image: item.image, github: item.github, heroku: item.heroku, description: item.description, language: item.language } })
  }

  addPortfolioItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initPortfolioEdit', data: { name: '', image: '', github: '', heroku: '', description: '', language: '' } })
  }

  updatePortfolios = (type, data) => {
    let { portfolios } = this.state
    if (type === 'edit') {
      for (let i in portfolios) {
        if (portfolios[i].id === data.id) {
          portfolios[i] = data
          return this.setState({ portfolios })
        }
      }
    }
    portfolios.push(data)
    return this.setState({ portfolios })
  }

  render() {
    const { portfolios, open } = this.state
    const { user, error, display } = store.getState().generalReducer

    return (
      <div>
        <div className="error-message" style={{ display: display ? 'none' : 'block' }}>
          <span>{error}</span>
          <button type="button" onClick={this.resetError}>X</button>
        </div>
        <div className="portfolio-table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Github</th>
                <th>Heroku</th>
                <th className="portfolio-des-title">Description</th>
                <th>Language</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                portfolios.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td><img src={item.image} alt="" /></td>
                      <td>{item.name}</td>
                      <td>{item.github}</td>
                      <td>{item.heroku}</td>
                      <td className="portfolio-description"><ReactMarkdown children={item.description} /></td>
                      <td>{item.language}</td>

                      <td onClick={() => this.initPortfolioEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deletePortfolioItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addPortfolioItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <PortfolioModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updatePortfolios={this.updatePortfolios} />
        </div>
      </div>
    )
  }
}
