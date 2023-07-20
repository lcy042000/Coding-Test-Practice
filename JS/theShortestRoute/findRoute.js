"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `7
0 0 0 1 0 0 0
0 0 0 0 0 0 1
0 0 0 0 0 0 0
0 0 0 0 1 1 0
1 0 0 0 0 0 0
0 0 0 0 0 0 1
0 0 1 0 0 0 0`.split("\n");

const N = parseInt(input[0]);
const graph = Array(N);

for (let i = 1; i < N + 1; i++) {
  const temp = input[i].split(" ").map((v) => parseInt(v));
  graph[i - 1] = temp;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    for (let k = 0; k < N; k++) {
      if (graph[j][i] && graph[i][k]) {
        graph[j][k] = 1;
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  console.log(graph[i].join(" "));
}
