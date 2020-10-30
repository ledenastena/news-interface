import newsActionTypes from './news.types'

export const fetchNewsStart = (requestObj) => ({
  type: newsActionTypes.FETCH_NEWS_START,
  payload: requestObj,
})

export const fetchNewsSuccess = (data) => ({
  type: newsActionTypes.FETCH_NEWS_SUCCESS,
  payload: data,
})

export const fetchNewsFailure = (errorMsg) => ({
  type: newsActionTypes.FETCH_NEWS_FAILURE,
  payload: errorMsg,
})
