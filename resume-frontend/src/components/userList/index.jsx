import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import UserModal from './userModal'
import './userList.css'


export default class UserList extends Component {
  state = { 
    users: [], 
    user: {}, 
    open: false, //switch modal open
    errorMessage: '', //store error msg
    displayStatus: true //switch warning display which is from server
   }
  
  componentDidMount () {
    const { token } = store.getState().generalReducer
    if (!token) {
      return this.props.history.push('/')
    }

    const config = {
      headers: {
        Authorization: `Bearer ${ token }` 
      }
    }

    axios.get('http://localhost:3001/user', config)
    .then(response => {
      const { users, user} = response.data
      this.setState({ users, user })
    })
    .catch(err => console.log(err))
  }

  deleteItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const { token } = store.getState().generalReducer
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.delete(`http://localhost:3001/user/${id}`, config)
    .then(response => {
      const result = response.data.status
      let { users } = this.state
      if (result === 'success') {
        users = users.filter(item => item.id !== id)
        return this.setState({ users })
      } else {
        return this.setState({ displayStatus: false, errorMessage: 'Oops! Our system got some difficulties, please try later.' })
      }
    })
    .catch(err => console.log(err))
  }

  handleError = (error) => {
    return this.setState({ errorMessage: error, displayStatus: false })
  }

  initUserEdit = (item) => {
    this.setState({ open: true })
    store.dispatch({ type: 'initUserEdit', data: { id: item.id, name: item.name, role: item.role, isActive: item.isActive, language: item.language } })
  }

  addUserItem = () => {
    this.setState({ open: true })
    store.dispatch({ type: 'initUserEdit', data: { id: '', name: '', role: '', isActive: '', password: '', checkPassword: '', language: '' } })
  }

  updateUsers = (type, data) => {
    let { users } = this.state
    if (type === 'edit') {
      for (let i in users) {
        if (users[i].id === data.id) {
          users[i] = data
          return this.setState({ users })
        }
      }
    }
    users.push(data)
    return this.setState({ users })
  }

  render() {
    const { users, user, open, errorMessage, displayStatus } = this.state
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
                <th>Name</th>
                <th>Role</th>
                <th>isActive</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Edit</th>
                <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(item => {
                  return (
                    <tr key={ item.id }>
                      <td>{ item.id }</td>
                      <td>{ item.name }</td>
                      <td>{ item.role }</td>
                      <td>{ item.isActive? 'true': 'false' }</td>

                      <td onClick={() => this.initUserEdit(item)} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                      <td onClick={ this.deleteItem } style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <button onClick={this.addUserItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} className="add-btn">Add <i className="fas fa-plus"></i></button>
          <UserModal open={open} onClose={() => this.setState({ open: false })} handleError={this.handleError} updateUsers={this.updateUsers}/>
        </div>
      </div>
    )
  }
}
