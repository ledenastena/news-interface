import React from 'react'
import './menu-dropdown.styles.scss'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class MenuDropdown extends React.Component {
  elementRef = null

  componentDidMount() {
    window.addEventListener('mousedown', this.handleClickOutsideMenuDropdown)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutsideMenuDropdown)
  }

  setRef = (node) => {
    this.elementRef = node
  }

  handleClickOutsideMenuDropdown = (e) => {
    const { menuButtonRef, toggleMenuDropdownVisible } = this.props
    if (
      this.elementRef &&
      !this.elementRef.contains(e.target) &&
      !menuButtonRef.contains(e.target)
    ) {
      toggleMenuDropdownVisible()
    }
  }

  render() {
    const { toggleMenuDropdownVisible, location } = this.props
    return (
      <div
        data-testid="menu-dropdown"
        className="menu-dropdown-container"
        ref={this.setRef}
      >
        <Link
          to="/"
          className={`menu-dropdown-item ${
            location.pathname === '/' || location.pathname === '/article'
              ? 'selected'
              : ''
          }`}
          onClick={toggleMenuDropdownVisible}
        >
          Top News
        </Link>
        <hr />
        <Link
          to="/categories"
          className={`menu-dropdown-item ${
            location.pathname === '/categories' ? 'selected' : ''
          }`}
          onClick={toggleMenuDropdownVisible}
        >
          Categories
        </Link>
        <hr />
        <Link
          to="/search"
          className={`menu-dropdown-item ${
            location.pathname === '/search' ? 'selected' : ''
          }`}
          onClick={toggleMenuDropdownVisible}
        >
          Search
        </Link>
      </div>
    )
  }
}

MenuDropdown.defaultProps = {
  menuButtonRef: null,
  toggleMenuDropdownVisible: null,
  location: null,
}

MenuDropdown.propTypes = {
  menuButtonRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.node }),
  ]),
  toggleMenuDropdownVisible: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default withRouter(MenuDropdown)
