import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Avatar extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string
  }

  render() {
    const { id, className } = this.props;
    const image = `/assets/images/characters/${id}.jpg`;
    return (
      <img
        className={className}
        src={image}
        alt=""
      />
    )
  }
}

export default Avatar;
