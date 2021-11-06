import React, { Component } from 'react'
import axios from 'axios'


export default class UserList extends Component {
  state = { 
    users: [], 
    user: {}, 
    token: '',
    systemIssue: false
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

  render() {
    const { users, user, systemIssue } = this.state
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
                    <td onClick={this.editItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }}><i className="far fa-edit"></i></td>
                    <td onClick={this.deleteItem} style={{ display: user.role === 'admin' ? 'table-cell' : 'none' }} data-id={item.id}><i className="fas fa-trash-alt" data-id={item.id}></i></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
