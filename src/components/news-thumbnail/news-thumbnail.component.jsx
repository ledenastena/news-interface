import React from 'react'
import './news-thumbnail.styles.scss'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import LoadingImage from '../loading-image/loading-image.component'

const NewsThumbnail = ({ newsObj, location }) => (
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
      to={{
        pathname: '/article',
        state: { newsObj, prevPath: location.pathname },
      }}
    >
      More &gt;
    </Link>
  </div>
)

NewsThumbnail.defaultProps = {
  newsObj: null,
  location: null,
}

NewsThumbnail.propTypes = {
  newsObj: PropTypes.shape({
    title: PropTypes.string,
    urlToImage: PropTypes.string,
    description: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default withRouter(NewsThumbnail)
