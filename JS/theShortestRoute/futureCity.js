"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `4 2
1 3
2 4
3 4`.split("\n");

const [N, M] = input[0].split(" ").map((v) => parseInt(v));
const graph = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));

for (let i = 1; i < N + 1; i++) {
  graph[i][i] = 0;
}

for (let i = 1; i < M + 1; i++) {
  const [a, b] = input[i].split(" ").map((v) => parseInt(v));
  graph[a][b] = 1;
  graph[b][a] = 1;
}

for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < N + 1; j++) {
    for (let k = 1; k < N + 1; k++) {
      graph[j][k] = Math.min(graph[j][k], graph[j][i] + graph[i][k]);
    }
  }
}
const [X, K] = input[M + 1].split(" ").map((v) => parseInt(v));

const result =
  graph[1][K] === Infinity || graph[K][X] === Infinity
    ? -1
    : graph[1][K] + graph[K][X];

console.log(result);
