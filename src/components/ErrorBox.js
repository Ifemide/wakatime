import React from 'react'

const ErrorBox = (props) => {
  return (
    <div className="error">
      <div>
        <i className="fas fa-exclamation-triangle"></i>
        <p>{props.message}</p>
        <button onClick={() => window.location.reload()}>
          Please Reload Page
        </button>
      </div>
    </div>
  )
}

export default ErrorBox
