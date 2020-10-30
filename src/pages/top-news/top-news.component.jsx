import React from 'react'
import './top-news.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectNewsData } from '../../redux/news/news.selectors'
import { fetchNewsStart } from '../../redux/news/news.actions'

class TopNewsPage extends React.Component {
  componentDidMount() {
    const { fetchNewsStart } = this.props

    fetchNewsStart()
  }

  render() {
    const { newsData } = this.props

    return (
      <div className="top-news-page-container">
        <h1>This is the Top News page</h1>
        {newsData.map((newsItem) => (
          <div key={newsItem.url}>{newsItem.title}</div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  newsData: selectNewsData(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchNewsStart: (requestObj) => dispatch(fetchNewsStart(requestObj)),
})

TopNewsPage.defaultProps = {
  newsData: [],
  fetchNewsStart: null,
}

TopNewsPage.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.object),
  fetchNewsStart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNewsPage)
