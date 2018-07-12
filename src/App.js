import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Container from './Container';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function genJobArray(jobs, machines) {
  let matrix = [];
  // for every machine create an array of jobs/interval
  for (let i = 0; i < jobs; i++) {
    let job = [];
    // for every job create a pair of machine & interval and push to array
    for (let j = 0; j < machines; j++) {
      job.push({ machine: j, interval: getRandomInt(1, 4) });
    }
    // shuffle machine lane order and push to matrix array
    matrix.push(shuffle(job));
  }
  return matrix;
}

const styles = theme => ({
  App: {
    padding: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit * 2,
    marginLeft: 0,
  },
  numberInput: {
    textAlign: 'right',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { machines: 3, jobs: 6 };
  }

  handleGenerate = () => {
    this.setState(prev => {
      console.log(genJobArray(prev.jobs, prev.machines));

      return prev;
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.App}>
        <Typography variant="title" gutterBottom>
          Job Shop Problem
        </Typography>

        <Button
          onClick={this.handleGenerate}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Generate
        </Button>

        <TextField
          id="machines"
          label="Machines"
          value={this.state.machines}
          onChange={this.handleChange('machines')}
          type="number"
          className={classes.numberInput}
          // inputProps={{ style: { textAlign: 'right' } }}
          margin="normal"
        />

        <TextField
          id="jobs"
          label="Jobs"
          value={this.state.jobs}
          onChange={this.handleChange('jobs')}
          type="number"
          className={classes.numberInput}
          // inputProps={{ style: { textAlign: 'right' } }}
          margin="normal"
        />

        <Container state={this.state} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
