import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Container from './Container';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
Object.freeze(arr);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const styles = theme => ({
  App: {
    padding: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lane1: arr, lane2: [], lane3: [] };
  }

  handleShuffle = () => {
    this.setState(prev => {
      const temp = arr.slice();

      temp.sort(function() {
        return 0.5 - Math.random();
      });

      const rand = getRandomInt(1, 8);

      return {
        lane1: [],
        lane2: temp.slice(0, rand),
        lane3: temp.slice(rand, 9),
      };
    });
  };

  handleReset = () => {
    this.setState({ lane1: arr, lane2: [], lane3: [] });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.App}>
        <Typography variant="title" gutterBottom>
          Job Shop Problem
        </Typography>

        <Button
          onClick={this.handleShuffle}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Shuffle
        </Button>

        <Button
          onClick={this.handleReset}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Reset
        </Button>

        <Container state={this.state} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
