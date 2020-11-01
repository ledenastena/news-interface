import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import NewsThumbnail from '../../src/components/news-thumbnail/news-thumbnail.component'

it('should render NewsThumbnail correctly', () => {
  const newsObj = {
    title: 'article1',
    url: '123',
    urlToImage: '333',
    description: 'Article one descriprion',
  }
  const { container } = render(
    <MemoryRouter>
      <NewsThumbnail newsObj={newsObj} />
    </MemoryRouter>
  )
  expect(container.firstChild).toMatchSnapshot()
})
