import React from 'react'
import './news-thumbnail.styles.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoadingImage from '../loading-image/loading-image.component'

const NewsThumbnail = ({ newsObj }) => (
  <div
    data-testid="news-thumbnail-container"
    className="news-thumbnail-container col-l-4 col-m-6 col-s-6"
  >
    <div className="news-thumbnail-title">{newsObj.title}</div>
    <LoadingImage
      className="news-thumbnail-image"
      imageUrl={newsObj.urlToImage}
      imageTitle={newsObj.title}
    />
    <div className="news-thumbnail-description">{newsObj.description}</div>
    <Link
      className="read-more-link"
      to={{ pathname: '/article', state: { newsObj } }}
    >
      More &gt;
    </Link>
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
