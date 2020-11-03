import React from 'react'
import './article.styles.scss'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoadingImage from '../../components/loading-image/loading-image.component'

const ArticlePage = ({ location }) => {
  const { newsObj } = location.state || { newsObj: null }

  if (!newsObj) {
    return (
      <div className="article-container">
        <div className="article-error-message">
          Please select an article from the list
        </div>
      </div>
    )
  }

  return (
    <div className="article-container">
      <div className="article-title">{newsObj.title}</div>
      <LoadingImage
        className="article-image"
        imageUrl={newsObj.urlToImage}
        imageTitle={newsObj.title}
      />
      <div className="article-content">{newsObj.content}</div>
      <Link className="back-to-list-link" to={location.state.prevPath}>
        Back to list
      </Link>
    </div>
  )
}

ArticlePage.defaultProps = {
  location: null,
}

ArticlePage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      newsObj: PropTypes.shape({
        title: PropTypes.string,
        urlToImage: PropTypes.string,
        content: PropTypes.string,
      }),
      prevPath: PropTypes.string,
    }),
  }),
}

export default ArticlePage
