"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `2 4
7 3 1 8
3 3 3 4`.split("\n");

const N = Number(input[0].split(" ")[0]);
const M = Number(input[0].split(" ")[1]);

const arr = Array.from(Array(N), () => new Array(M));

for (let i = 1; i < N + 1; i++) {
  arr[i - 1] = input[i]
    .split(" ")
    .map((num) => Number(num))
    .sort((a, b) => a - b);
}

let result = Number.MIN_VALUE;

for (let i = 0; i < N; i++) {
  result = Math.max(result, arr[i][0]);
}

console.log(result);
