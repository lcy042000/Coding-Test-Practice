"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `3`.split("\n");

const N = parseInt(input[0]);
const dp = Array(N + 1).fill(0);

dp[1] = 1;
dp[2] = 3;

for (let i = 3; i < N + 1; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2] * 2) % 796796;
}

console.log(dp[N]);
