"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4
0 1 0 0
0 0 1 1
1 1 0 1
0 1 1 0`.split("\n");

const n = +input[0];
const end = (1 << n) - 1;
const graph = Array.from(Array(n), () => Array(n).fill(0));

for (let i = 0; i < n; i++) {
  const row = input[i + 1].split(" ").map(Number);
  for (let j = 0; j < n; j++) {
    graph[i][j] = row[j];
  }
}

const dp = Array.from(Array(1 << n), () => Array(n).fill(-1));

const tsp = (visited, cur) => {
  if (visited === end) {
    return graph[cur][0] || Infinity;
  }

  if (dp[visited][cur] !== -1) {
    return dp[visited][cur];
  }

  dp[visited][cur] = Infinity;

  for (let i = 0; i < n; i++) {
    if (!graph[cur][i]) continue;

    if (visited & (1 << i)) continue;

    dp[visited][cur] = Math.min(
      dp[visited][cur],
      tsp(visited | (1 << i), i) + graph[cur][i]
    );
  }

  return dp[visited][cur];
};

console.log(tsp(1, 0));
