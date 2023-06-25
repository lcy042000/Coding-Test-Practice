"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `17 4`.split("\n");

let N = parseInt(input[0].split(" ")[0]);
const K = parseInt(input[0].split(" ")[1]);

let count = 0;

while (N !== 1) {
  count++;

  if (!(N % K)) {
    N /= K;
  } else {
    N--;
  }
}

console.log(count);
