import React from 'react'
import './search.styles.scss'
import SmallLoading from '../../components/small-loading/small-loading.component'

class SearchPage extends React.Component {
  value = ''

  render() {
    return (
      <div className="search-page-container">
        <h1>This is the Search page</h1>
        <SmallLoading />
      </div>
    )
  }
}

export default SearchPage
