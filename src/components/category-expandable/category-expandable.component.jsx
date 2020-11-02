import React from 'react'
import './category-expandable.styles.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import CategoryPreview from '../category-preview/category-preview.component'
import CategoryFullView from '../category-full-view/category-full-view.component'

class CategoryExpandable extends React.Component {
  state = {
    expanded: false,
  }

  handleExpand = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }))
  }

  capitalize = (string) => `${string[0].toUpperCase()}${string.slice(1)}`

  render() {
    const { category } = this.props
    const { expanded } = this.state

    return (
      <div className="category-expandable-container">
        <div className="category-headline">
          &bull; {this.capitalize(category)}
          <button
            data-testid="expand-button"
            type="button"
            className="expand-button"
            onClick={this.handleExpand}
          >
            <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} />
          </button>
        </div>
        <CategoryPreview
          category={category}
          className={`${expanded && 'invisible'}`}
        />
        <CategoryFullView
          category={category}
          className={`${!expanded && 'collapsed'}`}
        />
      </div>
    )
  }
}

CategoryExpandable.defaultProps = {
  category: null,
}

CategoryExpandable.propTypes = {
  category: PropTypes.string,
}

export default CategoryExpandable
