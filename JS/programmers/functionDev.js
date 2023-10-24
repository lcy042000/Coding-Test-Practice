function solution(progresses, speeds) {
  var answer = [];

  let queue = progresses.map((v, i) => [v, speeds[i]]);
  const deploy = [];

  while (queue.length) {
    queue.map((v) => {
      v[0] += v[1];
    });

    if (queue[0][0] >= 100) {
      let cnt = 0;

      while (queue.length && queue[0][0] >= 100) {
        cnt++;
        queue.shift();
      }

      deploy.push(cnt);
    }
  }

  answer = deploy;
  return answer;
}
