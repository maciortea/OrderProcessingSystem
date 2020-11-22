import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h4>Welcome to our ordering system!</h4>
      <p>
        You can place a new order <Link to='/new'>here</Link>.
      </p>
    </>
  )
}

export default HomePage
