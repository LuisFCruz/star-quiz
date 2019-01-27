import { withStyles } from '@material-ui/core';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Avatar from '../Avatar/Avatar';


const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  media:{
    maxWidth: '200px',
    maxHeight: '250px'
  },
  details: {
    paddingLeft: '10px',
  },
  label: {
    fontWeight: '700',
  }
});

export class Details extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired
  }

  render() {
    const { character, classes = {} } = this.props;
    if (!character) {
      return <div/>
    }

    const {
      id,
      height,
      hair_color,
      films,
      species,
      homeworld,
      vehicles
    } = character;
    
    return (
      <div className={classes.content}>
        <Avatar id={id} className={classes.media } />
        <div className={ classes.details }>
          <p>
            <span className={classes.label}>Specie:</span> {species}
          </p>
          <p>
            <span className={classes.label}>Height:</span> {height}
          </p>
          <p>
            <span className={classes.label}>Hair:</span> {hair_color}
          </p>
          <p>
            <span className={classes.label}>Planet:</span> {homeworld}
          </p>
          <p>
            <span className={classes.label}>Movies:</span> {films}
          </p>
          <p>
            <span className={classes.label}>Vehicles:</span> {vehicles}
          </p>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Details);
