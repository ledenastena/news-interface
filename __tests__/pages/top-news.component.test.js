import React from 'react'
import mockAxios from 'axios'
import { render, waitFor } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import TopNewsPage from '../../src/pages/top-news/top-news.component'

describe('testing the top news page', () => {
  it('should fetch the top news data', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          articles: [
            { title: 'article1', url: '123' },
            { title: 'article2', url: '456' },
          ],
        },
      })
    )
    const { getByTestId, getAllByTestId, queryByTestId, getByText } = render(
      <TopNewsPage />
    )

    // First we expect the loader to appear and show the user that fetching of data is happening
    expect(getByTestId('loading-ring')).toBeInTheDocument()

    // When the fetching is done, the loader should dissappear
    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    // Two articles should be displayed and we find them by their titles
    expect(getAllByTestId('news-thumbnail-container').length).toBe(2)
    expect(getByText('article1')).toBeInTheDocument()
    expect(getByText('article2')).toBeInTheDocument()
  })

  it('should show the error message when an API error occurres', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('Error message'))
    )

    const { queryByTestId, getByText } = render(<TopNewsPage />)

    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    // We expect the error message to be displayed
    expect(
      getByText('An error occurred while trying to fetch data: Error message')
    ).toBeInTheDocument()
    // and no news thumbnails on the page
    expect(queryByTestId('news-thumbnail-container')).toBeNull()
  })

  it('should show No news found notification when we get no results from the API but no error occurred', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { articles: [] } })
    )

    const { getByText, queryByTestId } = render(<TopNewsPage />)

    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    // The notification should be displayed
    expect(getByText('No relevant news found')).toBeInTheDocument()
    // and no news thumbnails
    expect(queryByTestId('news-thumbnail-container')).toBeNull()
  })
})
