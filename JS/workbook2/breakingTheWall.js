"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `1 1
0`.split("\n");

const [n, m] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split("").map(Number));
let visited = Array.from(Array(2), () =>
  Array.from(Array(n), () => Array(m).fill(-1))
);
visited[0][0][0] = 1;

const dx = [0, -1, 0, 1];
const dy = [-1, 0, 1, 0];

const queue = [[0, 0, 0]];

const bfs = () => {
  let peek = 0;
  while (queue.length > peek) {
    let [x, y, isBroken] = queue[peek++];

    if (x === n - 1 && y === m - 1) return visited[isBroken][x][y];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (map[nx][ny] === 0 && visited[isBroken][nx][ny] === -1) {
        visited[isBroken][nx][ny] = visited[isBroken][x][y] + 1;
        queue.push([nx, ny, isBroken]);
      } else if (
        map[nx][ny] === 1 &&
        isBroken === 0 &&
        visited[1][nx][ny] === -1
      ) {
        visited[1][nx][ny] = visited[0][x][y] + 1;
        queue.push([nx, ny, 1]);
      }
    }
  }

  return -1;
};

let min = bfs();

console.log(min);
