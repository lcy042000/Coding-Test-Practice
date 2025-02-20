"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs
        .readFileSync("/dev/stdin")
        .toString()
        .trim()
        .split("\n")
        .map((v) => v.split(" "))
    : `5 3
0 0 1 0 0
0 0 2 0 1
0 1 2 0 0
0 0 1 0 0
0 0 0 0 2`
        .split("\n")
        .map((v) => v.split(" "));

const [n, m] = input.shift().map(Number);

const houses = [],
  stores = [];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (input[i][j] === "1") houses.push([i, j]);
    if (input[i][j] === "2") stores.push([i, j]);
  }
}

let minDist = Infinity;

const calcDist = (storeLoc) => {
  let dist = 0;

  for (const [x, y] of houses) {
    let min = Infinity;

    for (const [sx, sy] of storeLoc) {
      min = Math.min(min, Math.abs(x - sx) + Math.abs(y - sy));
    }

    dist += min;

    if (minDist <= dist) return dist;
  }

  return dist;
};

const dfs = (storeLoc, idx) => {
  if (storeLoc.length === m) {
    minDist = Math.min(minDist, calcDist(storeLoc));
    return;
  }

  for (let i = idx; i < stores.length; i++) {
    storeLoc.push(stores[i]);
    dfs(storeLoc, idx + 1);
    storeLoc.pop();
  }
};

dfs([], 0);
console.log(minDist);
