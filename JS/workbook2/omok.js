"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 2 2 2 2
0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 2 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 2 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 2 0 0 0 2 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 2 2 2 2 2`.split("\n");

const visited = Array.from(Array(4), () =>
  Array.from(Array(19), () => Array(19).fill(-1))
);

const map = input.map((v, x) =>
  v.split(" ").map((value, y) => {
    if (value === "1") {
      for (let i = 0; i < 4; i++) {
        visited[i][x][y] = 1;
      }
      return "b";
    } else if (value === "2") {
      for (let i = 0; i < 4; i++) {
        visited[i][x][y] = 1;
      }
      return "w";
    } else {
      return value;
    }
  })
);

const dx = [1, 1, 0, -1];
const dy = [0, 1, 1, 1];

let queue = [];

const bfs = () => {
  while (queue.length) {
    const [dir, x, y] = queue.shift();
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || 19 <= nx || ny < 0 || 19 <= ny) {
      if (visited[dir][x][y] === 5) {
        queue = [];
        return true;
      }
      continue;
    }

    if (map[nx][ny] !== map[x][y]) {
      if (visited[dir][x][y] === 5) {
        queue = [];
        return true;
      }
      continue;
    }

    visited[dir][nx][ny] = visited[dir][x][y] + 1;

    queue.push([dir, nx, ny]);
  }
};

for (let i = 0; i < 19; i++) {
  for (let j = 0; j < 19; j++) {
    if (map[j][i] !== "n") {
      for (let k = 0; k < 4; k++) {
        if (visited[k][j][i] === 1) {
          queue.push([k, j, i]);
          const result = bfs();

          if (result) {
            map[j][i] === "b" ? console.log(1) : console.log(2);
            console.log(j + 1, i + 1);
            return;
          }
        }
      }
    }
  }
}

console.log(0);
