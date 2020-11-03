import React from 'react'
import './search-results.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectNewsData,
  selectFetchingNews,
  selectErrorMessage,
} from '../../redux/news/news.selectors'
import Loading from '../loading/loading.component'
import NewsList from '../news-list/news-list.component'

const SearchResults = ({ newsData, fetchingNews, errorMessage }) => {
  if (fetchingNews) {
    return (
      <div className="search-results-container">
        <Loading />
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className="search-results-container">
        <div className="search-results-message">
          An error occurred while trying to fetch data: {errorMessage}
        </div>
      </div>
    )
  }

  if (!newsData.length) {
    return (
      <div className="search-results-container">
        <div className="search-results-message">No results found</div>
      </div>
    )
  }

  return (
    <div className="search-results-container">
      <NewsList />
    </div>
  )
}

const mapStateToProps = (state) => ({
  newsData: selectNewsData(state),
  fetchingNews: selectFetchingNews(state),
  errorMessage: selectErrorMessage(state),
})

SearchResults.defaultProps = {
  newsData: [],
  fetchingNews: false,
  errorMessage: null,
}

SearchResults.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.object),
  fetchingNews: PropTypes.bool,
  errorMessage: PropTypes.string,
}

export default connect(mapStateToProps)(SearchResults)
