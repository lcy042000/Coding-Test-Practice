"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5 3
1 2 5 4 3
5 5 6 6 5`.split("\n");

const [N, K] = input[0].split(" ").map((item) => Number(item));

const A = input[1].split(" ").map((item) => Number(item));
const B = input[2].split(" ").map((item) => Number(item));

A.sort((a, b) => a - b);
B.sort((a, b) => b - a);

for (let i = 0; i < K; i++) {
  if (A[i] < B[i]) {
    [A[i], B[i]] = [B[i], A[i]];
  } else if (A[i] >= B[i]) {
    break;
  }
}

console.log(A.reduce((acc, cur) => acc + cur));
