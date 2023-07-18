"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5 3
1
2
8
4
9`.split("\n");

const [n, c] = input[0].split(" ").map((v) => parseInt(v));
const arr = input
  .slice(1)
  .map((v) => parseInt(v))
  .sort((a, b) => a - b);

let min = 1;
let max = arr[n - 1];

function isPossible(distance) {
  let count = 1;
  let curIndex = 0;

  for (let i = 1; i < n; i++) {
    if (arr[i] - arr[curIndex] >= distance) {
      count++;
      curIndex = i;
    }
  }

  return count;
}

while (min <= max) {
  let mid = parseInt((min + max) / 2);

  if (isPossible(mid) < c) max = mid - 1;
  else min = mid + 1;
}

console.log(min - 1);
