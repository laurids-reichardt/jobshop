import { getRandomInt, shuffle } from "./UtilityFunctions.js";

export function generateJobMatrix(jobs, machines, maxIntervalLength) {
  const matrix = [];

  // for every machine create an array of jobs/interval
  for (let i = 0; i < jobs; i++) {
    let job = [];
    // for every job create a pair of machine & interval and push to array
    for (let j = 0; j < machines; j++) {
      job.push({
        machine: j,
        interval: getRandomInt(1, maxIntervalLength)
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
        start: currentInterval
      };
      currentInterval += task.interval;
      counter++;
      return adjustedTask;
    });
  }

  return matrix;
}

export function genJobStringMatrix(matrix) {
  let str = `Jobs: ${matrix.length} Machines: ${matrix[0].length} \n\n`;
  matrix.forEach(job => {
    job.forEach(task => {
      str += `${task.machine} ${task.interval}   `;
    });
    str += "\n";
  });
  return str;
}
