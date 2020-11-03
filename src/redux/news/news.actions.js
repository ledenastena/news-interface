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

export const setCountry = (country) => ({
  type: newsActionTypes.SET_COUNTRY,
  payload: country,
})

export const fetchNewsByCategoryStart = (country) => ({
  type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_START,
  payload: country,
})

export const fetchNewsByCategorySuccess = (data) => ({
  type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_SUCCESS,
  payload: data,
})

export const fetchNewsByCategoryFailure = (errorMsg) => ({
  type: newsActionTypes.FETCH_NEWS_BY_CATEGORY_FAILURE,
  payload: errorMsg,
})

export const clearNews = () => ({
  type: newsActionTypes.CLEAR_NEWS,
})

export const clearNewsByCategory = () => ({
  type: newsActionTypes.CLEAR_NEWS_BY_CATEGORY,
})
