import React from 'react'
import './category-preview.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { selectNewsByCategory } from '../../redux/news/news.selectors'
import SmallNewsThumbnail from '../small-news-thumbnail/small-news-thumbnail.component'

class CategoryPreview extends React.Component {
  state = {
    currentStartIndex: 0,
  }

  handleSwipe = (value) => {
    if (value === 'left') {
      this.setState((prevState) => ({
        currentStartIndex: prevState.currentStartIndex - 1,
      }))
    } else if (value === 'right') {
      this.setState((prevState) => ({
        currentStartIndex: prevState.currentStartIndex + 1,
      }))
    }
  }

  // Determine the class to apply based on the index of the element
  calculateClass = (index) => {
    const { currentStartIndex } = this.state
    let classValue

    if (index < currentStartIndex - 1 || index > currentStartIndex + 5) {
      classValue = 'hidden'
    }

    if (index === currentStartIndex - 1) {
      classValue = 'previous'
    }

    if (index === currentStartIndex + 5) {
      classValue = 'next'
    }

    return classValue
  }

  render() {
    const { category, newsByCategory, className } = this.props
    const { currentStartIndex } = this.state
    const { length } = newsByCategory[category]

    return (
      <div
        data-testid="category-preview-container"
        className={`category-preview-container ${className}`}
      >
        <button
          data-testid="prev-button"
          type="button"
          className="swipe-button"
          onClick={() => {
            this.handleSwipe('left')
          }}
          disabled={currentStartIndex === 0}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div className="category-thumbnails">
          {newsByCategory[category].map((newsObj, index) => (
            <SmallNewsThumbnail
              className={this.calculateClass(index)}
              key={newsObj.url}
              newsObj={newsObj}
            />
          ))}
        </div>
        <button
          data-testid="next-button"
          type="button"
          className="swipe-button"
          onClick={() => {
            this.handleSwipe('right')
          }}
          disabled={currentStartIndex + 4 >= length - 1}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  newsByCategory: selectNewsByCategory(state),
})

CategoryPreview.defaultProps = {
  category: null,
  newsByCategory: {},
  className: null,
}

CategoryPreview.propTypes = {
  category: PropTypes.string,
  newsByCategory: PropTypes.objectOf(PropTypes.array),
  className: PropTypes.string,
}

export default connect(mapStateToProps)(CategoryPreview)
