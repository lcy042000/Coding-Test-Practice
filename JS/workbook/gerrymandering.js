"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `8
1 2 3 4 5 6 7 8
2 3 4 5 6 7 8 9
3 4 5 6 7 8 9 1
4 5 6 7 8 9 1 2
5 6 7 8 9 1 2 3
6 7 8 9 1 2 3 4
7 8 9 1 2 3 4 5
8 9 1 2 3 4 5 6`.split("\n");

const n = Number(input[0]);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

const points = [];

for (let i = 0; i < n - 2; i++) {
  for (let j = 1; j < n - 1; j++) {
    for (let d1 = 1; d1 + i < n && 0 <= j - d1; d1++) {
      for (let d2 = 1; d2 + j < n && d2 + i < n; d2++) {
        if (n <= i + d1 + d2) continue;

        points.push([i, j, d1, d2]);
      }
    }
  }
}

const getDistrict = (point) => {
  const borderMap = Array.from(Array(n), () => Array(n).fill(false));
  const [x, y, d1, d2] = point;

  for (let i = 0; i <= d1; i++) {
    borderMap[x + i][y - i] = true;
    borderMap[x + d2 + i][y + d2 - i] = true;
  }

  for (let i = 0; i <= d2; i++) {
    borderMap[x + i][y + i] = true;
    borderMap[x + d1 + i][y - d1 + i] = true;
  }

  const arr = Array(5).fill(0);

  for (let i = 0; i < x + d1; i++) {
    for (let j = 0; j <= y; j++) {
      if (borderMap[i][j]) break;
      arr[0] += map[i][j];
    }
  }

  for (let i = 0; i <= x + d2; i++) {
    for (let j = n - 1; y < j; j--) {
      if (borderMap[i][j]) break;
      arr[1] += map[i][j];
    }
  }

  for (let i = x + d1; i < n; i++) {
    for (let j = 0; j < y - d1 + d2; j++) {
      if (borderMap[i][j]) break;
      arr[2] += map[i][j];
    }
  }

  for (let i = x + d2 + 1; i < n; i++) {
    for (let j = n - 1; y + d2 - d1 <= j; j--) {
      if (borderMap[i][j]) break;
      arr[3] += map[i][j];
    }
  }

  arr[4] =
    map.reduce(
      (acc, cur) => (acc += cur.reduce((prev, curV) => (prev += curV), 0)),
      0
    ) - arr.reduce((acc, cur) => (acc += cur), 0);

  return arr;
};

let min = Infinity;

for (let i = 0; i < points.length; i++) {
  const point = points[i];

  const arr = getDistrict(point);

  const result = Math.max(...arr) - Math.min(...arr);

  min = Math.min(min, result);
}

console.log(min);
