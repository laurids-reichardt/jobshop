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

function genMachineOrderForGant(
  machineMatrix,
  jobMatrix,
  machinesAmount,
  jobsAmount
) {
  const jobMatrix2 = JSON.parse(JSON.stringify(jobMatrix));
  const machineMatrix2 = JSON.parse(JSON.stringify(machineMatrix));

  //Initialising gantMatrix
  const gantMatrix = [];
  for (let index = 0; index < machinesAmount; index++) {
    gantMatrix.push([]);
  }

  //da alle Tasks in die GantMatix eingetragen werden müssen, müssen alle Einträge der Matrix
  //durchlaufen werden.
  for (
    let wholeMatrix = 0;
    wholeMatrix < machinesAmount * jobsAmount;
    wholeMatrix++
  ) {
    //Es wird hier geschaut, ob bei Maschine 1 oder 2 der nächste abzuarbeitende Index ist.
    for (let machineIndex = 0; machineIndex < machinesAmount; machineIndex++) {
      //Wenn die Zeile (s. 5 weiter unten "machineMatrix2[machineIndex].shift();") schon
      //beim letzten Element aus der MaschinenListe ausgeführt wurde, dann findet er kein
      //Object mehr und es kommt eine Fehlermeldung. Daher ===undefinded Abfrage.
      if (machineMatrix2[machineIndex][0] !== undefined) {
        //Wenn der Index passt -> Eintrag aus der MaschinenListe löschen
        //                     -> Eintrag in GantMatrix
        if (machineMatrix2[machineIndex][0].index === wholeMatrix) {
          let nextJobNumber = machineMatrix2[machineIndex][0].job;
          machineMatrix2[machineIndex].shift();
          console.log(nextJobNumber);
          insertJobInGant(gantMatrix, jobMatrix2, nextJobNumber);
        }
      }
    }
  }
  console.log('JobMatrix2: ');
  console.log(jobMatrix2);
  console.log('machineMatrix ');
  console.log(machineMatrix);
  console.log('Abgearbeitete machineMatrix2:');
  console.log(machineMatrix2);
  return gantMatrix;
}

function insertJobInGant(gantMatrix, jobMatrix2, nextJobNumber) {
  let currentTaskObject = null;
  let nextTaskObject = null;
  let earliestStartCurrentTask = null;
  let earliestStartNextTask = null;
  let machineArrayLength = null;

  //maschineBestimmen anhand Job
  //aktuelleLängeDerMaschineBestimmen

  //überschreiben des nächsten Startwertes und löschen des 1. Tasks
  if (jobMatrix2[nextJobNumber][1] === undefined) {
  } else {
    currentTaskObject = jobMatrix2[nextJobNumber][0];
    nextTaskObject = jobMatrix2[nextJobNumber][1];
    earliestStartCurrentTask = jobMatrix2[nextJobNumber][0].earliestStart;
    earliestStartNextTask = jobMatrix2[nextJobNumber][1].earliestStart;
    machineArrayLength =
      gantMatrix[jobMatrix2[nextJobNumber][0].machine].length;

    // console.log(currentTaskObject + " " + nextTaskObject + " " + earliestStartCurrentTask + " " + earliestStartNextTask);
    // console.log(jobMatrix2[nextJobNumber][0] + " " + jobMatrix2[nextJobNumber][1] + " " + jobMatrix2[nextJobNumber][0].earliestStart + " " + jobMatrix2[nextJobNumber][1].earliestStart);
    earliestStartNextTask =
      earliestStartCurrentTask + currentTaskObject.interval;
    console.log('Überschriebener earliestStartWert: ' + earliestStartNextTask);
    console.log(jobMatrix2[nextJobNumber][1].earliestStart);
  }
  if (currentTaskObject === undefined) {
  } else {
    if (earliestStartCurrentTask - machineArrayLength > 0) {
      for (
        let index = machineArrayLength;
        index <= earliestStartCurrentTask;
        index++
      ) {
        gantMatrix[currentTaskObject.machine].push({ jobNummer: -1 });
      }
    } else {
      for (
        let index = earliestStartCurrentTask;
        index < machineArrayLength;
        index++
      ) {
        let amountFreeTimeSlot = 0;
        if (gantMatrix[index].jobNummer === -1) {
          amountFreeTimeSlot++;
          if (amountFreeTimeSlot === jobMatrix2[nextJobNumber][0].interval) {
            //eintragen
          }
        }
      }
    }
    jobMatrix2[nextJobNumber].shift();
  }
}
