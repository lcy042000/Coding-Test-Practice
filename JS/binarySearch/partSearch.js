"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5
8 3 7 9 2
3
5 7 9`.split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map((item) => Number(item));

const M = Number(input[2]);
const B = input[3].split(" ").map((item) => Number(item));

A.sort((a, b) => a - b);

const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) return true;
    else if (arr[mid] > target) end = mid - 1;
    else start = mid + 1;
  }
};

for (let i = 0; i < M; i++) {
  if (binarySearch(A, B[i])) console.log("yes");
  else console.log("no");
}
