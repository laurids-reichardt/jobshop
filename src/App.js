import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';

import Container from './Container';

import {
  generateJobMatrix,
  genJobStringMatrix,
  gernerateJobMatrixForBeginning,
} from './utility/JobMatrix';
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
    width: 60,
  },
  maxIntervalLengthInput: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 160,
  },
  multiline: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 580,
  },
  jsonViewContainer: {
    width: '100%',
    display: 'flex',
  },
  infoText: {
    maxWidth: '800px',
  },
  link: {
    color: '#2196f3',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: 6,
      jobs: 6,
      variants: 1000,
      maxInterval: 6,
      jobsStr: '\n\n\n',
      jobMatrix: [],
      machineMatrix: [],
      gantMatrix: [],
      solutionLength: 0,
      runDisable: false,
    };
  }

  componentDidMount = () => {
    const jobMatrix = gernerateJobMatrixForBeginning();

    const jobStr = genJobStringMatrix(jobMatrix, this.state.maxInterval);

    this.setState({
      jobMatrix: jobMatrix,
      jobsStr: jobStr,
    });
  };

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
      },
      () => setTimeout(() => this.handleRun(), 200)
    );
  };

  handleRun = () => {
    this.setState({ runDisable: true });
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
      }
    }

    (async () => {
      await asyncForEach(solutionsArray, async element => {
        await delay(100);

        this.setState({
          machineMatrix: element.machineMatrix,
          gantMatrix: element.gantMatrix,
          solutionLength: element.longestSolutionLength,
        });
      });
      this.setState({ runDisable: false });
    })().catch(e => console.log(e.stack));
  };

  handleChange = name => event => {
    // make sure input value is between 1 and 9
    // let value = event.target.value > 9 ? 9 : event.target.value;
    // value = event.target.value < 1 ? 1 : value;
    this.setState({
      // [name]: value,
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

        <Typography
          variant="body1"
          component="div"
          className={classes.infoText}
          gutterBottom
        >
          This web application was designed and implemented by Timo Klinz,
          Stefan Haouchet and Laurids Reichardt as a class assignment by Prof.
          Dr.-Ing. Jörg Courant at HTW Berlin. It visualizes a simulation of the
          <a
            href="https://en.wikipedia.org/wiki/Job_shop_scheduling"
            className={classes.link}
          >
            {' '}
            job shop problem
          </a>
          . There are several definitions for the job shop problem. We simulated
          the problem with the following conditions:
          <ol>
            <li>
              A task of a job can only be done when the previous task is done.
            </li>
            <li>One machine can only process one task.</li>
          </ol>
          As default the benchmark matrix
          <a
            href="https://github.com/tamy0612/JSPLIB/blob/master/instances/ft06"
            className={classes.link}
          >
            {' '}
            Fisher and Thompson 06{' '}
          </a>
          is loaded. After clicking on "RUN" our algorithm shows the best gant
          diagram for the benchmark matrix after a 1000 random runs. To generate
          another random job matrix click on "GENERATE". You can adjust the
          generated job matrix by editing the setting values "Machines", "Jobs",
          "Variants" and "Max Interval Length".
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
          disabled={this.state.runDisable}
        >
          Run
        </Button>

        <TextField
          id="machines"
          label="Machines"
          defaultValue={this.state.machines}
          onBlur={this.handleChange('machines')}
          inputProps={{ min: 1, max: 12 }}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="jobs"
          label="Jobs"
          defaultValue={this.state.jobs}
          onBlur={this.handleChange('jobs')}
          inputProps={{ min: 1, max: 9 }}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="variants"
          label="Variants"
          defaultValue={this.state.variants}
          onBlur={this.handleChange('variants')}
          inputProps={{ min: 10, max: 9999 }}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="maxInterval"
          label="Max Interval Length"
          defaultValue={this.state.maxInterval}
          onBlur={this.handleChange('maxInterval')}
          inputProps={{ min: 1, max: 99 }}
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

        <Container
          gantMatrix={this.state.gantMatrix}
          solutionLength={this.state.solutionLength}
        />

        <br />
        <br />

        <div className={classes.jsonViewContainer}>
          <ReactJson
            name="jobMatrix"
            src={this.state.jobMatrix}
            theme="flat"
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            style={{ flex: 1 }}
          />

          <ReactJson
            name="machineMatrix"
            src={this.state.machineMatrix}
            theme="flat"
            enableClipboard={false}
            displayObjectSize={false}
            displayDataTypes={false}
            style={{ flex: 1 }}
          />

          <ReactJson
            name="gantMatrix"
            src={this.state.gantMatrix}
            theme="flat"
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
