import React from 'react'
import './news-list.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectNewsData,
  selectNewsByCategory,
} from '../../redux/news/news.selectors'
import NewsThumbnail from '../news-thumbnail/news-thumbnail.component'

class NewsList extends React.Component {
  value = ''

  render() {
    const { newsData, newsByCategory, category } = this.props

    return (
      <div className="news-list-container">
        <div className="row">
          {category
            ? newsByCategory[category].map((newsItem) => (
                <NewsThumbnail key={newsItem.url} newsObj={newsItem} />
              ))
            : newsData.map((newsItem) => (
                <NewsThumbnail key={newsItem.url} newsObj={newsItem} />
              ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  newsData: selectNewsData(state),
  newsByCategory: selectNewsByCategory(state),
})

NewsList.defaultProps = {
  newsData: [],
  newsByCategory: null,
  category: null,
}

NewsList.propTypes = {
  newsData: PropTypes.arrayOf(PropTypes.object),
  newsByCategory: PropTypes.objectOf(PropTypes.array),
  category: PropTypes.string,
}

export default connect(mapStateToProps)(NewsList)
