import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';

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

function generateJobMatrix(jobs, machines, maxIntervalLength) {
  const matrix = [];

  // for every machine create an array of jobs/interval
  for (let i = 0; i < jobs; i++) {
    let job = [];
    // for every job create a pair of machine & interval and push to array
    for (let j = 0; j < machines; j++) {
      job.push({
        machine: j,
        interval: getRandomInt(1, maxIntervalLength),
      });
    }
    // shuffle machine lane order and push to matrix array
    matrix.push(shuffle(job));
  }

  // for every task inside a job, add the earliest possible task start time
  for (let index = 0; index < jobs; index++) {
    let currentInterval = 0;
    let counter = 0;

    matrix[index] = matrix[index].map(task => {
      let adjustedTask = {
        number: counter,
        machine: task.machine,
        interval: task.interval,
        start: currentInterval,
      };
      currentInterval += task.interval;
      counter++;
      return adjustedTask;
    });
  }

  return matrix;
}

function genJobStringMatrix(matrix) {
  let str = `Jobs: ${matrix.length} Machines: ${matrix[0].length} \n\n`;
  matrix.forEach(job => {
    job.forEach(task => {
      str += `${task.machine} ${task.interval}   `;
    });
    str += '\n';
  });
  return str;
}

function genMachineOrder(matrix, machinesAmount, jobsAmount) {
  const jobMatrix = JSON.parse(JSON.stringify(matrix));
  const machineMatrix = [];
  // fill machine matrix with empty arrays
  for (let index = 0; index < machinesAmount; index++) {
    machineMatrix.push([]);
  }

  for (let index = 0; index < machinesAmount * jobsAmount; index++) {
    let task = null;
    let counter = 0;
    let randomJobNumber = 0;
    do {
      counter++;
      randomJobNumber = getRandomInt(0, jobsAmount - 1);
      task = jobMatrix[randomJobNumber].shift();
    } while (counter < 100 && (task === null || task === undefined));

    machineMatrix[task.machine].push({
      index: index,
      job: randomJobNumber,
      time: task.interval,
    });
  }

  return machineMatrix;
}

function generateGantMatrix(matrix, machinesAmount, jobsAmount) {
  const jobMatrix = JSON.parse(JSON.stringify(matrix));
  let gantMatrix = [];
  // fill machine matrix with empty arrays
  for (let index = 0; index < machinesAmount; index++) {
    gantMatrix.push([]);
  }

  for (let index = 0; index < machinesAmount * jobsAmount; index++) {
    let task = null;
    let counter = 0;
    let randomJobNumber = 0;
    do {
      counter++;
      randomJobNumber = getRandomInt(0, jobsAmount - 1);
      task = jobMatrix[randomJobNumber].shift();
    } while (counter < 100 && (task === null || task === undefined));

    for (let j = 0; j < task.interval; j++) {
      gantMatrix[task.machine].push(randomJobNumber);
    }
  }

  console.log(gantMatrix);
  return gantMatrix;
}

function genMachineOrderForGant(machineMatrix, jobMatrix2, machinesAmount, jobsAmount){
  
  //Diese 2 MaschinenMatrix wird benötigt, da wir sonst die zufällig erstellte 
  //Maschinen Liste löschen. Daher muss mit der komischen copy Methode eine "deep copy" 
  //erstellt werden. 
  let machineMatrix2 = copy(machineMatrix);

  //Initialising gantMatrix
  const gantMatrix = [];
    for(let index = 0; index < machinesAmount; index++){
      gantMatrix.push([]);
    }
  
  //da alle Tasks in die GantMatix eingetragen werden müssen, müssen alle Einträge der Matrix 
  //durchlaufen werden. 
    for(let wholeMatrix = 0; wholeMatrix < machinesAmount * jobsAmount; wholeMatrix ++){
      //Es wird hier geschaut, ob bei Maschine 1 oder 2 der nächste abzuarbeitende Index ist.
      for(let machineIndex = 0; machineIndex < machinesAmount; machineIndex++){
        //Wenn die Zeile (s. 5 weiter unten "machineMatrix2[machineIndex].shift();") schon
        //beim letzten Element aus der MaschinenListe ausgeführt wurde, dann findet er kein
        //Object mehr und es kommt eine Fehlermeldung. Daher ===undefinded Abfrage. 
        if(machineMatrix2[machineIndex][0]===undefined){
        }else{
          //Wenn der Index passt -> Eintrag aus der MaschinenListe löschen 
          //                     -> Eintrag in GantMatrix
          if(machineMatrix2[machineIndex][0].index === wholeMatrix){
            let nextJobNumber = machineMatrix2[machineIndex][0].job;
            machineMatrix2[machineIndex].shift();
            console.log(nextJobNumber);
            insertJobInGant(gantMatrix, jobMatrix2, nextJobNumber);
          }
        }
      }
    }
  console.log("JobMatrix2: ");
  console.log(jobMatrix2);
  console.log("machineMatrix ");
  console.log(machineMatrix);
  console.log("Abgearbeitete machineMatrix2:");
  console.log(machineMatrix2);
  return gantMatrix;
}

function insertJobInGant(gantMatrix, jobMatrix2, nextJobNumber){
  
  let currentTaskObject = null;
  let nextTaskObject = null;
  let earliestStartCurrentTask = null;
  let earliestStartNextTask = null;
  let machineArrayLength = null;
  
  //maschineBestimmen anhand Job
  //aktuelleLängeDerMaschineBestimmen

  //überschreiben des nächsten Startwertes und löschen des 1. Tasks 
  if(jobMatrix2[nextJobNumber][1]===undefined){

  }else{

    currentTaskObject = jobMatrix2[nextJobNumber][0]; 
    nextTaskObject = jobMatrix2[nextJobNumber][1];
    earliestStartCurrentTask = jobMatrix2[nextJobNumber][0].earliestStart;
    earliestStartNextTask = jobMatrix2[nextJobNumber][1].earliestStart;
    machineArrayLength = gantMatrix[jobMatrix2[nextJobNumber][0].machine].length;

    // console.log(currentTaskObject + " " + nextTaskObject + " " + earliestStartCurrentTask + " " + earliestStartNextTask);
    // console.log(jobMatrix2[nextJobNumber][0] + " " + jobMatrix2[nextJobNumber][1] + " " + jobMatrix2[nextJobNumber][0].earliestStart + " " + jobMatrix2[nextJobNumber][1].earliestStart);
    earliestStartNextTask = earliestStartCurrentTask + currentTaskObject.interval;
    console.log("Überschriebener earliestStartWert: "+ earliestStartNextTask);
    console.log(jobMatrix2[nextJobNumber][1].earliestStart);
  }
  if(currentTaskObject===undefined){

  }else{
      if(earliestStartCurrentTask - machineArrayLength > 0){
        for(let index = machineArrayLength; index <= earliestStartCurrentTask; index++){
          gantMatrix[currentTaskObject.machine].push({jobNummer: -1});
        }
      }else{
          for(let index = earliestStartCurrentTask; index < machineArrayLength; index ++){
            let amountFreeTimeSlot = 0; 
            if(gantMatrix[index].jobNummer === -1){
              amountFreeTimeSlot++;
              if(amountFreeTimeSlot === jobMatrix2[nextJobNumber][0].interval){
                //eintragen
              }
            }
          }
        }
      jobMatrix2[nextJobNumber].shift();
    }
}

function copy(o) {
  var output, v, key;
  output = Array.isArray(o) ? [] : {};
  for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? copy(v) : v;
  }
  return output;
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
  jsonViewContainer: {
    width: '100%',
    display: 'flex',
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machines: 3,
      jobs: 1,
      variants: 100,
      maxInterval: 1,
      jobsStr: 'Test',
      jobMatrix: [],
      machineMatrix: [],
      gantMatrix: [],
    };
  }

  handleGenerate = () => {
    this.setState(
      prev => {
        const jobMatrix = generateJobMatrix(
          prev.jobs,
          prev.machines,
          prev.maxInterval
        );


        console.log("JobMatrix Original: ");
        console.log(jobMatrixOriginal);
        
        //Die JobMatrixen werden häufiger benötigt. Daher copy Methoden Aufruf 
        const jobMatrix = copy(jobMatrixOriginal);
        const jobMatrix2 = copy(jobMatrixOriginal);

        const jobStr = genJobStringMatrix(jobMatrix);

        const machineMatrix = genMachineOrder(
          jobMatrix,
          prev.machines,
          prev.jobs
        );

        const gantMatrix = generateGantMatrix(
          jobMatrix,
          prev.machines,
          prev.jobs
        );

        const gantMatrix = genMachineOrderForGant(
          machineMatrix, 
          jobMatrix2, 
          this.state.machines, 
          this.state.jobs
        );

        return {
          jobsStr: jobStr,
          jobMatrix: jobMatrix,
          machineMatrix: machineMatrix,
          gantMatrix: gantMatrix,
        };
      },
      () => {
        // console.log(this.state.machineMatrix);
      }
    );
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

        <Container />
      </div>
    );
  }
}

export default withStyles(styles)(App);
