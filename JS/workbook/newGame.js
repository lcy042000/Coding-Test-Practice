"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4 4
0 0 2 0
0 0 1 0
0 0 1 2
0 2 0 0
2 1 1
3 2 3
2 2 1
4 1 3`.split("\n");

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const [n, k] = input[0].split(" ").map((v) => +v);
const graph = Array.from(Array(n + 2), () => Array(n + 2).fill(2));

for (let i = 1; i < n + 1; i++) {
  const row = input[i].split(" ").map((v) => +v);
  for (let j = 1; j < n + 1; j++) {
    graph[i][j] = row[j - 1];
  }
}

const list = Array(k + 1);
const board = Array.from(Array(n + 2), () =>
  Array.from(Array(n + 2), () => [])
);

for (let i = n + 1; i < input.length; i++) {
  const [r, c, v] = input[i].split(" ").map((v) => +v);
  board[r][c].push(i - n);
  list[i - n] = [r, c, v];
}

let turn = 0;

while (true) {
  turn++;

  if (turn > 1000) return console.log(-1);

  for (let i = 1; i < list.length; i++) {
    let [r, c, dir] = list[i];

    if (board[r][c].length === 0 || board[r][c][0] !== i) continue;

    let nx = r + dx[dir - 1];
    let ny = c + dy[dir - 1];
    let next = graph[nx][ny];

    if (next === 2) {
      dir = dir % 2 === 0 ? dir - 1 : dir + 1;
      list[i][2] = dir;

      nx = r + dx[dir - 1];
      ny = c + dy[dir - 1];
      next = graph[nx][ny];
    }

    if (next === 0) {
      const horse = board[r][c].splice(0);
      board[nx][ny].push(...horse);

      horse.forEach((v, i) => {
        list[v] = [nx, ny, list[v][2]];
      });
    } else if (next === 1) {
      const horse = board[r][c].splice(0);
      horse.reverse();
      board[nx][ny].push(...horse);

      horse.forEach((v) => {
        list[v] = [nx, ny, list[v][2]];
      });
    }

    if (board[nx][ny].length >= 4) return console.log(turn);
  }
}
