import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ONE_SECOND = 60;

export class Timer extends Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    start: PropTypes.bool.isRequired,
    onFinish: PropTypes.func,
    className: PropTypes.string
  }

  constructor(){
    super();
    
    this.state = {
      stopwatch: ''
    }
    this.secondsRemaining = 0;
  }

  componentDidMount = () => {
    const { time = 0, start } = this.props;
    this.secondsRemaining = time * ONE_SECOND
    this.setStopwatch();

    if (start) {
      this.startCountDown();
    }
  }

  componentWillReceiveProps = (prevProps) => {
    const { start } = prevProps;
    if (start && this.secondsRemaining) {
      this.startCountDown();
    }
  }

  startCountDown = () => {
    const { onFinish } = this.props;
    const interval = setInterval(() => {

      this.secondsRemaining--;

      this.setStopwatch();
      
      if (this.secondsRemaining === 0) {
        clearInterval(interval);
        if (typeof onFinish === 'function') {
          onFinish();
        }
      }
    }, 1000);
  }

  setStopwatch = () => {
    const minute = Math.floor(this.secondsRemaining / ONE_SECOND);
    const second = (this.secondsRemaining % ONE_SECOND);
    const minutesString = minute < 10 ? `0${minute}` : `${minute}`;
    const secondsString = second < 10 ? `0${second}` : `${second}`;
    const stopwatch = `${minutesString}:${secondsString}`;

    this.setState({ stopwatch });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        {this.state.stopwatch}
      </div>
    )
  }
}

export default Timer;
