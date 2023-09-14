"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `6
EEWWEW`.split("\n");

let cnt = 0;
const n = parseInt(input[0]);
const arr = input[1].split("");

for (let i = 1; i < n; i++) {
  if (arr[i] === "W" && arr[i - 1] === "E") cnt++;
}

console.log(cnt);
