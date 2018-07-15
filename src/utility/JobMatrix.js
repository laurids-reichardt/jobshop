import { getRandomInt, shuffle } from './UtilityFunctions.js';

export function generateJobMatrix(jobs, machines, maxIntervalLength) {
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

export function genJobStringMatrix(matrix, maxIntervalLength) {
  let str = `Jobs: ${matrix.length}   Machines: ${
    matrix[0].length
  }   Max Interval: ${maxIntervalLength} \n`;
  matrix.forEach(job => {
    str += '\n';
    job.forEach(task => {
      str += `${task.machine} ${task.interval}   `;
    });
  });
  return str;
}

export function gernerateJobMatrixForBeginning() {
  const jobMatrix = [];

  let job = [];

  job.push({
    machine: 2,
    interval: 1,
  });
  job.push({
    machine: 0,
    interval: 3,
  });

  job.push({
    machine: 1,
    interval: 6,
  });

  job.push({
    machine: 3,
    interval: 7,
  });

  job.push({
    machine: 5,
    interval: 3,
  });

  job.push({
    machine: 4,
    interval: 6,
  });

  job.push({
    machine: 1,
    interval: 8,
  });

  job.push({
    machine: 2,
    interval: 5,
  });

  job.push({
    machine: 4,
    interval: 10,
  });

  job.push({
    machine: 5,
    interval: 10,
  });

  job.push({
    machine: 0,
    interval: 10,
  });

  job.push({
    machine: 3,
    interval: 4,
  });

  job.push({
    machine: 2,
    interval: 5,
  });

  job.push({
    machine: 3,
    interval: 4,
  });

  job.push({
    machine: 5,
    interval: 8,
  });

  job.push({
    machine: 0,
    interval: 9,
  });

  job.push({
    machine: 1,
    interval: 1,
  });

  job.push({
    machine: 4,
    interval: 7,
  });

  job.push({
    machine: 1,
    interval: 5,
  });

  job.push({
    machine: 0,
    interval: 5,
  });

  job.push({
    machine: 2,
    interval: 5,
  });

  job.push({
    machine: 3,
    interval: 3,
  });

  job.push({
    machine: 4,
    interval: 8,
  });

  job.push({
    machine: 5,
    interval: 9,
  });

  job.push({
    machine: 2,
    interval: 9,
  });

  job.push({
    machine: 1,
    interval: 3,
  });

  job.push({
    machine: 4,
    interval: 5,
  });

  job.push({
    machine: 5,
    interval: 4,
  });
  job.push({
    machine: 0,
    interval: 3,
  });
  job.push({
    machine: 3,
    interval: 1,
  });
  job.push({
    machine: 1,
    interval: 3,
  });
  job.push({
    machine: 3,
    interval: 3,
  });
  job.push({
    machine: 5,
    interval: 9,
  });
  job.push({
    machine: 0,
    interval: 10,
  });
  job.push({
    machine: 4,
    interval: 4,
  });
  job.push({
    machine: 2,
    interval: 1,
  });
}
