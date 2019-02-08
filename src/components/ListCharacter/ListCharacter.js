import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardCharacter from '../CardCharacter/CardCharacter';

const styles = {
  grid: {
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  }
}

export class ListCharacter extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    characters: PropTypes.array,
  };

  render() {
    const { classes, characters } = this.props;
    
    return (
      <div className={classes.grid}>
        {characters.map(character => (
          <CardCharacter key={character.id} character={character} />
        ))}
      </div>
    );
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

export default connect(mapStateToProps)(withStyles(styles)(ListCharacter));
