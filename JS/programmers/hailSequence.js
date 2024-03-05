function collatz(num) {
  if (num % 2 === 0) return num / 2;
  else return num * 3 + 1;
}

function solution(k, ranges) {
  var answer = [];

  const points = [[0, k]];
  let num = k;

  while (num > 1) {
    num = collatz(num);
    points.push([points.length, num]);
  }

  const area = Array(points.length - 1);

  for (let i = 0; i < points.length - 1; i++) {
    const [p1x, p1y] = points[i];
    const [p2x, p2y] = points[i + 1];
    const [min, max] = [Math.min(p1y, p2y), Math.max(p1y, p2y)];

    area[i] = min + (max - min) / 2;
  }

  const newRanges = ranges.map((v) => [v[0], area.length + v[1]]);

  for (const [start, end] of newRanges) {
    if (start === end) {
      answer.push(0);
      continue;
    }

    if (start > end) {
      answer.push(-1);
      continue;
    }

    const arr = area.slice(start, end);
    answer.push(arr.reduce((acc, cur) => (acc += cur), 0));
  }

  return answer;
}
