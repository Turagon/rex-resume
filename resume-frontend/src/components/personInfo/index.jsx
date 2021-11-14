import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import PersonModal from './personModal'
import './personInfo.css'

export default class PersonInfo extends Component {
  state = {
    personInfos: [],
    user: {},
    open: false, //switch modal open
    errorMessage: '', //store error msg
    displayStatus: true //switch warning display which is from server
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get('http://localhost:3001/person', config)
      .then(response => {
        const { personInfos, user } = response.data
        this.setState({ personInfos, user })
      })
      .catch(err => console.log(err))
  }

  deletePersonItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`http://localhost:3001/person/${id}`, config)
      .then(response => {
        const result = response.data.status
        let { personInfos } = this.state
        if (result === 'success') {
          personInfos = personInfos.filter(item => item.id !== id)
          return this.setState({ personInfos })
        } else {
          return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
        }
      })
      .catch(err => console.log(err))
  }

  initPersonEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initPersonEdit', data: { id: item.id, name: item.name, image: item.image, birthday: item.birthday, address: item.address, phone: item.phone, email: item.email } })
  }

  addItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initPersonEdit', data: { name: '', image: '', birthday: '', address: '', phone: '', email: '' } })
  }

  updatePersonInfos = (type, data) => {
    let { personInfos } = this.state
    if (type === 'edit') {
      for (let i in personInfos) {
        if (personInfos[i].id === data.id) {
          personInfos[i] = data
          return this.setState({ personInfos })
        }
      }
    }
    personInfos.push(data)
    return this.setState({ personInfos })
  }

  render() {
    const { personInfos, user, open, errorMessage, displayStatus } = this.state

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
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Email</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>delete</th>
              </tr>
            </thead>
            <tbody>
              {
                personInfos.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td><img src={item.image} alt=""/></td>
                      <td>{item.name}</td>
                      <td>{item.birthday}</td>
                      <td>{item.address}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>

                      <td onClick={() => this.initPersonEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={this.deletePersonItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <PersonModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updatePersonInfos={this.updatePersonInfos} />
        </div>
      </div>
    )
  }
}
