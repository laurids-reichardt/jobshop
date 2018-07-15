import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';

import Container from './Container';

import { generateJobMatrix, genJobStringMatrix } from './utility/JobMatrix';
import { genMachineOrder } from './utility/MachineMatrix';
import { genMachineOrderForGant } from './utility/GantMatrix';
import { getArrayWithJobNumber } from './utility/UtilityFunctions';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function makeMatrixCertainLength(matrix, minLength) {
  return matrix.map(machine => {
    const diff = minLength - machine.length;
    if (diff > 0) {
      return machine.concat(getArrayWithJobNumber(diff, -1));
    } else {
      return machine;
    }
  });
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
    width: 320,
  },
  jsonViewContainer: {
    width: '100%',
    display: 'flex',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: 8,
      jobs: 9,
      variants: 1000,
      maxInterval: 6,
      jobsStr: '\n\n\n',
      jobMatrix: [],
      machineMatrix: [],
      gantMatrix: [],
      solutionLength: 0,
    };
  }

  handleGenerate = () => {
    const jobMatrix = generateJobMatrix(
      this.state.jobs,
      this.state.machines,
      this.state.maxInterval
    );

    const jobStr = genJobStringMatrix(jobMatrix, this.state.maxInterval);

    this.setState(
      {
        jobMatrix: jobMatrix,
        jobsStr: jobStr,
      }
      // this.handleRun()
    );
  };

  handleRun = () => {
    let bestSolutionLength = 10000;
    let longestSolutionLength = 0;
    const solutionsArray = [];

    for (let index = 0; index < this.state.variants; index++) {
      const machineMatrix = genMachineOrder(
        this.state.jobMatrix,
        this.state.machines,
        this.state.jobs
      );

      const gantMatrix = genMachineOrderForGant(
        machineMatrix,
        this.state.jobMatrix,
        this.state.machines,
        this.state.jobs
      );

      const solutionLength = gantMatrix.length > 0 ? gantMatrix[0].length : 0;

      if (solutionLength < bestSolutionLength) {
        longestSolutionLength =
          longestSolutionLength < solutionLength
            ? solutionLength
            : longestSolutionLength;

        bestSolutionLength = solutionLength;

        solutionsArray.push({
          machineMatrix: machineMatrix,
          gantMatrix: makeMatrixCertainLength(
            gantMatrix,
            longestSolutionLength
          ),
          solutionLength: solutionLength,
          longestSolutionLength: longestSolutionLength,
        });
        console.log(bestSolutionLength);
      }
    }

    asyncForEach(solutionsArray, async element => {
      await delay(100);

      this.setState(
        {
          machineMatrix: element.machineMatrix,
          gantMatrix: element.gantMatrix,
          solutionLength: element.longestSolutionLength,
        },
        console.log('setState: ' + element.solutionLength)
      );
    });
  };

  handleChange = name => event => {
    // make sure input value is between 1 and 9
    let value = event.target.value > 9 ? 9 : event.target.value;
    value = event.target.value < 1 ? 1 : value;
    this.setState({
      [name]: value,
      // [name]: event.target.value,
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

        <Button
          onClick={this.handleRun}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Run
        </Button>

        <TextField
          id="machines"
          label="Machines"
          defaultValue={this.state.machines}
          onBlur={this.handleChange('machines')}
          min="0"
          max="100"
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="jobs"
          label="Jobs"
          defaultValue={this.state.jobs}
          onBlur={this.handleChange('jobs')}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="variants"
          label="Variants"
          defaultValue={this.state.variants}
          onBlur={this.handleChange('variants')}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="maxInterval"
          label="Max Interval Lenght"
          defaultValue={this.state.maxInterval}
          onBlur={this.handleChange('maxInterval')}
          type="number"
          className={classes.maxIntervalLengthInput}
          margin="normal"
        />

        <br />

        <TextField
          id="textarea"
          label="Job Matrix"
          placeholder="Placeholder"
          multiline
          value={this.state.jobsStr}
          className={classes.multiline}
          margin="normal"
        />

        <br />
        <br />
        <br />

        <Container
          gantMatrix={this.state.gantMatrix}
          solutionLength={this.state.solutionLength}
        />

        <br />
        <br />
        <br />

        <div className={classes.jsonViewContainer}>
          <ReactJson
            name="jobMatrix"
            src={this.state.jobMatrix}
            theme="monokai"
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            style={{ flex: 1 }}
          />

          <ReactJson
            name="machineMatrix"
            src={this.state.machineMatrix}
            theme="monokai"
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            style={{ flex: 1 }}
          />

          <ReactJson
            name="gantMatrix"
            src={this.state.gantMatrix}
            theme="monokai"
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            style={{ flex: 1 }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
