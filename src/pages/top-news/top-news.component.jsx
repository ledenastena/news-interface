import React from 'react'
import './top-news.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectNewsData,
  selectFetchingNews,
  selectErrorMessage,
  selectCountry,
} from '../../redux/news/news.selectors'
import { fetchNewsStart } from '../../redux/news/news.actions'
import NewsList from '../../components/news-list/news-list.component'
import Loading from '../../components/loading/loading.component'

class TopNewsPage extends React.Component {
  componentDidMount() {
    const { country, fetchNewsStart } = this.props

    fetchNewsStart({ country })
  }

  componentDidUpdate(prevProps) {
    const { country, fetchNewsStart } = this.props

    if (prevProps.country !== country) {
      fetchNewsStart({ country })
    }
  }

  render() {
    const { newsData, fetchingNews, errorMessage } = this.props

    if (fetchingNews) {
      return (
        <div className="top-news-page-container">
          <Loading />
        </div>
      )
    }

    if (errorMessage) {
      return (
        <div className="top-news-page-container">
          <div className="top-news-page-error">
            An error occurred while trying to fetch data: {errorMessage}
          </div>
        </div>
      )
    }

    if (!newsData.length) {
      return (
        <div className="top-news-page-container">No relevant news found</div>
      )
    }

    return (
      <div className="top-news-page-container">
        <NewsList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  newsData: selectNewsData(state),
  fetchingNews: selectFetchingNews(state),
  errorMessage: selectErrorMessage(state),
  country: selectCountry(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchNewsStart: (requestObj) => dispatch(fetchNewsStart(requestObj)),
})

TopNewsPage.defaultProps = {
  newsData: [],
  fetchingNews: false,
  errorMessage: null,
  fetchNewsStart: null,
  country: 'gb',
}

TopNewsPage.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.object),
  fetchingNews: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchNewsStart: PropTypes.func,
  country: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNewsPage)
