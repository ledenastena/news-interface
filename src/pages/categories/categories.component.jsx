import React from 'react'
import './categories.styles.scss'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectCountry,
  selectNewsByCategory,
  selectFetchingNewsByCategory,
  selectErrorMessageByCategory,
} from '../../redux/news/news.selectors'
import { fetchNewsByCategoryStart } from '../../redux/news/news.actions'
import Loading from '../../components/loading/loading.component'
import CategoryNewsList from '../../components/category-news-list/category-news-list.component'

class CategoriesPage extends React.Component {
  componentDidMount() {
    const { country, fetchNewsByCategoryStart } = this.props
    fetchNewsByCategoryStart(country)
  }

  render() {
    const {
      newsByCategory,
      fetchingNewsByCategory,
      errorMessageByCategory,
    } = this.props

    if (fetchingNewsByCategory) {
      return (
        <div className="categories-page-container">
          <Loading />
        </div>
      )
    }

    if (errorMessageByCategory) {
      return (
        <div className="categories-page-container">
          <div className="categories-page-error">
            An error occurred while trying to fetch data:{' '}
            {errorMessageByCategory}
          </div>
        </div>
      )
    }

    if (Object.entries(newsByCategory).length === 0) {
      return (
        <div className="categories-page-container">No relevant news found</div>
      )
    }

    return (
      <div className="categories-page-container">
        <CategoryNewsList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  country: selectCountry(state),
  newsByCategory: selectNewsByCategory(state),
  fetchingNewsByCategory: selectFetchingNewsByCategory(state),
  errorMessageByCategory: selectErrorMessageByCategory(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchNewsByCategoryStart: (country) =>
    dispatch(fetchNewsByCategoryStart(country)),
})

CategoriesPage.defaultProps = {
  country: 'gb',
  newsByCategory: {},
  fetchingNewsByCategory: false,
  errorMessageByCategory: null,
  fetchNewsByCategoryStart: null,
}

CategoriesPage.propTypes = {
  country: PropTypes.string,
  newsByCategory: PropTypes.objectOf(PropTypes.array),
  fetchingNewsByCategory: PropTypes.bool,
  errorMessageByCategory: PropTypes.string,
  fetchNewsByCategoryStart: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesPage)
