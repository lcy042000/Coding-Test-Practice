function solution(lines) {
  var answer = 1;

  let timeLine = lines.map((v) => {
    const [day, time, second] = v.split(" ");
    const [h, m, s] = time.split(":").map(Number);
    const pt = Number(second.split("s")[0]);

    const convertTime = h * Math.pow(60, 2) + m * 60 + s;

    return [convertTime - pt + 0.001, convertTime];
  });

  for (let first = 0; first < timeLine.length; first++) {
    const maxTime = timeLine[first][1] + 1;

    let count = 1;
    for (let idx = 0; idx < timeLine.length; idx++) {
      if (idx === first) continue;

      const [start, end] = timeLine[idx];

      if (
        (timeLine[first][1] <= start && start < maxTime) ||
        (timeLine[first][1] <= end && end < maxTime) ||
        (start <= timeLine[first][1] && timeLine[first][1] <= end) ||
        (start < maxTime && maxTime < end)
      )
        count++;
    }

    answer = Math.max(answer, count);
  }

  return answer;
}
