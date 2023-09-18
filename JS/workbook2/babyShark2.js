"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `7 4
0 0 0 1
0 1 0 0
0 0 0 0
0 0 0 1
0 0 0 0
0 1 0 0
0 0 0 1`.split("\n");

const [n, m] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));
let visited = Array.from(Array(n), () => Array(m).fill(-1));

const dx = [0, -1, -1, -1, 0, 1, 1, 1];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

const sharks = [];

map.forEach((row, x) => {
  row.forEach((col, y) => {
    if (col === 1) sharks.push([x, y]);
  });
});

let queue = [];
const bfs = () => {
  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (visited[nx][ny] > -1) continue;

      visited[nx][ny] = visited[x][y] + 1;
      queue.push([nx, ny]);
    }
  }

  return visited;
};

const newArr = Array.from(Array(n), () => Array(m).fill(Infinity));

sharks.forEach((sharks) => {
  const [x, y] = sharks;

  visited = Array.from(Array(n), () => Array(m).fill(-1));
  visited[x][y] = 0;
  queue = [];
  queue.push([x, y]);
  const arr = bfs();

  arr.forEach((row, x) => {
    row.forEach((col, y) => {
      if (col >= 0) newArr[x][y] = Math.min(col, newArr[x][y]);
    });
  });
});
console.log(Math.max(...newArr.flat()));
