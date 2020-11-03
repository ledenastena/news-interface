import newsReducer from '../../../src/redux/news/news.reducer'
import newsActionTypes from '../../../src/redux/news/news.types'

describe('news reducer tests', () => {
  const initialState = {
    newsData: [],
    fetchingNews: false,
    errorMessage: null,
    country: 'gb',
    newsByCategory: {},
    fetchingNewsByCategory: false,
    errorMessageByCategory: null,
    categories: [],
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

  it('should handle action FETCH_NEWS_BY_CATEGORY_START', () => {
    const inputState = {
      ...initialState,
      errorMessageByCategory: 'Some message',
    }

    const expectedState = {
      ...initialState,
      fetchingNewsByCategory: true,
      errorMessageByCategory: null,
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_START,
      })
    ).toEqual(expectedState)
  })

  it('should handle action FETCH_NEWS_BY_CATEGORY_SUCCESS', () => {
    const inputState = {
      ...initialState,
      fetchingNewsByCategory: true,
    }

    const expectedState = {
      ...initialState,
      newsByCategory: { business: ['article1', 'article2'] },
      fetchingNews: false,
      categories: ['business'],
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_SUCCESS,
        payload: { business: ['article1', 'article2'] },
      })
    ).toEqual(expectedState)
  })

  it('should handle action FETCH_NEWS_BY_CATEGORY_FAILURE', () => {
    const inputState = {
      ...initialState,
      fetchingNewsByCategory: true,
    }

    const expectedState = {
      ...initialState,
      fetchingNewsByCategory: false,
      errorMessageByCategory: 'Some message',
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_FAILURE,
        payload: 'Some message',
      })
    ).toEqual(expectedState)
  })

  it('should handle action CLEAR_NEWS', () => {
    const inputState = {
      ...initialState,
      newsData: ['article1', 'article2'],
    }

    const expectedState = {
      ...initialState,
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.CLEAR_NEWS,
      })
    ).toEqual(expectedState)
  })

  it('should handle action CLEAR_NEWS_BY_CATEGORY', () => {
    const inputState = {
      ...initialState,
      newsByCategory: ['article1', 'article2'],
      categories: ['category1', 'category2'],
    }

    const expectedState = {
      ...initialState,
    }

    expect(
      newsReducer(inputState, {
        type: newsActionTypes.CLEAR_NEWS_BY_CATEGORY,
      })
    ).toEqual(expectedState)
  })
})
