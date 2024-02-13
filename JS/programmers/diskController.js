function solution(jobs) {
  var answer = 0;

  const len = jobs.length;

  jobs.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    else return b[1] - a[1];
  });

  const queue = [];
  let time = 0;
  let totalTime = 0;

  while (jobs.length || queue.length) {
    if (!queue.length) {
      const job = jobs.pop();
      queue.push(job);
      time = job[0];
    }

    const next = queue.shift();
    totalTime += next[1] + (time - next[0]);
    time += next[1];

    const nexts = [];
    for (let i = jobs.length - 1; i > -1; i--) {
      if (jobs[i][0] > time) break;

      nexts.push(jobs.pop());
    }

    queue.push(...nexts);
    queue.sort((a, b) => {
      if (a[1] !== b[1]) return a[1] - b[1];
      else a[0] - b[0];
    });
  }

  answer = parseInt(totalTime / len);

  return answer;
}
