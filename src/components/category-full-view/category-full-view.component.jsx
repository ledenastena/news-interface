import React from 'react'
import './category-full-view.styles.scss'
import PropTypes from 'prop-types'
import NewsList from '../news-list/news-list.component'

class CategoryFullView extends React.Component {
  value = ''

  render() {
    const { category, className } = this.props

    return (
      <div
        data-testid="category-full-view-container"
        className={`category-full-view-container ${className}`}
      >
        <NewsList category={category} />
      </div>
    )
  }
}

CategoryFullView.defaultProps = {
  category: null,
  className: null,
}

CategoryFullView.propTypes = {
  category: PropTypes.string,
  className: PropTypes.string,
}

export default CategoryFullView
