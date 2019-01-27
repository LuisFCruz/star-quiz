import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: { main: grey[900] },
  },
  typography: { useNextVariants: true },
});

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  margin: {
    margin: '0 5px',
  }
};

export class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
  }

  handleClickPrev = () => {
    const { page } = this.props;
    this.props.onChange(page - 1);

  }

  handleClickNext = () => {
    const { page } = this.props;
    this.props.onChange(page + 1);
  }

  render() {
    const { classes, page, min = 0 , max = 1000 } = this.props;
    const disabledPrev = page === min;
    const disabledNext = page === max;
    return (
      <div className={classes.container}>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.margin}
            disabled={disabledPrev}
            onClick={this.handleClickPrev}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.margin}
            disabled={disabledNext}
            onClick={this.handleClickNext}
          >
            Next
          </Button>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(Pagination);
