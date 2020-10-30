import { createSelector } from 'reselect'

const selectNews = (state) => state.news

export const selectNewsData = createSelector(
  [selectNews],
  (news) => news.newsData
)

export const selectFetchingNews = createSelector(
  [selectNews],
  (news) => news.fetchingNews
)

export const selectErrorMessage = createSelector(
  [selectNews],
  (news) => news.errorMessage
)
