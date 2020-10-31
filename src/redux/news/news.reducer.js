import newsActionTypes from './news.types'

const INITIAL_STATE = {
  newsData: [],
  fetchingNews: false,
  errorMessage: null,
  country: 'gb',
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
    default:
      return state
  }
}

export default newsReducer
