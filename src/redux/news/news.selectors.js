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

export const selectCountry = createSelector(
  [selectNews],
  (news) => news.country
)

export const selectNewsByCategory = createSelector(
  [selectNews],
  (news) => news.newsByCategory
)

export const selectFetchingNewsByCategory = createSelector(
  [selectNews],
  (news) => news.fetchingNewsByCategory
)

export const selectErrorMessageByCategory = createSelector(
  [selectNews],
  (news) => news.errorMessageByCategory
)

export const selectCategories = createSelector(
  [selectNews],
  (news) => news.categories
)
