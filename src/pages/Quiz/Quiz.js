import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardCharacter from '../../components/CardCharacter/CardCharacter';
import { getCharacters } from '../../services/starwars-api';

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
      characters: []
    }
    this.characters = [];
  }
  
  async componentWillMount() {
    const characters =  await getCharacters(1);
    this.setState({ characters });
  }

  render() {
    const { classes } = this.props
    const { characters } = this.state;
    return (
      <div className={classes.grid}>
        {
          characters.map((character, index) =>
            <CardCharacter {...character} key={index}/>
          )
        }
      </div>
    )
  }
}

Quiz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Quiz);
