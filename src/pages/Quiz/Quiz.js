import { withStyles, AppBar, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import { getCharacters, getAllComplements, savePlayer } from '../../services/starwars-api';
import Modal from '../../components/Modal/Modal';
import Timer from '../../components/Timer/Timer';
import Logo from '../../components/Logo/Logo';
import Pagination from '../../components/Pagination/Pagination';
import { reduceComplementsCharacter, mergeCharacterWidthComplements } from '../../services/utils';
import ModalEndGame from '../../components/ModalEndGame/ModalEndGame';
import Progress from '../../components/Progress/Progress';
import { Link } from 'react-router-dom';

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
  clock: {
    fontWeight: '700',
    fontSize: '30px',
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
  };

  constructor() {
    super();
    this.state = {
      characters: [],
      modal: {
        open: false,
        character: null
      },
      pagination: {
        page: 1,
        min: 1,
        max: 1
      }, 
      startTime: false,
      finished: false,
      total: 0,
      progress: false,
    }
    this.characters = {};
  }

  setModal(open, character) {
    const modal = { open, character };
    this.setState({ modal });
  }
  
  componentDidMount() {
    this.loadQuiz();
  }

  loadQuiz = async () => {
    this.setState({ progress: true });
    try {
      const characters =  await getCharacters([1, 2, 3]);
      const complementsUrls = reduceComplementsCharacter(characters);
      const complements = await getAllComplements(complementsUrls);

      this.characters = mergeCharacterWidthComplements(characters, complements);
      this.updatePage();
      this.updateMaxPage();
      this.setState({ startTime: true });
    }
    catch(err) { }
    finally {
      this.setState({ progress: false });
    }
  }
  
  updatePage = () => {
    const { pagination: { page } } = this.state;
    const start = (page - 1) * 10;
    const end = (page * 10);
    
    const activeKeys = Object.keys(this.characters).slice(start, end);
    const characters = activeKeys.map(key => this.characters[key]);

    this.setState({ characters })
  }

  updateMaxPage = () => {
    const max = Object.keys(this.characters).length / 10;
    const { pagination } = this.state;
    this.setState({ pagination: { ...pagination, max } });
  }

  handleModalClickOpen = async (id) => {
    const character = this.characters[id];
    this.characters[id] = { ...character, helped: true };
    this.setModal(true, character)
  };

  handleModalClose = () => {
    this.setModal(false, null);
  };

  handleChangePage = (page) => {
    const { pagination } = this.state;
    this.setState({
      pagination: { ...pagination, page }
    }, this.updatePage);
  }

  handleReply = (id, name) => {
    const character = this.characters[id];

    if (character.name.toUpperCase() === name.toUpperCase()) {
      this.characters[id] = { ...character, answered: true }
      this.updatePage();
    }
  }

  handleFinish = () => {
    const finished = true;

    const answered = Object.keys(this.characters).filter(key => this.characters[key].answered);
    const total = answered
      .map(key => this.characters[key])
      .reduce((aggr, {helped}) =>  aggr + (helped ? 5 : 10), 0);

    this.setState({ total, finished, modal: { open: true } });
  }

  handleFinishClose = () => {
    this.setState({ modal: { open: false } });
  }

  handleSavePlayer = (player) => {
    const { total } = this.state
    if (player.name) {
      savePlayer({...player, total});
    }

    this.handleFinishClose();
  }

  render() {
    const time = 2;
    const { classes } = this.props
    const {
      characters,
      modal,
      startTime,
      pagination,
      finished,
      total,
      progress,
    } = this.state;

    let modalContent = '';
    let progressContent = '';

    if (progress) {
      progressContent = <Progress />
    }

    if (modal.open && modal.character) {
      modalContent = <Modal
        {...modal}
        onClose={this.handleModalClose}
      />
    }

    if (modal.open && finished) {
      modalContent = <ModalEndGame
        score={total}
        {...modal}
        onClose={this.handleFinishClose}
        onConfirm={this.handleSavePlayer}
      />
    }

    return (
      <div>
        {progressContent}
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
            <Timer
              time={time}
              start={startTime}
              className={classes.clock}
              onFinish={this.handleFinish}
            />
          </Toolbar>
        </AppBar>
        <div className={classes.grid}>
          {
            characters.map((character) =>
              <CardCharacter
                key={character.id}
                character={character.id}
                answered={character.answered}
                disabled={finished}
                onHelpClick={this.handleModalClickOpen}
                onReply={this.handleReply}
              />
            )
          }
          {modalContent}
        </div>
        <Pagination onChange={this.handleChangePage} {...pagination} disabled={finished}/>
      </div>
    )
  }
}

export default withStyles(styles)(Quiz);
