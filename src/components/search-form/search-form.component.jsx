import React from 'react'
import './search-form.styles.scss'
import PropTypes from 'prop-types'

class SearchForm extends React.Component {
  state = {
    searchTerm: '',
  }

  handleChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  triggerSubmit = (e) => {
    const { handleSubmit } = this.props
    const { searchTerm } = this.state

    e.preventDefault()
    handleSubmit(searchTerm)
  }

  render() {
    const { searchTerm } = this.state

    return (
      <div className="search-form-container">
        <form onSubmit={this.triggerSubmit}>
          <input
            data-testid="search-field"
            id="search-field"
            aria-label="Search"
            type="text"
            placeholder="Search term..."
            required
            className="search-input-field"
            value={searchTerm}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

SearchForm.defaultProps = {
  handleSubmit: null,
}

SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
}

export default SearchForm
