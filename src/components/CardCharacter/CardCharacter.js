import { Card, withStyles, CardActions, Button } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '../Avatar/Avatar';

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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onHelpClick: PropTypes.func.isRequired,
  };

  handleHelpClick = () => {
    const { character } = this.props;
    this.props.onHelpClick(character);
  }

  render() {
    const { character: { id }, classes } = this.props;
    console.log(this.props.character)
    
    return (
      <Card >
        <Avatar id= {id} className={classes.media}/>
        <CardActions className={classes.actions}>
          <Button> ? </Button>
          <Button onClick={this.handleHelpClick}> ... </Button>
        </CardActions>
      </Card >
    )
  }
}

export default withStyles(styles)(CardCharacter);
