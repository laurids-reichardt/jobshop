import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

import Element from './Element';
import IntervalLegend from './IntervalLegend';

const flatten = list =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const styles = theme => ({
  root: {
    width: '100%',
  },
  gantDiagram: {
    // width: theme.spacing.unit * 108,
    // height: theme.spacing.unit * 36,
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--maxInterval), 1fr)',
    gridTemplateRows: `repeat(var(--lanes), ${theme.spacing.unit * 4}px)`,
  },
});

class Container extends React.Component {
  render() {
    const { classes } = this.props;
    let counter = 0;
    let counter2 = 1;
    return (
      <div className={classes.root}>
        <div
          className={classes.gantDiagram}
          style={{
            '--maxInterval': this.props.solutionLength,
            '--lanes': this.props.gantMatrix.length,
          }}
        >
          {flatten(this.props.gantMatrix).map(num => (
            <Element key={counter++} value={num} />
          ))}
        </div>
        <IntervalLegend solutionLength={this.props.solutionLength} />
      </div>
    );
  }
}

export default withStyles(styles)(Container);
