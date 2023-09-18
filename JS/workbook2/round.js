"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5 28
7 4 2 4 5`.split("\n");

const [n, k] = input[0].split(" ").map(Number);
const lens = input[1].split(" ").map(Number);
let len = k;

for (let i = 0; i < n; i++) {
  len -= lens[i];

  if (len < 0) {
    console.log(i + 1);
    break;
  }
}

if (len >= 0) {
  for (let i = n - 1; i >= 0; i--) {
    len -= lens[i];
    if (len < 0) {
      console.log(i + 1);
      break;
    }
  }
}
