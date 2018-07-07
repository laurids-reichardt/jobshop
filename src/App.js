import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';

const elStyles = theme => ({
  root: {
    height: '100%',
    width: '96px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const unstyledElement = ({ classes, value }) => (
  <div className={classes.root}>
    <Typography variant="display3">{value}</Typography>
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
    width: '100%',
    height: theme.spacing.unit * 24,
    display: 'flex',
    flexDirection: 'column',
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

const arr = [1, 2, 3];
const arr2 = [4, 5, 6, 7];

const App = ({ classes }) => (
  <div className={classes.App}>
    <Typography variant="title" gutterBottom>
      Job Shop Problem
    </Typography>

    <Button className={classes.button} variant="contained" color="primary">
      Shuffle
    </Button>

    <Button className={classes.button} variant="contained" color="primary">
      Reset
    </Button>

    <div className={classes.laneContainer}>
      <div className={classes.cyan}>
        {arr.map(num => <Element key={num.toString()} value={num} />)}
      </div>

      <div className={classes.teal}>
        {arr2.map(num => <Element key={num.toString()} value={num} />)}
      </div>
    </div>
  </div>
);

export default withStyles(styles)(App);
