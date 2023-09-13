"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4
2
1
2
12
1`.split("\n");

const n = parseInt(input[0]);
const k = parseInt(input[1]);
const nums = input.slice(2).map((v) => v);
const isVisited = Array(n).fill(false);

const arr = [];

const dfs = (cnt, sum) => {
  if (cnt === k) {
    if (!arr.includes(sum)) arr.push(sum);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (isVisited[i]) continue;
    console.log(isVisited, i);
    isVisited[i] = true;

    dfs(cnt + 1, sum.toString() + nums[i].toString());
    isVisited[i] = false;
  }
};

dfs("0", 0);
console.log(arr.length);
