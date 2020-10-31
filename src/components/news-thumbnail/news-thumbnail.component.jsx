import React from 'react'
import './news-thumbnail.styles.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NewsThumbnail = ({ newsObj }) => (
  <div className="news-thumbnail-container">
    <div className="news-thumbnail-title">{newsObj.title}</div>
    <img
      className="news-thumbnail-image"
      src={newsObj.urlToImage}
      alt={newsObj.title}
    />
    <div className="news-thumbnail-description">{newsObj.description}</div>
    <Link to="/article">More</Link>
  </div>
)

NewsThumbnail.defaultProps = {
  newsObj: null,
}

NewsThumbnail.propTypes = {
  newsObj: PropTypes.shape({
    title: PropTypes.string,
    urlToImage: PropTypes.string,
    description: PropTypes.string,
  }),
}

export default NewsThumbnail
