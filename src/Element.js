import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';

const styles = theme => ({
  root: {
    // height: '100%',
    // width: theme.spacing.unit * 12,
    // padding: theme.spacing.unit,
  },
  inner: {
    // backgroundColor: lightGreen[600],
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Element = ({ classes, value }) => (
  <div className={classes.root}>
    <div
      className={classes.inner}
      style={{ backgroundColor: lightGreen[value * 100] }}
    >
      {/* <Typography variant="display1">{value}</Typography> */}
    </div>
  </div>
);

export default withStyles(styles)(Element);
