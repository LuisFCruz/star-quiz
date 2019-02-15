import { Button, Card, CardActions, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectCharacter, updateCharacters, sumScore } from '../../actions';
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
    };
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    character: PropTypes.object.isRequired,
    finished: PropTypes.bool,
    updateCharacters: PropTypes.func,
    selectCharacter: PropTypes.func,
    sumScore: PropTypes.func,
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
      this.props.sumScore(character);
    }
    this.setState({ reply: false });
  }

  renderActions = () => {
    const { character, finished, classes } = this.props;
    const { reply } = this.state;

    if (!finished && !character.answered && reply) {
      return <FieldAction onConfirm={this.handleConfirm} />
    }

    return (
      <div className={classes.buttons}>
        <Button
          color="primary"
          variant="contained"
          onClick={this.handleReplyClick}
          disabled={finished || character.answered}
        > ? </Button>
        <Button
          variant="contained"
          onClick={this.handleHelpClick}
          disabled={finished || character.answered}
        > ... </Button>
      </div>
    );

    
  }

  render() {
    const { character, classes } = this.props;
    
    return (

      <Card >
        <Avatar id={character.id} className={classes.media}/>
        <CardActions className={classes.actions}>
          {this.renderActions()}
        </CardActions>
      </Card >
    );
  }
}

const mapStateToProps = (state) => {
  const { finished } = state;
  return { finished };
};

export default connect(
  mapStateToProps,
  { selectCharacter, updateCharacters, sumScore }
)(withStyles(styles)(CardCharacter));
