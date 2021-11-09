import React, { Component } from 'react'
import ReactDOM from 'react-dom';


export default class UserModal extends Component {
  state = {
    id: this.props.userInfo.id || '',
    name: this.props.userInfo.name || '',
    role: this.props.userInfo.role || '',
    isActive: this.props.userInfo.isActive || '',
    password: this.props.userInfo.password || '',
    checkPassword: this.props.userInfo.checkPassword || '',
    language: this.props.userInfo.language || ''
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onClose()
    console.log('===', e)
  }

  static getDerivedStateFromProps (props, state) {
    const { addUser, userInfo } = props
    if (addUser || !userInfo.id) {
      return ({ id: '', name: '', role: '', isActive: '', password: '', checkPassword: '', language: '' })
    } else if (userInfo.id !== state.id) {
      return ({ ...userInfo })
    } else {
      return ({ ...state })
    }
  }

  handleSelect = () => {
    const { value } = this.Select
    this.setState({ isActive: value })
  }

  handleRoleSelect = () => {
    const { value } = this.roleSelect
    this.setState({ role: value })
  }
  
  render() {
    const { onClose, open } = this.props
    const { name, password, checkPassword, language } = this.state
    
    if (!open) return null
    
    console.log(this.state)
    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="userModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={ this.handleSubmit } method="post" className="userInfo-form">
            <div>
              <label htmlFor="input-name">Name</label>
              <input type="text" id="input-name" value={ name } onChange={e => this.setState({ name: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-role">Role</label>
              <select ref={e => this.roleSelect = e} onBlur={this.handleRoleSelect} id="input-role">
                <option value="admin">admin</option>
                <option value="user">user</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-isActive">isActive</label>
              <select ref={e => this.Select = e} onBlur={ this.handleSelect } id="input-isActive">
                <option value={ true }>true</option>
                <option value={ false }>false</option>
              </select>
            </div>
            <div>
              <label htmlFor="input-password">Password</label>
              <input type="text" id="input-password" value={password} onChange={e => this.setState({ password: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-checkPassword">Check Password</label>
              <input type="text" id="input-checkPassword" value={checkPassword} onChange={e => this.setState({ checkPassword: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-language">Language</label>
              <input type="text" id="input-language" value={language} onChange={e => this.setState({ language: e.target.value })}/>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}


// export default function UserModal({ open, onClose, btn, userInfo }) {
//   if (!open) return null

//   const inputData = {}
  
//   const handleSubmit = e => {
//   console.log("🚀 ~ file: userModal.jsx ~ line 10 ~ UserModal ~ e ", e )
//     console.log("🚀 ~ file: userModal.jsx ~ line 8 ~ UserModal ~ inputData", inputData)
//     e.preventDefault()
//     if (!inputData.name || inputData.role) return console.info('name or role can not be empty')
//   }

//   return ReactDOM.createPortal(
//     <div className="modal-background">
//       <div className="userModal">
//         <div>
//           <button onClick={ onClose }>X</button>
//         </div>
//         <form onSubmit={ handleSubmit } method="post">
//           <input type="text" onChange={e => inputData['name'] = e.target.value}/>
//           <input type="text" onChange={e => inputData['role'] = e.target.value} value={userInfo? userInfo.role: ''}/>
//           <input type="text" onChange={e => inputData['isActive'] = e.target.value} value={userInfo ? userInfo.isActive : ''}/>
//           <input type="text" onChange={e => inputData['password'] = e.target.value} value=''/>
//           <input type="text" onChange={e => inputData['checkPassword'] = e.target.value} value=''/>
//           <input type="text" onChange={e => inputData['language'] = e.target.value} value={userInfo ? userInfo.language : ''}/>
//           <button type={{display: btn? 'submit': 'button'}} onClick={ onClose } style={{ display: btn ? 'table-cell' : 'none' }}>Add</button>
//           <button type={{ display: btn ? 'button' : 'submit' }} onClick={ onClose } style={{ display: btn ? 'none' : 'table-cell' }}>Edit</button>
//         </form>
//       </div>
//     </div>,
//     document.getElementById('portal')
//   )
// }
