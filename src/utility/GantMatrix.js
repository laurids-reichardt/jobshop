export function genMachineOrderForGant(
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
  return gantMatrix;
}

function insertJobInGant(gantMatrix, jobMatrix2, nextJobNumber) {
  let task = jobMatrix2[nextJobNumber].shift();

  // if (gantMatrix[task.machine].length === 0) {
  //   gantMatrix[task.machine] = gantMatrix[task.machine].concat(
  //     getArrayWithJobNumber(task.interval, nextJobNumber)
  //   );
  // } else {
  if (task.start - gantMatrix[task.machine].length > 0) {
    let interval = task.start - gantMatrix[task.machine].length;
    gantMatrix[task.machine] = gantMatrix[task.machine].concat(
      getArrayWithJobNumber(interval, -1)
    );
    gantMatrix[task.machine] = gantMatrix[task.machine].concat(
      getArrayWithJobNumber(task.interval, nextJobNumber)
    );
  } else {
    if (searchFreeTimeSlot(gantMatrix, task, nextJobNumber) === false) {
      gantMatrix[task.machine] = gantMatrix[task.machine].concat(
        getArrayWithJobNumber(task.interval, nextJobNumber)
      );
    }
  }
}
// }

function getArrayWithJobNumber(interval, jobnumber) {
  const array = [];
  for (let index = 0; index < interval; index++) {
    array.push(jobnumber);
  }
  console.log(array);
  return array;
}

function searchFreeTimeSlot(gantMatrix, task, nextJobNumber) {
  let bool = false;
  let taskStartTime = task.start;
  let gantMatrixMachineLength = gantMatrix[task.machine].length;

  for (
    let index = taskStartTime + 1;
    index < gantMatrixMachineLength + 1;
    index++
  ) {
    let amountFreeTimeSlot = 0;
    if (gantMatrix[task.machine][index] === -1) {
      amountFreeTimeSlot++;
      if (amountFreeTimeSlot === task.interval) {
        bool = true;
        for (
          let index2 = index + 1 - task.interval;
          index2 < index + 1;
          index++
        ) {
          gantMatrix[task.machine][index2] = nextJobNumber;
        }
      }
    }
  }
  return bool;
}
