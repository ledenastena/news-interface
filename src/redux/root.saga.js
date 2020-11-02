import { call, all } from 'redux-saga/effects'
import { onFetchNewsStart, onFetchNewsByCategoryStart } from './news/news.sagas'

export default function* rootSaga() {
  yield all([call(onFetchNewsStart), call(onFetchNewsByCategoryStart)])
}
