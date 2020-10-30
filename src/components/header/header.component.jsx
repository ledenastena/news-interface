import React from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom'

const Header = () => (
  <div className="header-container">
    <Link to="/">Top News</Link>
    <Link to="/categories">Categories</Link>
    <Link to="/search">Search</Link>
  </div>
)

export default Header
