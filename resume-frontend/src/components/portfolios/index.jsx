import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import PortfolioModal from './portfolioModal'
import './portfolio.css'

export default class Portfolio extends Component {
  state = {
    portfolios: [],
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

    axios.get('http://localhost:3001/portfolio', config)
      .then(response => {
        const { portfolios, user } = response.data
        this.setState({ portfolios, user })
      })
      .catch(err => console.log(err))
  }

  deletePortfolioItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const { token } = store.getState().generalReducer
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`http://localhost:3001/portfolio/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { portfolios } = this.state
        if (result === 'success') {
          portfolios = portfolios.filter(item => item.id !== id)
          return this.setState({ portfolios })
        } else {
          return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
        }
      })
      .catch(err => console.log(err))
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
    const { portfolios, user, open, errorMessage, displayStatus } = this.state

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
                <th>Image</th>
                <th>Name</th>
                <th>Github</th>
                <th>Heroku</th>
                <th>Description</th>
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
                      <td>{item.description}</td>
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
