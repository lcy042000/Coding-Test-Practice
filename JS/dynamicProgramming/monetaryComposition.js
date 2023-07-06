"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `3 4
3
5
7`.split("\n");

const [N, M] = input[0].split(" ").map((i) => parseInt(i));
const coins = input.slice(1, N + 1).map((i) => parseInt(i));
const dp = Array(M + 1).fill(10001);

dp[0] = 0;

for (let i = 0; i < N; i++) {
  for (let j = coins[i]; j < M + 1; j++) {
    dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
  }
}

console.log(dp[M] === 10001 ? -1 : dp[M]);
