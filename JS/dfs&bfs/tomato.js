"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `6 4
1 -1 0 0 0 0
0 -1 0 0 0 0
0 0 0 0 -1 0
0 0 0 0 -1 1`.split("\n");

const [m, n] = input.shift().split(" ").map(Number);
const graph = input.map((v) => v.split(" ").map(Number));

if (graph.flat().every((v) => v === 1)) {
  console.log(0);
  return;
} else {
  const queue = [];

  graph.forEach((row, rowIdx) => {
    row.forEach((v, colIdx) => v === 1 && queue.push([rowIdx, colIdx]));
  });

  const dx = [-1, 0, 1, 0];
  const dy = [0, -1, 0, 1];

  let point = 0;

  while (queue.length > point) {
    const [x, y] = queue[point++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m || graph[nx][ny] < 0) continue;

      if (graph[nx][ny] === 0) {
        graph[nx][ny] = graph[x][y] + 1;
        queue.push([nx, ny]);
      } else {
        graph[nx][ny] = Math.min(graph[nx][ny], graph[x][y] + 1);
      }
    }
  }

  let result = 0;

  const arr = graph.flat();

  if (arr.includes(0)) {
    result = -1;
  } else {
    result = Math.max(...arr) - 1;
  }

  console.log(result);
}
