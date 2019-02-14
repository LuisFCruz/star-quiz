import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { finishGame } from '../../actions';

const styles = {
  clock: {
    fontWeight: '700',
    fontSize: '30px',
  },
};

export class Timer extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
    start: PropTypes.bool,
    finishGame: PropTypes.func
  }

  constructor(){
    super();
    
    this.state = {
      stopwatch: '',
      secondsRemaining: 0
    };

    this.interval = null;
  }

  componentDidMount = () => {
    const { duration = 0, start } = this.props;
    this.setSecondsRemaining(duration);

    if (start) { this.startCountDown(); }
  }

  componentDidUpdate = () => {
    const { start } = this.props;
    if (start) { this.startCountDown(); }
  }

  componentWillUnmount() {
    if (this.interval) { clearInterval(this.interval); }
  }

  startCountDown = () => {
    if (this.interval) { return; }

    this.interval = setInterval(() =>
      this.setSecondsRemaining(this.state.secondsRemaining - 1),
      1000
    );
  }

  secondsToMinutes = (seconds) => {
    const oneSecond = 60;
    const minute = Math.floor(seconds / oneSecond);
    const second = (seconds % oneSecond);
    const minutesString = minute < 10 ? `0${minute}` : `${minute}`;
    const secondsString = second < 10 ? `0${second}` : `${second}`;
    return `${minutesString}:${secondsString}`;
  }

  setSecondsRemaining(secondsRemaining) {
    if (secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.props.finishGame(true);
    }

    if (secondsRemaining >= 0) {
      const stopwatch = this.secondsToMinutes(secondsRemaining);
      this.setState({ secondsRemaining, stopwatch });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.clock}>
        {this.state.stopwatch}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { start } = state;
  return { start };
};

export default connect(mapStateToProps, { finishGame })(withStyles(styles)(Timer));
