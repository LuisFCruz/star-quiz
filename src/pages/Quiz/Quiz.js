import { withStyles, AppBar, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import { getCharacters, getAllComplements } from '../../services/starwars-api';
import Modal from '../../components/Modal/Modal';
import Timer from '../../components/Timer/Timer';
import Logo from '../../components/Logo/Logo';
import Pagination from '../../components/Pagination/Pagination';
import { reduceComplementsCharacter, mergeCharacterWidthComplements } from '../../services/utils';

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
      startTime: false
    }
    this.characters = {};
  }

  setModal(open, character) {
    const modal = { open, character };
    this.setState({ modal });
  }
  
  async componentWillMount() {
    try {
      const characters =  await getCharacters([1, 2, 3]);
      const complementsUrls = reduceComplementsCharacter(characters);
      const complements = await getAllComplements(complementsUrls);

      this.characters = mergeCharacterWidthComplements(characters, complements);
      this.updatePage();
      this.updateMaxPage();
      this.setState({ startTime: true });
    } catch(err) {
      
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

  }

  render() {
    const time = 2;
    const { classes } = this.props
    const { characters, modal, startTime, pagination } = this.state;

    return (
      <div>
        <AppBar
          position="static"
          className={classes.header}
        >
          <Toolbar className={classes.bar}>
            <Logo
              image="/assets/images/rebel.png"
              className={classes.media}
            />
            <Timer
              time={time}
              start={startTime}
              className={classes.clock}
            />
          </Toolbar>
        </AppBar>
        <div className={classes.grid}>
          {
            characters.map((character) =>
              <CardCharacter
                character={character.id}
                key={character.id}
                onHelpClick={this.handleModalClickOpen}
                onReply={this.handleReply}
              />
            )
          }
          <Modal
            {...modal}
            onClose={this.handleModalClose}
          />
        </div>
        <Pagination onChange={this.handleChangePage} {...pagination} />
      </div>
    )
  }
}

export default withStyles(styles)(Quiz);
