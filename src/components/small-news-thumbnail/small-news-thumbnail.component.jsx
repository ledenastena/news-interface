import React from 'react'
import './small-news-thumbnail.styles.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoadingImage from '../loading-image/loading-image.component'

const SmallNewsThumbnail = ({ newsObj, className }) => (
  <div
    data-testid="small-news-thumbnail-container"
    className={`small-news-thumbnail-container ${className || ''}`}
  >
    <Link
      className="read-more-link"
      to={{ pathname: '/article', state: { newsObj } }}
    >
      <div className="small-news-thumbnail-title">{newsObj.title}</div>
      <LoadingImage
        className="small-news-thumbnail-image"
        imageUrl={newsObj.urlToImage}
        imageTitle={newsObj.title}
      />
    </Link>
  </div>
)

SmallNewsThumbnail.defaultProps = {
  newsObj: null,
  className: null,
}

SmallNewsThumbnail.propTypes = {
  newsObj: PropTypes.shape({
    title: PropTypes.string,
    urlToImage: PropTypes.string,
  }),
  className: PropTypes.string,
}

export default SmallNewsThumbnail
