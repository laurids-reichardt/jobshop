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
  jsonViewContainer: {
    width: '100%',
    display: 'flex',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: 2,
      jobs: 9,
      variants: 100,
      maxInterval: 3,
      jobsStr: 'Test',
      jobMatrix: [],
      machineMatrix: [],
      gantMatrix: [],
    };
  }

  handleGenerate = () => {
    const jobMatrix = generateJobMatrix(
      this.state.jobs,
      this.state.machines,
      this.state.maxInterval
    );

    // const jobStr = genJobStringMatrix(jobMatrix);

    const machineMatrix = genMachineOrder(
      jobMatrix,
      this.state.machines,
      this.state.jobs
    );

    const gantMatrix = genMachineOrderForGant(
      machineMatrix,
      jobMatrix,
      this.state.machines,
      this.state.jobs
    );

    this.setState({
      jobMatrix: jobMatrix,
      // jobsStr: jobStr,
      machineMatrix: machineMatrix,
      gantMatrix: gantMatrix,
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
          margin="normal"
        />

        <TextField
          id="jobs"
          label="Jobs"
          value={this.state.jobs}
          onChange={this.handleChange('jobs')}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="variants"
          label="Variants"
          value={this.state.variants}
          onChange={this.handleChange('variants')}
          type="number"
          className={classes.numberInput}
          margin="normal"
        />

        <TextField
          id="maxInterval"
          label="Max Interval Lenght"
          value={this.state.maxInterval}
          onChange={this.handleChange('maxInterval')}
          type="number"
          className={classes.maxIntervalLengthInput}
          margin="normal"
        />

        <br />

        <Container gantMatrix={this.state.gantMatrix} />

        <br />

        {/* <TextField
          id="textarea"
          label="Generated output"
          placeholder="Placeholder"
          multiline
          value={this.state.jobsStr}
          className={classes.multiline}
          margin="normal"
        /> */}

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
