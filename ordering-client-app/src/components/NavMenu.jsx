import React from 'react'
import { Link } from 'react-router-dom'

const NavMenu = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      {' | '}
      <Link to='/new'>New order</Link>
      {' | '}
      <Link to='/orders'>Orders</Link>
    </>
  )
}

export default NavMenu
