import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';

import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';

const elStyles = theme => ({
  root: {
    height: '100%',
    width: theme.spacing.unit * 12,
    padding: theme.spacing.unit,
  },
  inner: {
    backgroundColor: lightGreen[600],
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const unstyledElement = ({ classes, value }) => (
  <div className={classes.root}>
    <div className={classes.inner}>
      <Typography variant="display3">{value}</Typography>
    </div>
  </div>
);

const Element = withStyles(elStyles)(unstyledElement);

const styles = theme => ({
  App: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
  laneContainer: {
    // width: '100%',
    width: theme.spacing.unit * 108,
    height: theme.spacing.unit * 36,
    display: 'flex',
    flexDirection: 'column',
  },
  lightBlue: {
    flex: 1,
    display: 'flex',
    // backgroundColor: lightBlue[600],
  },
  cyan: {
    flex: 1,
    display: 'flex',
    backgroundColor: cyan[600],
  },
  teal: {
    flex: 1,
    display: 'flex',
    backgroundColor: teal[600],
  },
});

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
Object.freeze(arr);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

        <div className={classes.laneContainer}>
          <div className={classes.lightBlue}>
            {this.state.lane1.map(num => (
              <Element key={num.toString()} value={num} />
            ))}
          </div>

          <div className={classes.cyan}>
            {this.state.lane2.map(num => (
              <Element key={num.toString()} value={num} />
            ))}
          </div>

          <div className={classes.teal}>
            {this.state.lane3.map(num => (
              <Element key={num.toString()} value={num} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
