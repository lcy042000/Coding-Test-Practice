"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4 4`.split("\n");

const [n, m] = input[0].split(" ").map(Number);

const dfs = (list, curNum) => {
  if (list.length === m) {
    console.log(list.join(" "));
    return;
  }

  for (let num = curNum; num <= n; num++) {
    dfs([...list, num], num + 1);
  }
};

dfs([], 1);
