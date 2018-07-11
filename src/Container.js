import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';

import Element from './Element';

const styles = theme => ({
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
    backgroundColor: lightBlue[600],
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

const Container = ({ classes, state }) => (
  <div className={classes.laneContainer}>
    <div className={classes.lightBlue}>
      {state.lane1.map(num => <Element key={num.toString()} value={num} />)}
    </div>

    <div className={classes.cyan}>
      {state.lane2.map(num => <Element key={num.toString()} value={num} />)}
    </div>

    <div className={classes.teal}>
      {state.lane3.map(num => <Element key={num.toString()} value={num} />)}
    </div>
  </div>
);

export default withStyles(styles)(Container);
