"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `2 5 8 3 -4 -11`.split("\n");

const [a, b, c, d, e, f] = input[0].split(" ").map(Number);

for (let i = -999; i < 1000; i++) {
  for (let j = -999; j < 1000; j++) {
    if (a * i + b * j === c && d * i + e * j === f) {
      console.log(i, j);
      return;
    }
  }
}
