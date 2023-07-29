"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4 6
0 0 0 0 0 0
1 0 0 0 0 2
1 1 1 0 0 2
0 0 0 0 0 2`.split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = input.map((v) => v.split(" ").map(Number));

function dfs(wall) {
  if (wall === 3) {
    getSafeArea();
    return;
  }

  graph.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === 0) {
        graph[rowIdx][colIdx] = 1;
        dfs(wall + 1);
        graph[rowIdx][colIdx] = 0;
      }
    });
  });
}

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

let result = 0;

function getSafeArea() {
  const queue = [];

  graph.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === 2) {
        queue.push([rowIdx, colIdx]);
      }
    });
  });

  const arr = graph.map((v) => v.slice());

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        if (arr[nx][ny] === 0) {
          arr[nx][ny] = 2;
          queue.push([nx, ny]);
        }
      }
    }
  }

  let cnt = 0;
  arr.forEach((row) => {
    row.forEach((col) => {
      if (col === 0) {
        cnt += 1;
      }
    });
  });

  result = Math.max(result, cnt);
}

dfs(0);
console.log(result);
