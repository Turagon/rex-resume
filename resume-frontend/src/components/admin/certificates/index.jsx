import React, { Component } from 'react'
import axios from 'axios'
import store from '../../../redux/store'
import CertificateModal from './certificateModal'
import './certificate.css'

const { adminBaseURL } = store.getState().generalReducer

export default class Certificate extends Component {
  state = {
    certificates: [],
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

    axios.get(`${adminBaseURL}/certificate`, config)
      .then(response => {
        const { certificates } = response.data
        this.setState({ certificates })
      })
      .catch(err => console.log(err))
  }

  deleteCertificateItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`${adminBaseURL}/certificate/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { certificates } = this.state
        if (result === 'success') {
          certificates = certificates.filter(item => item.id !== id)
          return this.setState({ certificates })
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

  initCertificateEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initCertificateEdit', data: { id: item.id, name: item.name, institution: item.institution, date: item.date, image: item.image } })
  }

  addCertificateItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initCertificateEdit', data: { name: '', institution: '', date: '', image: '' } })
  }

  updateCertificates = (type, data) => {
    let { certificates } = this.state
    if (type === 'edit') {
      for (let i in certificates) {
        if (certificates[i].id === data.id) {
          certificates[i] = data
          return this.setState({ certificates })
        }
      }
    }
    certificates.push(data)
    return this.setState({ certificates })
  }

  render() {
    const { certificates, open } = this.state
    const { user, error, display } = store.getState().generalReducer

    return (
      <div>
        <div className="error-message" style={{ display: display ? 'none' : 'block' }}>
          <span>{error}</span>
          <button type="button" onClick={this.resetError}>X</button>
        </div>
        <div className="certificate-table">
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Institution</th>
                <th>Date</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                certificates.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td><img src={item.image} alt="" /></td>
                      <td>{item.name}</td>
                      <td>{item.institution}</td>
                      <td>{item.date}</td>

                      <td onClick={() => this.initCertificateEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deleteCertificateItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addCertificateItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <CertificateModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updateCertificates={this.updateCertificates} />
        </div>
      </div>
    )
  }
}
