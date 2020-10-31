import React from 'react'
import './top-news.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectNewsData,
  selectFetchingNews,
  selectErrorMessage,
} from '../../redux/news/news.selectors'
import { fetchNewsStart } from '../../redux/news/news.actions'
import TopNewsList from '../../components/top-news-list/top-news-list.component'

class TopNewsPage extends React.Component {
  componentDidMount() {
    const { fetchNewsStart } = this.props

    fetchNewsStart()
  }

  render() {
    const { newsData, fetchingNews, errorMessage } = this.props

    if (fetchingNews) {
      return <div className="top-news-page-container">Loading...</div>
    }

    if (errorMessage) {
      return <div className="top-news-page-container">{errorMessage}</div>
    }

    if (!newsData.length) {
      return (
        <div className="top-news-page-container">No relevant news found</div>
      )
    }

    return (
      <div className="top-news-page-container">
        <TopNewsList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  newsData: selectNewsData(state),
  fetchingNews: selectFetchingNews(state),
  errorMessage: selectErrorMessage(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchNewsStart: (requestObj) => dispatch(fetchNewsStart(requestObj)),
})

TopNewsPage.defaultProps = {
  newsData: [],
  fetchingNews: false,
  errorMessage: null,
  fetchNewsStart: null,
}

TopNewsPage.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.object),
  fetchingNews: PropTypes.bool,
  errorMessage: PropTypes.string,
  fetchNewsStart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNewsPage)
