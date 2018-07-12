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

function genJobStringMatrix(matrix) {
  let str = `Jobs: ${matrix.length} Machines: ${matrix[0].length} \n\n`;
  matrix.forEach(job => {
    job.forEach(subJob => {
      str += `${subJob.machine} ${subJob.interval}   `;
    });
    str += '\n';
  });
  return str;
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
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 50,
  },
  maxIntervalLengthInput: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  multiline: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: 6,
      jobs: 6,
      maxInterval: 5,
      jobsStr: 'Test',
      matrix: [],
    };
  }

  handleGenerate = () => {
    this.setState(prev => {
      const matrix = genJobArray(prev.jobs, prev.machines);
      const jobStr = genJobStringMatrix(matrix);

      return { jobsStr: jobStr, matrix: matrix };
    });
  };

  handleChange = name => event => {
    // make sure input value is between 1 and 9
    let value = event.target.value > 9 ? 9 : event.target.value;
    value = event.target.value < 1 ? 1 : value;
    this.setState({
      [name]: value,
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

        <TextField
          id="maxInterval"
          label="Max Interval Lenght"
          value={this.state.maxInterval}
          onChange={this.handleChange('maxInterval')}
          type="number"
          className={classes.maxIntervalLengthInput}
          // inputProps={{ style: { textAlign: 'right' } }}
          margin="normal"
        />

        <br />

        <TextField
          id="textarea"
          label="Generated output"
          placeholder="Placeholder"
          multiline
          value={this.state.jobsStr}
          className={classes.multiline}
          margin="normal"
        />

        {/* <Container state={this.state} /> */}
      </div>
    );
  }
}

export default withStyles(styles)(App);
