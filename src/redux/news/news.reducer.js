import newsActionTypes from './news.types'

const INITIAL_STATE = {
  newsData: [
    {
      url: '114',
      title: 'This is news number 1',
    },
    {
      url: '222',
      title: 'Second news in the world of news',
    },
  ],
  fetchingNews: false,
  errorMessage: null,
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
    default:
      return state
  }
}

export default newsReducer
