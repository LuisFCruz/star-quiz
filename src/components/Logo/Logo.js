import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Logo extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  render() {
    const { image, className = '' } = this.props;
    return (
      <img
        src={image}
        className={className}
        alt=""
      />
    )
  }
}

export default Logo;
