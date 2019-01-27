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
      stopwatch: '',
      secondsRemaining: 0
    }

    this.interval = null;
  }

  componentDidMount = () => {
    const { time = 0, start } = this.props;
    const secondsRemaining = time * ONE_SECOND
    this.setSecondsRemaining(secondsRemaining);

    if (start) {
      this.startCountDown();
    }
  }

  componentWillReceiveProps = (prevProps) => {
    const { start } = prevProps;
    if (start) {
      this.startCountDown();
    }
  }

  startCountDown = () => {
    if (!!this.interval) { return; }
    this.interval = setInterval(() => {
      const { secondsRemaining } = this.state
      this.setSecondsRemaining(secondsRemaining - 1);
    }, 1000);
  }

  setStopwatch = () => {
    const { secondsRemaining } = this.state
    const minute = Math.floor(secondsRemaining / ONE_SECOND);
    const second = (secondsRemaining % ONE_SECOND);
    const minutesString = minute < 10 ? `0${minute}` : `${minute}`;
    const secondsString = second < 10 ? `0${second}` : `${second}`;
    const stopwatch = `${minutesString}:${secondsString}`;

    this.setState({ stopwatch });
  }

  setSecondsRemaining(secondsRemaining) {
    if (secondsRemaining <= 0) {
      clearInterval(this.interval);
      this.props.onFinish();
    }

    if (secondsRemaining >= 0) {
      this.setState({ secondsRemaining}, this.setStopwatch);
    }
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
