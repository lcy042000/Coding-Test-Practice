function convertMin(time) {
  const [hour, min] = time.split(":").map(Number);

  return hour * 60 + min;
}

function solution(plans) {
  var answer = [];

  const tasks = plans
    .map((v) => [v[0], convertMin(v[1]), Number(v[2])])
    .sort((a, b) => b[1] - a[1]);

  const stops = [];

  let [curName, curStartTime, curPlayTime] = tasks.pop();
  let closeTime = curStartTime + curPlayTime;

  while (tasks.length) {
    const [nName, nStartTime, nPlayTime] = tasks.pop();

    if (closeTime <= nStartTime) {
      answer.push(curName);

      while (stops.length) {
        const [stopName, stopRestTime] = stops.pop();
        closeTime += stopRestTime;

        if (closeTime <= nStartTime) {
          answer.push(stopName);
        } else {
          stops.push([stopName, closeTime - nStartTime]);
          break;
        }
      }
    } else {
      stops.push([curName, closeTime - nStartTime]);
    }

    curName = nName;
    curStartTime = nStartTime;
    curPlayTime = nPlayTime;
    closeTime = nStartTime + nPlayTime;
  }

  answer.push(curName);

  while (stops.length) {
    answer.push(stops.pop()[0]);
  }

  return answer;
}
