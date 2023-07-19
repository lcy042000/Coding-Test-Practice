"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `3
4
7
10`.split("\n");

const T = parseInt(input[0]);

const dp = Array(11).fill(0);

dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i < 11; i++) {
  dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
}

input.forEach((num, i) => {
  i > 0 && console.log(dp[num]);
});
