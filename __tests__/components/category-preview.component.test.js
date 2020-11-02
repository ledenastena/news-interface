import React from 'react'
import { render, fireEvent } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import CategoryPreview from '../../src/components/category-preview/category-preview.component'

it('', () => {
  // We want to have enough articles to fill the container so we can test scrolling left and right
  const initialState = {
    news: {
      newsByCategory: {
        business: [
          {
            url: '111',
            title: 'Another title one',
          },
          {
            url: '112',
            title: 'Another title two',
          },
          {
            url: '113',
            title: 'Another title three',
          },
          {
            url: '114',
            title: 'Another title four',
          },
          {
            url: '115',
            title: 'Another title five',
          },
          {
            url: '116',
            title: 'Another title six',
          },
          {
            url: '117',
            title: 'Another title seven',
          },
        ],
      },
    },
  }
  const { getByTestId, getAllByTestId } = render(
    <CategoryPreview category="business" />,
    {
      initialState,
    }
  )

  // Initially the previous button should be disabled
  expect(getByTestId('prev-button')).toBeDisabled()

  // The 6-th article should have 'next' class so it can be scrolled into view while the 7-th has the class 'hidden'
  expect(getAllByTestId('small-news-thumbnail-container')[5]).toHaveClass(
    'next'
  )
  expect(getAllByTestId('small-news-thumbnail-container')[6]).toHaveClass(
    'hidden'
  )

  fireEvent.click(getByTestId('next-button'))

  expect(getByTestId('prev-button')).toBeEnabled()

  // After the click applied classes should change accordingly
  expect(getAllByTestId('small-news-thumbnail-container')[0]).toHaveClass(
    'previous'
  )
  expect(getAllByTestId('small-news-thumbnail-container')[5]).not.toHaveClass(
    'next'
  )
  expect(getAllByTestId('small-news-thumbnail-container')[6]).toHaveClass(
    'next'
  )

  fireEvent.click(getByTestId('next-button'))

  // After two clicks the next button should be disabled
  expect(getByTestId('next-button')).toBeDisabled()
})
