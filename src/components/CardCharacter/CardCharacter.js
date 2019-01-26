import { Card, withStyles, CardActions, Button } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
  card: {
    maxWidth: 400,
  },
  media: {
    height: '200px',
    width: '100%'
  },
  actions: {
    justifyContent: 'center',
  },
};

class CardCharacter extends Component {
  render() {
    console.log(this.props)
    const { id, classes } = this.props;
    const image = `/assets/images/characters/${id}.jpg`;
    return (
      <Card >
        <img
          className={classes.media}
          src={image}
          alt=""
        />
        <CardActions className={classes.actions}>
          <Button> ? </Button>
          <Button> ... </Button>
        </CardActions>
      </Card >
    )
  }
}

CardCharacter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardCharacter);
