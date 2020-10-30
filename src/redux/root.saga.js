import { call, all } from 'redux-saga/effects'
import { onFetchNewsStart } from './news/news.sagas'

export default function* rootSaga() {
  yield all([call(onFetchNewsStart)])
}
