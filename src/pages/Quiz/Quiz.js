import { withStyles, AppBar, Toolbar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import { getCharacters, getPlanetName, getVehicles, getSpecies, getFilms } from '../../services/starwars-api';
import Modal from '../../components/Modal/Modal';
import Timer from '../../components/Timer/Timer';
import Logo from '../../components/Logo/Logo';

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
      startTime: false
    }
    this.characters = [];
  }

  setModal(open, character) {
    const modal = { open, character };
    this.setState({ modal });
  }
  
  async componentWillMount() {
    const characters =  await getCharacters(1);
    this.setState({ characters, startTime: true });
  }

  handleModalClickOpen = async (character) => {
    const {
      species: speciesUrl,
      vehicles: vehiclesUrl,
      homeworld: homeworldUrl,
      films: filmsUrls,
    } = character;

    const species = await getSpecies(speciesUrl);
    const vehicles = await getVehicles(vehiclesUrl);
    const homeworld = await getPlanetName(homeworldUrl);
    const films = await getFilms(filmsUrls);

    this.setModal(true, {...character, homeworld, species, vehicles, films})
  };

  handleModalClose = () => {
    this.setModal(false, null);
  };

  render() {
    const time = 2;
    const { classes } = this.props
    const { characters, modal, startTime } = this.state;
    return (
      <div>
        <AppBar position="static" className={classes.header}>
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
            characters.map((character, index) =>
              <CardCharacter
                character={character}
                key={index}
                onHelpClick={this.handleModalClickOpen}
              />
            )
          }
          <Modal
            {...modal}
            onClose={this.handleModalClose}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Quiz);
