import axios from 'axios'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from '../../../redux/store'

const { adminBaseURL } = store.getState().generalReducer

export default class CoverLetterModal extends Component {
  state = {
    errorMessage: '', // store error msg
    displayStatus: true, //switch for error msg block
  }

  
  handleLetterSubmit = e => {
    e.preventDefault()
    const { id, username, content, to, attention, date } = store.getState().letterReducer
    const { handleError, updateLetters } = this.props
    if (!username || !content || !to || !attention || !date) {
      return this.setState({ errorMessage: "there's column missed, please check", displayStatus: false })
    }
    const token = localStorage.getItem('token')
    if (id) {
      axios({
        method: 'put',
        url: `${adminBaseURL}/letter/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          username,
          content,
          to,
          attention,
          date
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.letter
          this.props.onClose()
          return updateLetters('edit', data)
        })
        .catch(err => console.log(err))
    } else {
      axios({
        method: 'post',
        url: `${adminBaseURL}/letter`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          username,
          content,
          to,
          attention,
          date
        }
      })
        .then(response => {
          if (response.data.status === 'error') {
            const error = response.data.message
            this.props.onClose()
            return handleError(error)
          }
          const data = response.data.letter
          this.props.onClose()
          return updateLetters('add', data)
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    const { onClose, open } = this.props
    const { errorMessage, displayStatus } = this.state
    const { username, content, to, attention, date } = store.getState().letterReducer

    if (!open) return null

    return ReactDOM.createPortal(
      <div className="modal-background">
        <div className="error-message" style={{ display: displayStatus ? 'none' : 'block' }}>
          <span>{errorMessage}</span>
          <button type="button" onClick={() => this.setState({ displayStatus: true })}>X</button>
        </div>
        <div className="letterModal">
          <div className="close-btn">
            <button onClick={onClose}>X</button>
          </div>
          <form onSubmit={this.handleLetterSubmit} className="userInfo-form">
            <div>
              <label htmlFor="input-username">Username</label>
              <input type="text" id="input-username" value={username} onChange={e => store.dispatch({ type: 'editUsername', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-content">Content</label>
              <textarea type="text" id="input-content" value={content} onChange={e => store.dispatch({ type: 'editContent', data: e.target.value })}/>
            </div>
            <div>
              <label htmlFor="input-to">To</label>
              <input type="text" id="input-to" value={to} onChange={e => store.dispatch({ type: 'editLetterTo', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-attention">Attention</label>
              <input type="text" id="input-attention" value={attention} onChange={e => store.dispatch({ type: 'editAttention', data: e.target.value })} />
            </div>
            <div>
              <label htmlFor="input-date">Date</label>
              <input type="date" id="input-date" value={date} onChange={e => store.dispatch({ type: 'editDate', data: e.target.value })} />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </div>,
      document.getElementById('portal')
    )
  }
}