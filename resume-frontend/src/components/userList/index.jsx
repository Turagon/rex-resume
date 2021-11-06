import React, { Component } from 'react'
import axios from 'axios'
import UserModal from './userModal'


export default class UserList extends Component {
  state = { 
    users: [], 
    user: {}, 
    token: '',
    systemIssue: false,
    open: false,
    addUser: false,
    targetID: ''
   }
  
  componentDidMount () {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${ token }` 
      }
    }

    axios.get('http://localhost:3001/user', config)
    .then(response => {
      const { users, user} = response.data
      this.setState({ users, user, token })
    })
    .catch(err => console.log(err))
  }

  deleteItem = e => {
    const id = Number(e.target.getAttribute("data-id"))
    const { token } = this.state
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
        return this.setState({ systemIssue: true })
      }
    })
    .catch(err => console.log(err))
  }

  changeWarningDisplay = e => {
    return this.setState({ systemIssue: false })
  }

  handleSubmit = e => {
    e.preventDefault()
    
  }

  render() {
    const { users, user, systemIssue, open, addUser } = this.state
    return (
      <div>
        <div style={{ display: systemIssue ? 'table-cell' : 'none' }}>
          <span>Oops! Our system got some difficulties, please try later.</span>
          <button onClick={this.changeWarningDisplay}>X</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>role</th>
              <th>isActive</th>
              <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>edit</th>
              <th style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>delete</th>
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
                    <td>{ item.isActive }</td>

                    <td onClick={() => this.setState({ open: true, addUser: false, targetID: item.id })} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>

                    <td onClick={this.deleteItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button onClick={() => this.setState({ open: true, addUser: true })} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}>Add <i className="fas fa-plus"></i></button>
        <UserModal open={open} btn={addUser} onClose={() => this.setState({ open: false })}/>
      </div>
    )
  }
}
