import SagaTester from 'redux-saga-tester'
import mockAxios from 'axios'
import {
  onFetchNewsStart,
  onFetchNewsByCategoryStart,
} from '../../../src/redux/news/news.sagas'
import newsReducer from '../../../src/redux/news/news.reducer'
import newsActionTypes from '../../../src/redux/news/news.types'

describe('testing the top news fetching saga', () => {
  const initialState = {
    reducer: {
      newsData: [],
      fetchingNews: false,
      errorMessage: null,
      country: 'gb',
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: newsReducer },
  })

  sagaTester.start(onFetchNewsStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('should test top news fetching saga success', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { articles: ['article1', 'article2'] } })
    )

    // State gets initialized properly
    expect(sagaTester.getState()).toEqual(initialState)

    sagaTester.dispatch({
      type: newsActionTypes.FETCH_NEWS_START,
      payload: { country: 'gb' },
    })

    // State reflects that fetching is taking place
    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        fetchingNews: true,
      },
    })

    await sagaTester.waitFor(newsActionTypes.FETCH_NEWS_SUCCESS)

    // The data from the API gets stored
    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        newsData: ['article1', 'article2'],
      },
    })

    // Actions get called only once
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_START)).toBe(1)
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_SUCCESS)).toBe(1)

    // One API request is made
    expect(mockAxios.get.mock.calls.length).toBe(1)
    // With parameters properly passed
    expect(mockAxios.get.mock.calls[0][0]).toBe(
      `${process.env.API_URL}?country=gb`
    )
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 11111111',
      },
    })
  })

  it('should test top news fetching saga failure', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Error message'))
    )

    sagaTester.dispatch({
      type: newsActionTypes.FETCH_NEWS_START,
      payload: { country: 'gb' },
    })

    await sagaTester.waitFor(newsActionTypes.FETCH_NEWS_FAILURE)

    // In the case of failure error message gets stored in the state
    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        errorMessage: 'Error message',
      },
    })

    // Actions are called only once
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_START)).toBe(1)
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_FAILURE)).toBe(1)

    // API call is made only once
    expect(mockAxios.get.mock.calls.length).toBe(1)
    // API request is made with proper parameters
    expect(mockAxios.get.mock.calls[0][0]).toBe(
      `${process.env.API_URL}?country=gb`
    )
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 11111111',
      },
    })
  })
})

describe('test fetching news by category saga', () => {
  const initialState = {
    reducer: {
      country: 'gb',
      newsByCategory: {},
      fetchingNewsByCategory: false,
      errorMessageByCategory: null,
      categories: [],
    },
  }
  const sagaTester = new SagaTester({
    initialState,
    reducers: { reducer: newsReducer },
  })

  sagaTester.start(onFetchNewsByCategoryStart)

  afterEach(() => {
    sagaTester.reset(true)
  })

  it('should make multiple API requests and store retrieved data', async () => {
    // The response we will mock
    const articles = [
      {
        url: '31',
        title: 'Other title one',
      },
      {
        url: '32',
        title: 'Other title two',
      },
    ]

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          articles,
        },
      })
    )

    // Checking if initial state is correct
    expect(sagaTester.getState()).toEqual(initialState)

    sagaTester.dispatch({
      type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_START,
      payload: 'gb',
    })

    // Checking if the state reflects that fetching is taking place
    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        fetchingNewsByCategory: true,
      },
    })

    await sagaTester.waitFor(newsActionTypes.FETCH_NEWS_BY_CATEGORY_SUCCESS)

    // After successfully fetching data the reducer should have the data stored
    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        newsByCategory: {
          business: articles,
          entertainment: articles,
          general: articles,
          health: articles,
          science: articles,
          sports: articles,
          technology: articles,
        },
        categories: [
          'business',
          'entertainment',
          'general',
          'health',
          'science',
          'sports',
          'technology',
        ],
      },
    })

    // Actions were called only once
    expect(
      sagaTester.numCalled(newsActionTypes.FETCH_NEWS_BY_CATEGORY_START)
    ).toBe(1)
    expect(
      sagaTester.numCalled(newsActionTypes.FETCH_NEWS_BY_CATEGORY_SUCCESS)
    ).toBe(1)

    // We expect 7 API calls, one for every available category
    expect(mockAxios.get.mock.calls.length).toBe(7)

    // We check if request parameters get passed correctly
    expect(mockAxios.get.mock.calls[0][0]).toBe(
      `${process.env.API_URL}?country=gb&category=business`
    )
    expect(mockAxios.get.mock.calls[0][1]).toEqual({
      headers: {
        Authorization: 'Bearer 11111111',
      },
    })
    expect(mockAxios.get.mock.calls[1][0]).toBe(
      `${process.env.API_URL}?country=gb&category=entertainment`
    )
    expect(mockAxios.get.mock.calls[2][0]).toBe(
      `${process.env.API_URL}?country=gb&category=general`
    )
    expect(mockAxios.get.mock.calls[3][0]).toBe(
      `${process.env.API_URL}?country=gb&category=health`
    )
    expect(mockAxios.get.mock.calls[4][0]).toBe(
      `${process.env.API_URL}?country=gb&category=science`
    )
    expect(mockAxios.get.mock.calls[5][0]).toBe(
      `${process.env.API_URL}?country=gb&category=sports`
    )
    expect(mockAxios.get.mock.calls[6][0]).toBe(
      `${process.env.API_URL}?country=gb&category=technology`
    )
  })

  it('should handle API error', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.reject(new Error('Error message'))
    )

    sagaTester.dispatch({
      type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_START,
      payload: 'gb',
    })

    await sagaTester.waitFor(newsActionTypes.FETCH_NEWS_BY_CATEGORY_FAILURE)

    // We expect the error message to be set and no news data
    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        errorMessageByCategory: 'Error message',
      },
    })

    // Actions were called only once
    expect(
      sagaTester.numCalled(newsActionTypes.FETCH_NEWS_BY_CATEGORY_START)
    ).toBe(1)
    expect(
      sagaTester.numCalled(newsActionTypes.FETCH_NEWS_BY_CATEGORY_FAILURE)
    ).toBe(1)

    // API requests are made parallel so we still expect for all 7 to have been made
    expect(mockAxios.get.mock.calls.length).toBe(7)
  })
})
