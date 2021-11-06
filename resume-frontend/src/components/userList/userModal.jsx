import React from 'react'
import ReactDOM from 'react-dom';

export default function UserModal({ open, onClose, btn }) {
  if (!open) return null

  return ReactDOM.createPortal(
    <div>
      <div>
        <button onClick={ onClose }>X</button>
      </div>
      <form>
        <button type="submit" onClick={ onClose } style={{ display: btn ? 'table-cell' : 'none' }}>Add</button>
        <button type="submit" onClick={ onClose } style={{ display: btn ? 'none' : 'table-cell' }}>Edit</button>
      </form>
    </div>,
    document.getElementById('portal')
  )
}
