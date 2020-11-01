import React from 'react'
import { render, fireEvent } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Header from '../../src/components/header/header.component'

it('should visualy show which country is selected', () => {
  const { getByText } = render(<Header />)

  expect(getByText('US')).not.toHaveClass('selected')
  fireEvent.click(getByText('US'))
  expect(getByText('US')).toHaveClass('selected')
})
