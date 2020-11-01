import newsReducer from '../../../src/redux/news/news.reducer'
import newsActionTypes from '../../../src/redux/news/news.types'

describe('news reducer tests', () => {
  const initialState = {
    newsData: [],
    fetchingNews: false,
    errorMessage: null,
    country: 'gb',
  }

  it('should initialize sate properly', () => {
    expect(newsReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle action FETCH_NEWS_START', () => {
    const inputState = {
      ...initialState,
      errorMessage: 'Some message',
    }

    const expectedState = {
      ...initialState,
      fetchingNews: true,
      errorMessage: null,
    }

    expect(
      newsReducer(inputState, { type: newsActionTypes.FETCH_NEWS_START })
    ).toEqual(expectedState)
  })

  it('should handle action FETCH_NEWS_SUCCESS', () => {
    const inputState = {
      ...initialState,
      fetchingNews: true,
    }

    const expectedState = {
      ...initialState,
      newsData: ['article1', 'article2'],
      fetchingNews: false,
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.FETCH_NEWS_SUCCESS,
        payload: ['article1', 'article2'],
      })
    ).toEqual(expectedState)
  })

  it('should handle action FETCH_NEWS_FAILURE', () => {
    const inputState = {
      ...initialState,
      fetchingNews: true,
    }

    const expectedState = {
      ...initialState,
      fetchingNews: false,
      errorMessage: 'Some message',
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.FETCH_NEWS_FAILURE,
        payload: 'Some message',
      })
    ).toEqual(expectedState)
  })

  it('should handle action SET_COUNTRY', () => {
    const inputState = {
      ...initialState,
    }

    const expectedState = {
      ...initialState,
      country: 'us',
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.SET_COUNTRY,
        payload: 'us',
      })
    ).toEqual(expectedState)
  })
})
