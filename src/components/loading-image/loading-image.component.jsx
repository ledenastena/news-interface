import React from 'react'
import './loading-image.styles.scss'
import PropTypes from 'prop-types'
import imageNotFound from '../../assets/image-not-found.png'
import Loading from '../loading/loading.component'
import SmallLoading from '../small-loading/small-loading.component'

class LoadingImage extends React.Component {
  state = {
    loading: true,
  }

  handleLoad = () => {
    this.setState({
      loading: false,
    })
  }

  render() {
    const { imageUrl, imageTitle, className, small } = this.props
    const { loading } = this.state
    const loaderToDisplay = small ? <SmallLoading /> : <Loading />

    if (!imageUrl) {
      return (
        <div className="loading-image-container">
          <img className={className} src={imageNotFound} alt="not found" />
        </div>
      )
    }

    return (
      <div className="loading-image-container">
        <img
          className={className}
          src={imageUrl}
          alt={imageTitle}
          onLoad={this.handleLoad}
          onError={(e) => {
            e.target.src = imageNotFound
          }}
        />
        {loading ? loaderToDisplay : ''}
      </div>
    )
  }
}

LoadingImage.defaultProps = {
  imageUrl: null,
  imageTitle: null,
  className: null,
  small: false,
}

LoadingImage.propTypes = {
  imageUrl: PropTypes.string,
  imageTitle: PropTypes.string,
  className: PropTypes.string,
  small: PropTypes.bool,
}

export default LoadingImage
