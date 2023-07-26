"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `10 15
5 1 3 5 10 7 4 9 2 8`.split("\n");

const [n, s] = input[0].split(" ").map((num) => Number(num));
const arr = input[1].split(" ").map((num) => Number(num));
const sumArr = Array(n).fill(0);

sumArr[0] = arr[0];

for (let i = 1; i < n; i++) {
  sumArr[i] = sumArr[i - 1] + arr[i];
}

let start = 0;
let end = 0;

let minLen = Infinity;

while (start < n && end < n) {
  const partialSum = sumArr[end] - sumArr[start] + arr[start];

  if (partialSum < s) {
    end++;
  } else {
    minLen = Math.min(minLen, end - start + 1);
    start++;
  }
}

console.log(minLen === Infinity ? 0 : minLen);
