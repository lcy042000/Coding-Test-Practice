"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `4 4
1 1 0
1 1 1 1
1 0 0 1
1 1 0 1
1 1 1 1`.split("\n");

const [N, M] = input[0].split(" ").map((v) => parseInt(v));

const arr = Array.from(Array(N), () => new Array(M));
const visited = Array.from(Array(N), () => new Array(M).fill(0));
let count = 0;

let [x, y, direction] = input[1].split(" ").map((v) => parseInt(v));

visited[x][y] = 1;

for (let i = 2; i < N + 2; i++) {
  arr[i - 2] = input[i].split(" ").map((v) => parseInt(v));
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

let turnTime = 0;

function turnLeft() {
  direction -= 1;
  if (direction === -1) direction = 3;
}

while (true) {
  turnLeft();

  let nx = x + dx[direction];
  let ny = y + dy[direction];

  if (visited[nx][ny] === 0 && arr[nx][ny] === 0) {
    x = nx;
    y = ny;
    count++;
    turnTime = 0;
    continue;
  } else {
    turnTime++;
  }

  if (turnTime === 4) {
    nx = x - dx[direction];
    ny = y - dy[direction];

    if (arr[nx][ny] === 0) {
      x = nx;
      y = ny;
    } else {
      break;
    }
    turnTime = 0;
  }
}

console.log(count);
