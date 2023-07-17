"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5 20
4 42 40 26 46`.split("\n");

const [n, m] = input[0].split(" ").map((v) => parseInt(v));
const arr = input[1].split(" ").map((v) => parseInt(v));

arr.sort((a, b) => a - b);
let min = 0;
let max = arr[n - 1];

while (min <= max) {
  const half = parseInt((min + max) / 2);
  let sum = 0;

  for (let i = 0; i < n; i++) {
    if (arr[i] > half) sum += arr[i] - half;
  }

  if (sum >= m) min = half + 1;
  else max = half - 1;
}

console.log(min - 1);
