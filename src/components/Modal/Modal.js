import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, withStyles, DialogActions, Button, DialogContent } from '@material-ui/core';
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
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    character: PropTypes.object
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { character, open, classes } = this.props;

    let details = '';

    if (character) {
      const {
        id,
        height,
        hair_color,
        films,
        species,
        homeworld,
        vehicles
      } = character;
      details = (
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
        </DialogContent>
      );
    }

    return (
      <Dialog onClose={this.handleClose} open={open}>
        <DialogTitle id="simple-dialog-title">Details</DialogTitle>
        {details}
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Modal);
