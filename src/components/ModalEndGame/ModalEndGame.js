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

import { savePlayer } from '../../apis/starwars-api';

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
    score: PropTypes.number,
    dispatch: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      error: false,
      open: true,
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleConfirm = () => {
    const { name, email } = this.state;
    const { score } = this.props;
    const error = !name;
    if (!error) {
      savePlayer({name, email, score});
      this.handleClose();
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
    const { error, open } = this.state

    return (
      <Dialog onClose={this.handleClose} open={finished && open}>
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

const mapStateToProps = (state) => {
  const { finished, score } = state;
  return { finished, score };
}

export default connect(mapStateToProps)(withStyles(styles)(ModalEndGame));
