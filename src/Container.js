import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import lightBlue from '@material-ui/core/colors/lightBlue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import lime from '@material-ui/core/colors/lime';

import Element from './Element';
import { isEqual } from './utility/UtilityFunctions';

function getArrayWithJobNumber(interval, jobnumber) {
  const array = [];
  for (let index = 0; index < interval; index++) {
    array.push(jobnumber);
  }
  return array;
}

const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];

const styles = theme => ({
  root: {
    // width: theme.spacing.unit * 108,
    // height: theme.spacing.unit * 36,
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--maxInterval), 1fr)',
    gridTemplateRows: `repeat(var(--lanes), ${theme.spacing.unit * 8}px)`,
  },
});

class Container extends React.Component {
  state = {
    lanes: 2,
    maxInterval: 6,
    gantMatrix: [],
  };

  render() {
    console.log(this.props);
    const { classes } = this.props;
    let counter = 0;
    return (
      <div
        className={classes.root}
        style={{
          '--maxInterval':
            this.props.gantMatrix.length > 0
              ? this.props.gantMatrix[0].length
              : 0,
          '--lanes': this.props.gantMatrix.length,
        }}
      >
        {flatten(this.props.gantMatrix).map(num => (
          <Element key={counter++} value={num} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Container);
