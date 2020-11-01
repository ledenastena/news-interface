import SagaTester from 'redux-saga-tester'
import mockAxios from 'axios'
import { onFetchNewsStart } from '../../../src/redux/news/news.sagas'
import newsReducer from '../../../src/redux/news/news.reducer'
import newsActionTypes from '../../../src/redux/news/news.types'

describe('testing the fetching saga', () => {
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

    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        fetchingNews: true,
      },
    })

    await sagaTester.waitFor(newsActionTypes.FETCH_NEWS_SUCCESS)

    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        newsData: ['article1', 'article2'],
      },
    })
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_START)).toBe(1)
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_SUCCESS)).toBe(1)
    expect(mockAxios.get.mock.calls.length).toBe(1)
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

    expect(sagaTester.getState()).toEqual({
      reducer: {
        ...initialState.reducer,
        errorMessage: 'Error message',
      },
    })
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_START)).toBe(1)
    expect(sagaTester.numCalled(newsActionTypes.FETCH_NEWS_FAILURE)).toBe(1)
    expect(mockAxios.get.mock.calls.length).toBe(1)
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
