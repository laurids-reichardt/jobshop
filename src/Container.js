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

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];

const styles = theme => ({
  root: {
    // width: theme.spacing.unit * 108,
    // height: theme.spacing.unit * 36,
    display: 'grid',
    gridTemplateColumns: 'repeat(22, 1fr)',
    gridTemplateRows: `repeat(12, ${theme.spacing.unit * 4}px)`,
  },
});

const Container = ({ classes, state }) => (
  <div className={classes.root}>
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
    {numbers.map(num => <Element key={num.toString()} value={num} />)}
  </div>
);

export default withStyles(styles)(Container);
