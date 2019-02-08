import { AppBar, Toolbar, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCharacters, startTimer } from '../../actions';
import Logo from '../../components/Logo/Logo';
import Modal from '../../components/Modal/Modal';
import ModalEndGame from '../../components/ModalEndGame/ModalEndGame';
import Pagination from '../../components/Pagination/Pagination';
import Timer from '../../components/Timer/Timer';
import ListCharacter from '../ListCharacter/ListCharacter';
import { Progress } from '../Progress/Progress';

const styles = {
  header: {
    background: '#FFAB00',
    color: '#000'
  },
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  media: {
    width: '64px',
  }
}

class Quiz extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    characters: PropTypes.array,
    maxPage: PropTypes.number,
    finished: PropTypes.bool,
    fetchCharacters: PropTypes.func,
    startTimer: PropTypes.func,

  };

  componentDidMount() {
    this.loadQuiz();
  }

  loadQuiz = async () => {
    try {
      await this.props.fetchCharacters([1, 2, 3]);
      this.props.startTimer(true);
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    const { classes, characters, maxPage, finished } = this.props

    if (!characters.length) {
      return <Progress />;
    }

    return (
      <div>
        <AppBar
          position="static"
          className={classes.header}
        >
          <Toolbar className={classes.bar}>
            <Link to="/">
              <Logo
                image="/assets/images/rebel.png"
                className={classes.media}
              />
            </Link>
            <Timer duration={120} />
          </Toolbar>
        </AppBar>
        <ListCharacter />
        <Pagination min={1} max={maxPage} disabled={finished}/>
        <Modal />
        <ModalEndGame />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { characters, finished } = state;

  const maxPage = Math.ceil(characters.length / 10);

  return { characters, maxPage, finished };
}

export default connect(mapStateToProps, { fetchCharacters, startTimer })(withStyles(styles)(Quiz));
