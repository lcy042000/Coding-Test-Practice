"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `7 8 50
0 0 0 0 0 0 0 9
0 0 0 0 3 0 0 8
-1 0 5 0 0 0 22 0
-1 8 0 0 0 0 0 0
0 0 0 0 0 10 43 0
0 0 5 0 15 0 0 0
0 0 40 0 0 0 20 0`.split("\n");

const [r, c, t] = input[0].split(" ").map(Number);
let airPrf = -1;
const map = input.slice(1).map((v, idx) =>
  v.split(" ").map((value) => {
    const num = Number(value);

    if (airPrf < 0 && num < 0) airPrf = idx;

    return num;
  })
);

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];

const spreadDust = () => {
  const list = [];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (map[i][j] < 0 || !map[i][j]) continue;

      const value = Math.floor(map[i][j] / 5);

      for (let k = 0; k < 4; k++) {
        const [nx, ny] = [i + dx[k], j + dy[k]];

        if (nx < 0 || r <= nx || ny < 0 || c <= ny || map[nx][ny] < 0) continue;

        list.push([nx, ny, value]);
        map[i][j] -= value;
      }
    }
  }

  return list;
};

const playUpAirPurifier = () => {
  let [x, y, dir, value] = [airPrf, 1, 1, 0];

  while (x !== airPrf || y !== 0) {
    const temp = map[x][y];
    map[x][y] = value;
    value = temp;
    let [nx, ny] = [x + dx[dir], y + dy[dir]];

    if (nx < 0 || r <= nx || ny < 0 || c <= ny) {
      dir = (dir + 3) % 4;
      nx = x + dx[dir];
      ny = y + dy[dir];
    }

    x = nx;
    y = ny;
  }
};

const playDownAirPurifier = () => {
  let [x, y, dir, value] = [airPrf + 1, 1, 1, 0];

  while (x !== airPrf + 1 || y !== 0) {
    const temp = map[x][y];
    map[x][y] = value;
    value = temp;
    let [nx, ny] = [x + dx[dir], y + dy[dir]];

    if (nx < 0 || r <= nx || ny < 0 || c <= ny) {
      dir = (dir + 1) % 4;
      nx = x + dx[dir];
      ny = y + dy[dir];
    }

    x = nx;
    y = ny;
  }
};

for (let i = 0; i < t; i++) {
  const list = spreadDust();

  for (const [x, y, value] of list) {
    map[x][y] += value;
  }

  playUpAirPurifier();
  playDownAirPurifier();
}

let result = 0;

for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (0 < map[i][j]) result += map[i][j];
  }
}

console.log(result);
