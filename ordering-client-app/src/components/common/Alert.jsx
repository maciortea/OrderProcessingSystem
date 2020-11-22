import React from 'react'

export const AlertType = {
  Info: 'info',
  Error: 'danger',
}

const Alert = ({ type = AlertType.Info, title = '', message = '' }) => {
  return (
    <div className={`alert alert-${type}`} role='alert'>
      {title && <h5 className='alert-heading'>{title}</h5>}
      {message && <span>{message}</span>}
    </div>
  )
}

export default Alert
