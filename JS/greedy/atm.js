"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5
3 1 4 3 2`.split("\n");

const N = parseInt(input[0]);
const p = input[1].split(" ").map((n) => parseInt(n));

p.sort((a, b) => a - b);

const intervalSum = Array(N);

intervalSum[0] = p[0];
let sum = intervalSum[0];

for (let i = 1; i < N; i++) {
  intervalSum[i] = intervalSum[i - 1] + p[i];
  sum += intervalSum[i];
}

console.log(sum);
