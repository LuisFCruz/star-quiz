import { Button, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changePage } from '../../actions';

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
    page: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    disabled: PropTypes.bool,
    changePage: PropTypes.func,
  }

  handleClickPrev = () => {
    const { page } = this.props;
    this.props.changePage(page - 1);
  }

  handleClickNext = () => {
    const { page } = this.props;
    this.props.changePage(page + 1);
  }

  render() {
    const { page, min = 1 , max = 1000, disabled = false } = this.props;
    const disabledPrev = page === min;
    const disabledNext = page === max;

    return (
      <div style={styles.container}>
        <MuiThemeProvider theme={theme}>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            style={styles.margin}
            disabled={disabledPrev || disabled}
            onClick={this.handleClickPrev}
          >
            Prev
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            style={styles.margin}
            disabled={disabledNext || disabled}
            onClick={this.handleClickNext}
          >
            Next
          </Button>
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { page } = state;
  return { page };
};

export default connect(mapStateToProps, { changePage })(Pagination);
