import React from 'react'
import './category-news-list.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectCategories,
  selectCountry,
} from '../../redux/news/news.selectors'
import CategoryExpandable from '../category-expandable/category-expandable.component'

const CategoryNewsList = ({ categories, country }) => (
  <div
    data-testid="category-news-list-container"
    className="category-news-list-container"
  >
    <div className="category-news-heading">
      Top 5 news by categories from {country.toUpperCase()}
    </div>
    {categories.map((category) => (
      <CategoryExpandable key={category} category={category} />
    ))}
  </div>
)

const mapStateToProps = (state) => ({
  categories: selectCategories(state),
  country: selectCountry(state),
})

CategoryNewsList.defaultProps = {
  categories: {},
  country: null,
}

CategoryNewsList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  country: PropTypes.string,
}

export default connect(mapStateToProps)(CategoryNewsList)
