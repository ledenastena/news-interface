import React from 'react'
import mockAxios from 'axios'
import userEvent from '@testing-library/user-event'
import { render, waitFor } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import SearchPage from '../../src/pages/search/search.component'

describe('testing SearchPage component', () => {
  it('should fire a request and display fetched results', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          articles: [
            { url: '112', title: 'Title one' },
            { url: '223', title: 'Title two' },
          ],
        },
      })
    )

    const { getByText, getByTestId, queryByTestId } = render(<SearchPage />)

    expect(getByTestId('initial-message')).toBeInTheDocument()

    userEvent.type(getByTestId('search-field'), 'basketball{enter}')

    // Fetching the data from the API, the user sees the loading element
    expect(getByTestId('loading-ring')).toBeInTheDocument()

    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    // When the loading element disappears it means data fetching is done and results should be displayed
    expect(getByText('Title one')).toBeInTheDocument()
    expect(getByText('Title two')).toBeInTheDocument()
  })

  it('should handle no results from the API', async () => {
    // No results found for this request
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { articles: [] } })
    )

    const { getByText, getByTestId, queryByTestId } = render(<SearchPage />)

    userEvent.type(getByTestId('search-field'), 'basketball{enter}')

    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    // Appropriate message should be displayed
    expect(getByText('No results found')).toBeInTheDocument()
  })

  it('should handle API error', async () => {
    // API error
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error('API error'))
    )

    const { getByText, getByTestId, queryByTestId } = render(<SearchPage />)

    userEvent.type(getByTestId('search-field'), 'basketball{enter}')

    await waitFor(() => {
      expect(queryByTestId('loading-ring')).toBeNull()
    })

    expect(
      getByText('An error occurred while trying to fetch data: API error')
    ).toBeInTheDocument()
  })
})
