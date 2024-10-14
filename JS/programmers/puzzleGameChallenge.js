function solution(diffs, times, limit) {
  var answer = 0;

  let start = Infinity,
    end = -Infinity;

  diffs.forEach((v) => {
    if (start > v) start = v;
    if (end < v) end = v;
  });

  const calcTime = (level) => {
    let time = times[0];

    for (let i = 1; i < times.length; i++) {
      if (diffs[i] <= level) {
        time += times[i];
        continue;
      }

      time += (diffs[i] - level) * (times[i] + times[i - 1]) + times[i];
    }

    return time;
  };

  while (start < end) {
    const mid = parseInt((start + end) / 2);
    const time = calcTime(mid);

    if (limit < time) {
      start = mid + 1;
    } else end = mid;
  }

  return end;
}
