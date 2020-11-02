import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  setCountry,
  fetchNewsByCategoryStart,
  fetchNewsByCategorySuccess,
  fetchNewsByCategoryFailure,
} from '../../../src/redux/news/news.actions'
import newsActionTypes from '../../../src/redux/news/news.types'

describe('news action creators', () => {
  it('should create an action object for initiating fetching of top news', () => {
    const requestObj = { country: 'gb' }
    expect(fetchNewsStart(requestObj)).toEqual({
      type: newsActionTypes.FETCH_NEWS_START,
      payload: requestObj,
    })
  })

  it('should create an action object for success of fetching top news', () => {
    const response = ['article1', 'article2']
    expect(fetchNewsSuccess(response)).toEqual({
      type: newsActionTypes.FETCH_NEWS_SUCCESS,
      payload: response,
    })
  })

  it('should create an action object for failure of fetching top news', () => {
    const errorMessage = 'Error message'
    expect(fetchNewsFailure(errorMessage)).toEqual({
      type: newsActionTypes.FETCH_NEWS_FAILURE,
      payload: errorMessage,
    })
  })

  it('should create an action object for setting the country for fetching top news', () => {
    const country = 'us'
    expect(setCountry(country)).toEqual({
      type: newsActionTypes.SET_COUNTRY,
      payload: country,
    })
  })

  it('should create an action object for initiating fetching of news by categories', () => {
    const country = 'gb'
    expect(fetchNewsByCategoryStart(country)).toEqual({
      type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_START,
      payload: country,
    })
  })

  it('should create an action object for success of fetching news by categories', () => {
    const response = ['article1', 'article2']
    expect(fetchNewsByCategorySuccess(response)).toEqual({
      type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_SUCCESS,
      payload: response,
    })
  })

  it('should create an action object for failure of fetching news by categories', () => {
    const errorMessage = 'Error message'
    expect(fetchNewsByCategoryFailure(errorMessage)).toEqual({
      type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_FAILURE,
      payload: errorMessage,
    })
  })
})
