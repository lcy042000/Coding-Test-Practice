"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `40
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 1 1`.split(
        "\n"
      );

const n = +input[0];
const nums = input[1].split(" ").map(Number);
const dp = Array.from(Array(n - 1), () => Array(21).fill(0n));

dp[0][nums[0]] = 1n;

for (let i = 1; i < n - 1; i++) {
  for (let j = 0; j <= 20; j++) {
    if (dp[i - 1][j]) {
      if (j + nums[i] <= 20) dp[i][j + nums[i]] += dp[i - 1][j];
      if (j - nums[i] >= 0) dp[i][j - nums[i]] += dp[i - 1][j];
    }
  }
}

console.log(dp[n - 2][nums[n - 1]].toString());
