import { Button, Dialog, DialogActions, DialogContent, DialogTitle, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCharacter } from '../../actions';
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

export class Modal extends Component {
  static propTypes = {
    classes: PropTypes.object,
    character: PropTypes.object,
    selectCharacter: PropTypes.func,
  }

  handleClose = () => {
    this.props.selectCharacter(null);
  };

  render() {
    const { character, classes } = this.props;
    const open = true;

    if (!character) { return null; }
      const {
        id,
        height,
        hairColor,
        films,
        species,
        homeworld,
        vehicles
      } = character;


    return (
      <Dialog onClose={this.handleClose} open={open}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent className={ classes.content }>
          <Avatar id={id} className={ classes.media } />
          <div className={ classes.details }>
            <p>
              <span className={classes.label}>Specie:</span> {species}
            </p>
            <p>
              <span className={classes.label}>Height:</span> {height}
            </p>
            <p>
              <span className={classes.label}>Hair:</span> {hairColor}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (states) => {
  const { selectedCharacter } = states;
  return { character: selectedCharacter };
}

export default connect(mapStateToProps, { selectCharacter })(withStyles(styles)(Modal));
