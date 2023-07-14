"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `10
1
3
5
4
0
0
7
0
0
6`.split("\n");

const K = parseInt(input[0]);

const arr = [];

for (let i = 1; i < K + 1; i++) {
  const num = parseInt(input[i]);
  if (num === 0) {
    arr.pop();
  } else {
    arr.push(num);
  }
}

console.log(arr.reduce((acc, cur) => acc + cur, 0));
