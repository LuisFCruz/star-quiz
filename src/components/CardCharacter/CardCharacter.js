import { Card, withStyles, CardActions, Button } from '@material-ui/core';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    character: PropTypes.string.isRequired,
    onHelpClick: PropTypes.func.isRequired,
    onReply: PropTypes.func.isRequired,
    answered: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  handleHelpClick = () => {
    const { character } = this.props;
    this.props.onHelpClick(character);
  }

  handleReplyClick = () => {
    this.setState({ reply: true });
  }

  handleConfirm = (name) => {
    const { character } = this.props;
    if (name) {
      this.props.onReply(character, name);
    }
    this.setState({ reply: false });
  }

  render() {
    const { character, answered, disabled, classes } = this.props;
    const { reply } = this.state;
    let textField = (
      <div className={classes.buttons}>
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleReplyClick}
          disabled={disabled || answered}
        > ? </Button>
        <Button
          variant="contained"
          onClick={this.handleHelpClick}
          disabled={disabled || answered}
        > ... </Button>
      </div>
    );

    if (!disabled && !answered && reply) {
      textField = <FieldAction onConfirm={this.handleConfirm} />
    }
    
    return (

      <Card >
        <Avatar id={character} className={classes.media}/>
        <CardActions className={classes.actions}>
          {textField}
        </CardActions>
      </Card >
    )
  }
}

export default withStyles(styles)(CardCharacter);
