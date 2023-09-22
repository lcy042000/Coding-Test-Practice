"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3 600
500 150 200 1000
100 835 200 324
200 125 300 900`.split("\n");

const [n, k] = input[0].split(" ").map(Number);
const table = Array(n + 1);
const dp = Array.from(Array(n + 1), () => Array(k + 1).fill(-1n));

for (let i = 1; i < n + 1; i++) {
  table[i] = input[i].split(" ").map(Number);
}

dp[0][0] = 0n;

for (let i = 1; i < n + 1; i++) {
  for (let j = 0; j < k + 1; j++) {
    if (dp[i - 1][j] > -1n) {
      if (j + table[i][0] <= k) {
        dp[i][j + table[i][0]] =
          dp[i][j + table[i][0]] > dp[i - 1][j] + BigInt(table[i][1])
            ? dp[i][j + table[i][0]]
            : dp[i - 1][j] + BigInt(table[i][1]);
      }
      if (j + table[i][2] <= k) {
        dp[i][j + table[i][2]] =
          dp[i][j + table[i][2]] > dp[i - 1][j] + BigInt(table[i][3])
            ? dp[i][j + table[i][2]]
            : dp[i - 1][j] + BigInt(table[i][3]);
      }
    }
  }
}

let max = -1n;

dp[n].forEach((v) => {
  if (v > max) max = v;
});
console.log(max.toString());
