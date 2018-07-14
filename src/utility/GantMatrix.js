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

  if (task.start > gantMatrix[task.machine].length) {
    let interval = task.start - gantMatrix[task.machine].length;
    gantMatrix[task.machine] = gantMatrix[task.machine].concat(
      getArrayWithJobNumber(interval, -1)
    );
    gantMatrix[task.machine] = gantMatrix[task.machine].concat(
      getArrayWithJobNumber(task.interval, nextJobNumber)
    );
  } else {
    searchFreeTimeSlot(gantMatrix, task, nextJobNumber);
    // gantMatrix[task.machine] = gantMatrix[task.machine].concat(
    //   getArrayWithJobNumber(task.interval, nextJobNumber)
    // );
  }
  if (jobMatrix2[nextJobNumber][0] !== undefined) {
    jobMatrix2[nextJobNumber][0].start = gantMatrix[task.machine].length;
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
  let taskStartTime = task.start;
  let gantMatrixMachineLength = gantMatrix[task.machine].length;
  let bool = false;
  let amountFreeTimeSlot = 0;

  do {
    if (
      gantMatrix[task.machine][taskStartTime] === -1 ||
      gantMatrix[task.machine][taskStartTime] === undefined
    ) {
      amountFreeTimeSlot = amountFreeTimeSlot + 1;
    }
    if (amountFreeTimeSlot === task.interval) {
      bool = true;
      for (
        let index = taskStartTime + 1 - task.interval;
        index < taskStartTime + 1;
        index++
      ) {
        gantMatrix[task.machine][index] = nextJobNumber;
      }
    }

    taskStartTime = taskStartTime + 1;
  } while (bool === false);

  // for (
  //   let index = taskStartTime + 1;
  //   index < gantMatrixMachineLength + 10;
  //   index++
  // ) {

  //   if (
  //     (gantMatrix[task.machine][index] === -1 ||
  //       gantMatrix[task.machine][index] === undefined) &&
  //     amountFreeTimeSlot !== -1
  //   ) {
  //     amountFreeTimeSlot = amountFreeTimeSlot + 1;
  //     console.log("amount free TimeSlot" + amountFreeTimeSlot);
  //     if (amountFreeTimeSlot === task.interval) {
  //       amountFreeTimeSlot = -1;
  //       for (let index2 = index - task.interval; index2 < index; index++) {
  //         gantMatrix[task.machine][index2] = nextJobNumber;
  //       }
  //     }
  //   }
  // }
}
