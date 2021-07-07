import React from 'react'
import rhombus from '../assets/rhombus.gif'

const Loader = () => {
  return (
    <div className="loading-section">
      <img src={rhombus} alt="Loading Icon" className="loading-icon" />
    </div>
  )
}

export default Loader
