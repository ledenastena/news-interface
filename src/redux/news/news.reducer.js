import newsActionTypes from './news.types'

const INITIAL_STATE = {
  newsData: [],
  fetchingNews: false,
  errorMessage: null,
  country: 'gb',
  newsByCategory: {},
  fetchingNewsByCategory: false,
  errorMessageByCategory: null,
  categories: [],
}

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case newsActionTypes.FETCH_NEWS_START:
      return {
        ...state,
        fetchingNews: true,
        errorMessage: null,
      }
    case newsActionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        newsData: action.payload,
        fetchingNews: false,
      }
    case newsActionTypes.FETCH_NEWS_FAILURE:
      return {
        ...state,
        fetchingNews: false,
        errorMessage: action.payload,
      }
    case newsActionTypes.SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      }
    case newsActionTypes.FETCH_NEWS_BY_CATEGORY_START:
      return {
        ...state,
        fetchingNewsByCategory: true,
        errorMessageByCategory: null,
      }
    case newsActionTypes.FETCH_NEWS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        newsByCategory: action.payload,
        categories: Object.keys(action.payload),
        fetchingNewsByCategory: false,
      }
    case newsActionTypes.FETCH_NEWS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingNewsByCategory: false,
        errorMessageByCategory: action.payload,
      }
    case newsActionTypes.CLEAR_NEWS:
      return {
        ...state,
        newsData: [],
      }
    case newsActionTypes.CLEAR_NEWS_BY_CATEGORY:
      return {
        ...state,
        newsByCategory: {},
        categories: [],
      }
    default:
      return state
  }
}

export default newsReducer
