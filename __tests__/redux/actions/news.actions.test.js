import {
  fetchNewsStart,
  fetchNewsSuccess,
  fetchNewsFailure,
  setCountry,
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
})
