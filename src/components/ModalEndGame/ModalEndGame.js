import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, FormControl, InputLabel, Input, Typography, withStyles } from '@material-ui/core';

const styles = {
  score: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: '18px',
  },
  fieldControl: {
    marginTop: '10px',
    display: 'block',
    width: '100%'
  }
}

export class ModalEndGame extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    score: PropTypes.number.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    }
  }

  handleClose = () => {
    this.props.onClose();
  }

  handleConfirm = () => {
    const { name, email } = this.state;
    this.props.onConfirm({name, email});
  }


  setName = ({target: { value = '' }}) => {
    this.setState({ name: value });
  }

  setEmail = ({target: { value = '' }}) => {
    this.setState({ email: value });
  }

  render() {
    const { classes, open, score } = this.props;

    return (
      <Dialog onClose={this.handleClose} open={open}>
        <DialogTitle>Game over!</DialogTitle>
        <DialogContent>
          <Typography className={classes.score}>{score} points</Typography>
          <Typography>Save your score!</Typography>
          <FormControl className={classes.fieldControl}>
            <InputLabel>Name</InputLabel>
            <Input onChange={this.setName} />
          </FormControl>
          <FormControl className={classes.fieldControl}>
            <InputLabel>Email</InputLabel>
            <Input onChange={this.setEmail} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(ModalEndGame);
