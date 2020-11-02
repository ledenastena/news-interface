import React from 'react'
import mockAxios from 'axios'
import { render, waitFor } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import CategoriesPage from '../../src/pages/categories/categories.component'

describe('', () => {
  it('', async () => {
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: {
          articles: [
            {
              url: '123',
              title: 'Title one',
            },
            {
              url: '456',
              title: 'Title two',
            },
          ],
        },
      })
    )

    const { getByTestId, queryByTestId, getAllByTestId } = render(
      <CategoriesPage />
    )

    // Loading spinner is displayed to the UI giving information that fetching of data is taking place
    expect(getByTestId('loading-ring')).toBeInTheDocument()
    // and no news elements are displayed
    expect(queryByTestId('category-news-list-container')).toBeNull()

    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    // When the fetching is successfully finished the news container should be displayed
    expect(getByTestId('category-news-list-container')).toBeInTheDocument()

    // There should be one category preview for each available news category
    expect(getAllByTestId('category-preview-container').length).toBe(7)
  })
})
