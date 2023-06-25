"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `15 14
00000111100000
11111101111110
11011101101110
11011101100000
11011111111111
11011111111100
11000000011111
01111111111111
00000000011111
01111111111000
00011111111000
00000001111000
11111111110011
11100011111111
11100011111111`.split("\n");

const N = Number(input[0].split(" ")[0]);
const M = Number(input[0].split(" ")[1]);

let graph = Array.from(Array(N), () => Array(M).fill(0));

for (let i = 0; i < N; i++) {
  graph[i] = input[i + 1].split("").map((item) => Number(item));
}

const dfs = (x, y) => {
  if (x <= -1 || x >= N || y <= -1 || y >= M) return false;

  if (graph[x][y] === 0) {
    graph[x][y] = 1;
    dfs(x - 1, y);
    dfs(x, y - 1);
    dfs(x + 1, y);
    dfs(x, y + 1);
    return true;
  }

  return false;
};

let result = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (dfs(i, j)) result += 1;
  }
}

console.log(result);
