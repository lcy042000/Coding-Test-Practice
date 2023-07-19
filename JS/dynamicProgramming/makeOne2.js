"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `10`.split("\n");

let X = parseInt(input[0]);

const dp = new Array(X + 1).fill(0);

for (let i = 2; i < X + 1; i++) {
  dp[i] = dp[i - 1] + 1;

  if (i % 2 === 0) {
    dp[i] = Math.min(dp[i], dp[i / 2] + 1);
  }

  if (i % 3 === 0) {
    dp[i] = Math.min(dp[i], dp[i / 3] + 1);
  }
}

console.log(dp[X]);
