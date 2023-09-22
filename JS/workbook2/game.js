"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `10 8`.split("\n");

const [x, y] = input[0].split(" ").map(Number);
const z = Math.floor((100 * y) / x);
let left = 1;
let right = 1000000000;
let ans = Infinity;

if (z >= 99) return console.log(-1);

while (left <= right) {
  let mid = parseInt((left + right) / 2);
  let newZ = Math.floor((100 * (y + mid)) / (x + mid));
  if (z !== newZ) {
    ans = Math.min(ans, mid);
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(ans === Infinity ? -1 : ans);
