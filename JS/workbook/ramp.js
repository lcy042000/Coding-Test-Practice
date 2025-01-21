"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `6 1
3 2 1 1 2 3
3 2 2 1 2 3
3 2 2 2 3 3
3 3 3 3 3 3
3 3 3 3 2 2
3 3 3 3 2 2`.split("\n");

const [N, L] = input[0].split(" ").map(Number);
let roads = input.slice(1).map((v) => v.split(" ").map(Number));
let answer = 0;

for (let j = 0; j < N; j++) {
  const road = [];
  for (let i = 0; i < N; i++) {
    road.push(roads[i][j]);
  }
  roads.push(road);
}

const installRamp = (road, isVisited) => {
  for (let i = 0; i < N - 1; i++) {
    if (road[i] === road[i + 1]) continue;
    if (road[i] < road[i + 1]) {
      if (i < L - 1) return false;
      if (
        !road
          .slice(i - L + 1, i + 1)
          .every((v, idx) => v === road[i] && !isVisited[i - (L - (idx + 1))])
      )
        return false;

      for (let j = i - L + 1; j < i + 1; j++) isVisited[j] = true;
    } else {
      if (N - i <= L) return false;
      if (
        !road
          .slice(i + 1, i + 1 + L)
          .every((v, idx) => v === road[i + 1] && !isVisited[i + 1 + idx])
      )
        return false;

      for (let j = i + 1; j < i + 1 + L; j++) isVisited[j] = true;
    }
  }

  return true;
};

for (let idx = 0; idx < 2 * N; idx++) {
  let sum = 0;
  const head = roads[idx];

  for (let i = 1; i < N; i++) {
    const sub = Math.abs(head[i - 1] - head[i]);

    if (sub > 1) {
      sum = Infinity;
      break;
    }

    sum += sub;
  }

  if (sum === Infinity) continue;

  if (!sum) {
    answer++;
    continue;
  }

  const isVisited = Array(N).fill(false);

  if (!installRamp(head, isVisited)) continue;

  answer++;
}

console.log(answer);
