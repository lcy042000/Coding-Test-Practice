"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5
-1 -2 -3 -4 -5`.split("\n");

const n = parseInt(input[0]);
const arr = input[1].split(" ").map((v) => parseInt(v));

let cur = 0;
let best = -Infinity;

for (let num of arr) {
  cur = Math.max(num, cur + num);
  best = Math.max(best, cur);
}

console.log(best);
