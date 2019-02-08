import { AppBar, Toolbar, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCharacters, startTimer } from '../../actions';
import { savePlayer } from '../../apis/starwars-api';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import Logo from '../../components/Logo/Logo';
import Modal from '../../components/Modal/Modal';
import ModalEndGame from '../../components/ModalEndGame/ModalEndGame';
import Pagination from '../../components/Pagination/Pagination';
import Progress from '../../components/Progress/Progress';
import Timer from '../../components/Timer/Timer';

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
  },
  grid: {
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
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

  handleSavePlayer = (player) => {
    const { total } = this.state
    if (player.name) {
      savePlayer({...player, total});
    }
  }

  render() {
    const { classes, characters, maxPage, finished } = this.props

    if (!characters) {
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
        <div className={classes.grid}>
          {
            characters.map((character) =>
              <CardCharacter
                key={character.id}
                character={character}
              />
            )
          }
          <Modal />
          <ModalEndGame />
        </div>
        <Pagination min={1} max={maxPage} disabled={finished}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { characters: allCharacter, page, finished } = state;

  const start = (page - 1) * 10;
  const end = (page * 10);
  
  const characters = allCharacter.slice(start, end);
  const maxPage = Math.ceil(allCharacter.length / 10);

  return { characters, maxPage, finished };
}

export default connect(mapStateToProps, { fetchCharacters, startTimer })(withStyles(styles)(Quiz));
