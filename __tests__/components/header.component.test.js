import React from 'react'
import { render, fireEvent } from '../test-utils'
import '@testing-library/jest-dom/extend-expect'
import Header from '../../src/components/header/header.component'

describe('testing header component', () => {
  it('should visualy show which country is selected and which page is active', () => {
    const { getByText } = render(<Header />)

    expect(getByText('US')).not.toHaveClass('selected')
    fireEvent.click(getByText('US'))
    expect(getByText('US')).toHaveClass('selected')

    // initially the active page is Top News and the link should have appropriate styles
    expect(getByText('Top News')).toHaveClass('selected')

    fireEvent.click(getByText('Categories'))
    // After we click on the link for Categories page, the styles should be applied to that link
    expect(getByText('Categories')).toHaveClass('selected')
  })

  it('should open and close menu dropdown', () => {
    const { getByTestId, queryByTestId } = render(<Header />)

    // initially the menu dropdown is not shown
    expect(queryByTestId('menu-dropdown')).toBeNull()

    fireEvent.click(getByTestId('hamburger-menu-button'))
    // After we click the hamburger menu button the dropdown should appear
    expect(getByTestId('menu-dropdown')).toBeInTheDocument()

    // and after a click (mousedown event) somewhere on the page
    fireEvent.mouseDown(document)
    // the dropdown should again disappear
    expect(queryByTestId('menu-dropdown')).toBeNull()
  })
})
