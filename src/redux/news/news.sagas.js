import { takeLatest, put, call, all } from 'redux-saga/effects'
import axios from 'axios'
import newsActionTypes from './news.types'
import {
  fetchNewsSuccess,
  fetchNewsFailure,
  fetchNewsByCategorySuccess,
  fetchNewsByCategoryFailure,
} from './news.actions'

export function* fetchNewsStartAsync(action) {
  try {
    const response = yield axios.get(
      `${process.env.API_URL}?country=${action.payload.country}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )
    yield put(fetchNewsSuccess(response.data.articles))
  } catch (e) {
    yield put(fetchNewsFailure(e.message))
  }
}

export function* onFetchNewsStart() {
  yield takeLatest(newsActionTypes.FETCH_NEWS_START, fetchNewsStartAsync)
}

export function* fetchByCategoryAsync(country, category) {
  const response = yield axios.get(
    `${process.env.API_URL}?country=${country}&category=${category}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    }
  )

  return response.data.articles
}

export function* fetchParallel(action) {
  try {
    const country = action.payload
    const [
      business,
      // entertainment,
      // general,
      // health,
      // science,
      // sports,
      // technology,
    ] = yield all([
      call(fetchByCategoryAsync, country, 'business'),
      // call(fetchByCategoryAsync, country, 'entertainment'),
      // call(fetchByCategoryAsync, country, 'general'),
      // call(fetchByCategoryAsync, country, 'health'),
      // call(fetchByCategoryAsync, country, 'science'),
      // call(fetchByCategoryAsync, country, 'sports'),
      // call(fetchByCategoryAsync, country, 'technology'),
    ])

    yield put(
      fetchNewsByCategorySuccess({
        business,
        // entertainment,
        // general,
        // health,
        // science,
        // sports,
        // technology,
      })
    )
  } catch (e) {
    yield put(fetchNewsByCategoryFailure(e.message))
  }
}

export function* onFetchNewsByCategoryStart() {
  yield takeLatest(newsActionTypes.FETCH_NEWS_BY_CATEGORY_START, fetchParallel)
}
