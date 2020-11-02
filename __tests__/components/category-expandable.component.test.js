import React from 'react'
import { render, fireEvent } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import CategoryExpandable from '../../src/components/category-expandable/category-expandable.component'

it('', () => {
  const initialState = {
    news: {
      newsByCategory: {
        business: [
          {
            url: '123',
            title: 'Title one',
          },
          {
            url: '223',
            title: 'Title two',
          },
        ],
      },
    },
  }
  const { getByTestId } = render(<CategoryExpandable category="business" />, {
    initialState,
  })

  // Initially the full view component should have 'collapsed' class applied which means that it is not visible to the user
  expect(getByTestId('category-full-view-container')).toHaveClass('collapsed')

  fireEvent.click(getByTestId('expand-button'))

  // Clicking the button shows the full view component to the user
  expect(getByTestId('category-full-view-container')).not.toHaveClass(
    'collapsed'
  )
})
