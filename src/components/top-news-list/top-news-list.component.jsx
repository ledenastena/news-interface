import React from 'react'
import './top-news-list.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectNewsData } from '../../redux/news/news.selectors'
import NewsThumbnail from '../news-thumbnail/news-thumbnail.component'

class TopNewsList extends React.Component {
  value = ''

  render() {
    const { newsData } = this.props

    return (
      <div className="top-news-list-container">
        {newsData.map((newsItem) => (
          <NewsThumbnail key={newsItem.url} newsObj={newsItem} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  newsData: selectNewsData(state),
})

TopNewsList.defaultProps = {
  newsData: [],
}

TopNewsList.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.object),
}

export default connect(mapStateToProps)(TopNewsList)
