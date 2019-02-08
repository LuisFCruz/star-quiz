import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    finished: PropTypes.bool,
    score: PropTypes.number
  }

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      error: false
    }
  }

  handleClose = () => {
    // this.props.onClose();
  }

  handleConfirm = () => {
    const { name, email } = this.state;
    const error = !name;
    if (!error) {
      //this.props.onConfirm({name, email});
    }

    this.setState({ error });
  }


  setName = ({target: { value = '' }}) => {
    this.setState({ name: value });
  }

  setEmail = ({target: { value = '' }}) => {
    this.setState({ email: value });
  }

  render() {
    const { classes, finished, score } = this.props;
    const { error } = this.state

    return (
      <Dialog onClose={this.handleClose} open={finished}>
        <DialogTitle>Game over!</DialogTitle>
        <DialogContent>
          <Typography className={classes.score}>{score} points</Typography>
          <Typography>Save your score!</Typography>
          <FormControl className={classes.fieldControl} error={error}>
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

const mapStatesToProps = (states) => {
  const { finished, score } = states;
  return { finished, score };
}

export default connect(mapStatesToProps)(withStyles(styles)(ModalEndGame));
