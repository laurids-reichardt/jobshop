import { getRandomInt } from './UtilityFunctions.js';

export function genMachineOrder(matrix, machinesAmount, jobsAmount) {
  // make a copy of the input job matrix
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
