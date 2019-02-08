import { Button, Card, CardActions, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCharacter, updateCharacters } from '../../actions';
import Avatar from '../Avatar/Avatar';
import FieldAction from '../FieldAction/FieldAction';


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
    flexWrap: 'wrap'
  },
  buttons: {
    justifyContent: 'space-around',
    display: 'flex',
    width: '100%',
  }
};

class CardCharacter extends Component {
  constructor() {
    super();

    this.state = {
      reply: false,
    }
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
  };

  handleHelpClick = () => {
    const { character } = this.props;
    this.props.updateCharacters({ ...character, helped: true });
    this.props.selectCharacter(character);
  }

  handleReplyClick = () => {
    this.setState({ reply: true });
  }

  handleConfirm = (name) => {
    const { character } = this.props;
    if (name && character.name.toUpperCase() === name.toUpperCase()) {
      this.props.updateCharacters({ ...character, answered: true });
    }
    this.setState({ reply: false });
  }

  render() {
    const { character, disabled, classes } = this.props;
    const { reply } = this.state;
    let textField = (
      <div className={classes.buttons}>
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleReplyClick}
          disabled={disabled || character.answered}
        > ? </Button>
        <Button
          variant="contained"
          onClick={this.handleHelpClick}
          disabled={disabled || character.answered}
        > ... </Button>
      </div>
    );

    if (!disabled && !character.answered && reply) {
      textField = <FieldAction onConfirm={this.handleConfirm} />
    }
    
    return (

      <Card >
        <Avatar id={character.id} className={classes.media}/>
        <CardActions className={classes.actions}>
          {textField}
        </CardActions>
      </Card >
    )
  }
}

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps,
  { selectCharacter, updateCharacters }
)(withStyles(styles)(CardCharacter));
