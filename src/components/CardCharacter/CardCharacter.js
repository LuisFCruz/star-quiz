import { Button, Card, CardActions } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { selectCharacter, updateCharacters, sumScore } from '../../actions';
import Avatar from '../Avatar/Avatar';
import FieldAction from '../FieldAction/FieldAction';

import './CardCharacter.css';

export class CardCharacter extends Component {
  constructor() {
    super();

    this.state = {
      reply: false,
    };
  }
  static propTypes = {
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
    const { character, finished } = this.props;
    const { reply } = this.state;

    if (!finished && !character.answered && reply) {
      return <FieldAction onConfirm={this.handleConfirm} />;
    }

    return (
      <div className="CardCharacter-buttons">
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
    const { character } = this.props;
    
    return (

      <Card className="CardCharacter-card">
        <Avatar id={character.id} className="CardCharacter-media"/>
        <CardActions className="CardCharacter-actions">
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
)(CardCharacter);
