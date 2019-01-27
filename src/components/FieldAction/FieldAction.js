import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextField, withStyles, Button } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'inherit',
  },
  button: {
    marginLeft: '5px',
    minWidth: 'auto',
  }
};

export class FieldAction extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onConfirm: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
  }

  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  handleConfirmClick = () => {
    const { value } = this.state;
    this.props.onConfirm(value);
  }

  handleChange = ({target: {value = ''}}) => {
    this.setState({ value });
  }

  render() {
    const { classes, placeholder = '' } = this.props;
    return (
      <div className={classes.container}>
        <TextField
          placeholder={placeholder}
          onChange={this.handleChange}
        />
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
          onClick={this.handleConfirmClick}
        >ok</Button>
      </div>
    )
  }
}

export default withStyles(styles)(FieldAction);
