"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `7
0110100
0110101
1110101
0000111
0100000
0111110
0111000`
        .trim()
        .split("\n");

const N = parseInt(input[0]);
const graph = [];
const visited = Array.from(Array(N), () => Array(N).fill(-1));

input.slice(1).forEach((v) => {
  graph.push(v.split("").map(Number));
});

let count = 1;

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

const queue = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (visited[i][j] !== -1 || graph[i][j] === 0) continue;

    queue.push([i, j]);
    while (queue.length > 0) {
      const [x, y] = queue.shift();

      if (visited[x][y] !== -1) continue;

      if (graph[x][y] === 0) {
        visited[x][y] = 0;
      } else {
        visited[x][y] = count;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (0 <= nx && nx < N && 0 <= ny && ny < N) {
          if (graph[nx][ny] !== 0 && visited[nx][ny] === -1) {
            queue.push([nx, ny]);
          }
        }
      }
    }
    count++;
  }
}

const result = {};

visited.forEach((v) => {
  v.forEach((value) => {
    if (value === -1) return;

    if (result[value] === undefined) {
      result[value] = 1;
    } else {
      result[value]++;
    }
  });
});
console.log(Object.keys(result).length);
console.log(
  Object.values(result)
    .sort((a, b) => a - b)
    .join("\n")
);
