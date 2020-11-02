import React from 'react'
import './category-news-list.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectCategories } from '../../redux/news/news.selectors'
import CategoryExpandable from '../category-expandable/category-expandable.component'

const CategoryNewsList = ({ categories }) => (
  <div
    data-testid="category-news-list-container"
    className="category-news-list-container"
  >
    {categories.map((category) => (
      <CategoryExpandable key={category} category={category} />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  categories: selectCategories(state),
})

CategoryNewsList.defaultProps = {
  categories: {},
}

CategoryNewsList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
}

export default connect(mapStateToProps)(CategoryNewsList)
