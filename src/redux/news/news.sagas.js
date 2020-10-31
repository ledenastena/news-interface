import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'
import newsActionTypes from './news.types'
import { fetchNewsSuccess, fetchNewsFailure } from './news.actions'

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
