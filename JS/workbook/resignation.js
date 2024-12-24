"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5
1 100
4 200
1 99
2 150
1 160`.split("\n");

const N = parseInt(input[0]);
const Tlist = [],
  Plist = [];

input.slice(1).forEach((v) => {
  const [t, p] = v.split(" ").map(Number);

  Tlist.push(t);
  Plist.push(p);
});

const stack = [[0, 0]];
const dp = Array(N).fill(0);

while (stack.length) {
  const [day, pf] = stack.pop();

  for (let i = day; i < N; i++) {
    if (N < i + Tlist[i]) continue;
    if (Plist[i] + pf <= dp[i]) continue;

    stack.push([i + Tlist[i], pf + Plist[i]]);
    dp[i] = Plist[i] + pf;
  }
}

const max = dp.reduce((acc, cur) => (acc < cur ? cur : acc), 0);

console.log(max);
