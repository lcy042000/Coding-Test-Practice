"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR`.split("\n");

const n = +input.shift();
const graph = input.map((v) => v.split(""));
let visited = Array.from(Array(n), () => Array(n).fill(false));
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

let count = 0;
let amblyopiaCount = 0;

function dfs(x, y, color) {
  if (
    x >= 0 &&
    x < n &&
    y >= 0 &&
    y < n &&
    !visited[x][y] &&
    graph[x][y] === color
  ) {
    visited[x][y] = true;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];
      dfs(nx, ny, color);
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      count++;
      dfs(i, j, graph[i][j]);
    }
  }
}

visited = Array.from(Array(n), () => Array(n).fill(false));
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === "G") {
      graph[i][j] = "R";
    }
  }
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (!visited[i][j]) {
      amblyopiaCount++;
      dfs(i, j, graph[i][j]);
    }
  }
}

console.log(count, amblyopiaCount);
