import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';

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
};

export class Progress extends Component {
  render() {

    return (
      <div style={styles.mask}>
        <CircularProgress size={100}/>
        <p>Preparando jogo...</p>
      </div>
    );
  }
}

export default Progress;
