import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const intervalArr = length => {
  let arr = [];
  for (let index = 1; index <= length; index++) {
    arr.push(index);
  }
  return arr;
};

const styles = theme => ({
  intervalLegend: {
    display: 'grid',
    gridTemplateRows: `${theme.spacing.unit * 4}px`,
    gridTemplateColumns: 'repeat(var(--maxInterval), 1fr)',
  },
  inner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Interval = props => {
  const { classes } = props;
  return (
    <div
      className={classes.intervalLegend}
      style={{
        '--maxInterval': props.solutionLength,
      }}
    >
      {intervalArr(props.solutionLength).map(num => (
        <div className={classes.inner}>
          <Typography variant="caption" key={num}>
            {num}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default withStyles(styles)(Interval);
