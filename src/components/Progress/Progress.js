import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

const styles = {
  mask: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    zIndex: '1000',
    flexDirection: 'column'
  }
}

export class Progress extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  render() {
    const { classes = {} } = this.props
    return (
      <div className={classes.mask}>
        <CircularProgress size={100}/>
        <p>Preparando jogo...</p>
      </div>
    )
  }
}

export default withStyles(styles)(Progress);
