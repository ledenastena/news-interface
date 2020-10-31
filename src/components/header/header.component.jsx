import React from 'react'
import './header.styles.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectCountry } from '../../redux/news/news.selectors'
import { setCountry } from '../../redux/news/news.actions'

class Header extends React.Component {
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
    const { country } = this.props

    return (
      <div className="header-container">
        <div className="header-width">
          <div className="header-navigation">
            <Link to="/">Top News</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/search">Search</Link>
          </div>
          <div className="header-country-select">
            <button
              type="button"
              name="gb-button"
              className={`country-select-button ${
                country === 'gb' && 'selected'
              }`}
              onClick={this.handleClick}
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
            >
              US
            </button>
          </div>
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
  country: 'gb',
  setCountry: null,
}

Header.propTypes = {
  country: PropTypes.string,
  setCountry: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
