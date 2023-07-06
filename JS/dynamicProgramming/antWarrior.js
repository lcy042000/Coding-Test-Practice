"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `4
1 3 1 5`.split("\n");

const N = parseInt(input[0]);
const food = input[1].split(" ").map((i) => parseInt(i));
let dp = Array(N).fill(0);

dp[0] = food[0];
dp[1] = Math.max(food[0], food[1]);
for (let i = 2; i < N; i++) {
  dp[i] = Math.max(dp[i - 1], dp[i - 2] + food[i]);
}

console.log(dp[N - 1]);
