"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5
4 1 5 2 3
5
1 3 7 9 5`.split("\n");

const n = parseInt(input[0]);
const arr = input[1].split(" ").map((v) => parseInt(v));

arr.sort((a, b) => a - b);

function binartSearch(x, start, end) {
  const half = parseInt((start + end) / 2);

  if (start > end) return false;

  if (arr[half] === x) return true;
  else {
    if (arr[half] > x) return binartSearch(x, start, half - 1);
    else return binartSearch(x, half + 1, end);
  }
}

const result = Array(parseInt(input[2]));
const findArr = input[3].split(" ").map((v) => parseInt(v));

findArr.forEach((v, i) => {
  binartSearch(v, 0, n - 1) ? (result[i] = 1) : (result[i] = 0);
});

console.log(result.join("\n"));
