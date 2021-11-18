import React, { Component } from 'react'
import axios from 'axios'
import store from '../../redux/store'
import UserModal from './userModal'
import './userList.css'


export default class UserList extends Component {
  state = { 
    users: [], 
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
      store.dispatch({ type: 'editUser', data: user })
      this.setState({ users })
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
        return store.dispatch({ type: 'editErrorMessage', data: 'Oops! Our system got some difficulties, please try later.' }, { type: 'editDisplayStatus', data: false })
      }
    })
    .catch(err => console.log(err))
  }

  handleError = (error) => {
    return store.dispatch({ type: 'editErrorMessage', data: error }, { type: 'editDisplayStatus', data: false })
  }

  initUserEdit = (item) => {
    store.dispatch({ type: 'editOpen', data: true })
    store.dispatch({ type: 'initUserEdit', data: { id: item.id, name: item.name, role: item.role, isActive: item.isActive, language: item.language } })
  }

  addUserItem = () => {
    store.dispatch({ type: 'editOpen', data: true })
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
    const { users } = this.state
    const { user, open, errorMessage, displayStatus } = store.getState().generalReducer
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
          <UserModal open={open} onClose={() => store.dispatch({ type: 'editOpen', data: false })} handleError={this.handleError} updateUsers={this.updateUsers}/>
        </div>
      </div>
    )
  }
}
