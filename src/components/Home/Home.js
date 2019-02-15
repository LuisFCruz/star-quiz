import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  container: {
    background: '#000',
    color: '#fff',
    padding: '10px'
  },
  quizInfo: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row'
    }
  },
  title: {
    textAlign: 'center'
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
    padding: '50px',
    textAlign: 'center'
  },
  button: {
    background: '#FFAB00',
    color: '#000',
    fontWeight: '700',
    width: '90%',
    '&:hover': {
      background: '#FFAB00',
      color: '#000'
    }
  },
  imageContent: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%'
    }
  },
  media: {
    maxWidth: '450px',
    width: '100%',
    margin: '0 auto'
  }
});

const MyLink = props => <Link to='/quiz' {...props} />;

export class Home extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <h1 className={classes.title}>Star Quiz</h1>
        <div className={classes.quizInfo}>
          <div className={classes.imageContent}>
            <img
              className={classes.media}
              src='/assets/images/darthvader.png'
              alt='Imagem: Dath Vader'
            />
          </div>
          <div className={classes.description}>
            <p>Você conhece os personagens de Star Wars?</p>
            <p>Sim? Então mostre-nos!</p>
            <p>
              Com esse quiz você terá oportunidade de identificar os principais
              personagens de Starwars, marcar pontos e se tornar um expert nesta
              série de filmes maravilhosa!
            </p>
            <Button
              component={MyLink}
              title='jogar'
              aria-label='jogar'
              className={classes.button}
            >
              {' '}
              JOGAR!
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
