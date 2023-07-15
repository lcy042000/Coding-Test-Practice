"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `4 6
110110
110110
111111
111101`.split("\n");

const [N, M] = input[0].split(" ").map((v) => parseInt(v));
const arr = input.slice(1).map((v) => v.split("").map((v) => parseInt(v)));

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

const queue = [[0, 0]];

while (queue.length > 0) {
  const [x, y] = queue.shift();

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx >= 0 && ny >= 0 && nx < N && ny < M && arr[nx][ny] === 1) {
      queue.push([nx, ny]);
      arr[nx][ny] = arr[x][y] + 1;
    }
  }
}

console.log(arr[N - 1][M - 1]);
