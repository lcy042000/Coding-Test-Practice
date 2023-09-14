"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5 10
0 4 4 8 7
7 0 7 7 4
1 4 0 5 4
5 2 2 0 7
1 4 1 6 0
1 3 8
2 4 1
4 1 1
1 5 5
3 2 1
3 2 5
4 5 10
5 3 2
1 4 1
1 4 11`.split("\n");

const [n, m] = input[0].split(" ").map((v) => parseInt(v));
const board = input
  .slice(1, n + 1)
  .map((v) => v.split(" ").map((value) => parseInt(value)));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < n; k++) {
      if (j === k) continue;

      board[j][k] = Math.min(board[j][k], board[j][i] + board[i][k]);
    }
  }
}

input.slice(n + 1).forEach((v) => {
  const [start, end, time] = v.split(" ").map((v) => parseInt(v));

  if (board[start - 1][end - 1] <= time) console.log("Enjoy other party");
  else console.log("Stay here");
});
