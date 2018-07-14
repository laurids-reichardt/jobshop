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
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const colors = [
  'F44336',
  'E91E63',
  '9C27B0',
  '673AB7',
  '3F51B5',
  '2196F3',
  '009688',
  'FF5722',
  'CDDC39',
];

const Element = ({ classes, value }) => {
  const color = value !== -1 ? colors[value] : '000000';
  return (
    <div className={classes.root}>
      <div className={classes.inner} style={{ backgroundColor: `#${color}` }}>
        <Typography variant="title">{value !== -1 ? value : null}</Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(Element);
