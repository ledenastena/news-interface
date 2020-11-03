import React from 'react'
import './search.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SearchForm from '../../components/search-form/search-form.component'
import { selectCountry } from '../../redux/news/news.selectors'
import { fetchNewsStart } from '../../redux/news/news.actions'
import SearchResults from '../../components/search-results/search-results.component'

class SearchPage extends React.Component {
  state = {
    initialSearchFired: false,
  }

  handleSubmit = (searchTerm) => {
    const { fetchNewsStart, country } = this.props
    const prepareSearchTerm = searchTerm.replace(/ +/g, '+')
    const { initialSearchFired } = this.state

    if (!initialSearchFired) {
      this.setState({
        initialSearchFired: true,
      })
    }
    fetchNewsStart({
      country,
      searchTerm: prepareSearchTerm,
    })
  }

  render() {
    const { country } = this.props
    const { initialSearchFired } = this.state
    let countryFullName

    switch (country) {
      case 'gb':
        countryFullName = 'Great Britain'
        break
      case 'us':
        countryFullName = 'United States'
        break
      default:
        countryFullName = 'Unknown'
    }

    return (
      <div className="search-page-container">
        <div className="search-page-heading">
          &bull; Search top news from {countryFullName} by term:
        </div>
        <SearchForm handleSubmit={this.handleSubmit} />
        {!initialSearchFired ? (
          <div className="initial-message">
            Provide search keywords and press ENTER
          </div>
        ) : (
          <SearchResults />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  country: selectCountry(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchNewsStart: (reqObj) => dispatch(fetchNewsStart(reqObj)),
})

SearchPage.defaultProps = {
  country: 'gb',
  fetchNewsStart: null,
}

SearchPage.propTypes = {
  country: PropTypes.string,
  fetchNewsStart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)
