import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import { getCharacters, getPlanetName, getVehicles, getSpecies, getFilms } from '../../services/starwars-api';
import Modal from '../../components/Modal/Modal';

const styles = {
  grid: {
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))'
  }
}

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
      characters: [],
      modal: {
        open: false,
        character: null
      }
    }
    this.characters = [];
  }
  
  async componentWillMount() {
    const characters =  await getCharacters(1);
    this.setState({ characters });
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

    const modal = { open: true, character: {...character, homeworld, species, vehicles, films} }
    this.setState({ modal });
  };

  handleModalClose = () => {
    const modal = { open: false, character: null };
    this.setState({ modal });
  };

  render() {
    const { classes } = this.props
    const { characters, modal } = this.state;
    return (
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
    )
  }
}

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quiz);
