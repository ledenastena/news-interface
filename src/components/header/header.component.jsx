import React from 'react'
import './header.styles.scss'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MenuDropdown from '../menu-dropdown/menu-dropdown.component'
import { selectCountry } from '../../redux/news/news.selectors'
import { setCountry } from '../../redux/news/news.actions'

class Header extends React.Component {
  state = {
    menuDropdownVisible: false,
  }

  menuButtonRef = null

  toggleMenuDropdownVisible = () => {
    this.setState((prevState) => ({
      menuDropdownVisible: !prevState.menuDropdownVisible,
    }))
  }

  setHamburgerRef = (node) => {
    this.menuButtonRef = node
  }

  handleHamburgerClick = () => {
    this.toggleMenuDropdownVisible()
  }

  handleClick = (e) => {
    const { country, setCountry } = this.props

    if (e.target.name === 'gb-button') {
      if (country !== 'gb') {
        setCountry('gb')
      }
    } else if (country !== 'us') {
      setCountry('us')
    }
  }

  render() {
    const { country, location } = this.props
    const { menuDropdownVisible } = this.state

    return (
      <div className="header-container">
        <div className="header-width">
          <div className="header-navigation">
            <div className="regular-navigation">
              <Link
                className={`${
                  location.pathname === '/' || location.pathname === '/article'
                    ? 'selected'
                    : ''
                }`}
                to="/"
              >
                Top News
              </Link>
              <Link
                className={`${
                  location.pathname === '/categories' ? 'selected' : ''
                }`}
                to="/categories"
              >
                Categories
              </Link>
              <Link
                className={`${
                  location.pathname === '/search' ? 'selected' : ''
                }`}
                to="/search"
              >
                Search
              </Link>
            </div>
            <button
              data-testid="hamburger-menu-button"
              type="button"
              className="hamburger-menu-button"
              onClick={this.handleHamburgerClick}
              ref={this.setHamburgerRef}
            >
              <div className="hamburger-bar" />
              <div className="hamburger-bar" />
              <div className="hamburger-bar" />
            </button>
          </div>
          <div className="header-country-select">
            <button
              type="button"
              name="gb-button"
              className={`country-select-button ${
                country === 'gb' && 'selected'
              }`}
              onClick={this.handleClick}
              disabled={location.pathname === '/article'}
            >
              GB
            </button>
            <button
              type="button"
              name="us-button"
              className={`country-select-button ${
                country === 'us' && 'selected'
              }`}
              onClick={this.handleClick}
              disabled={location.pathname === '/article'}
            >
              US
            </button>
          </div>
          {menuDropdownVisible ? (
            <MenuDropdown
              menuButtonRef={this.menuButtonRef}
              toggleMenuDropdownVisible={this.toggleMenuDropdownVisible}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  country: selectCountry(state),
})

const mapDispatchToProps = (dispatch) => ({
  setCountry: (country) => dispatch(setCountry(country)),
})

Header.defaultProps = {
  location: null,
  country: 'gb',
  setCountry: null,
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  country: PropTypes.string,
  setCountry: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
