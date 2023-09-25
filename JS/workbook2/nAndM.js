"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3 3`.split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = [];

const dfs = (num, min) => {
  if (num.length === m) {
    arr.push(num);
    return;
  }

  for (let i = min; i <= n; i++) {
    dfs(num + i, i);
  }
};

dfs("", 1);
console.log(arr.map((v) => v.split("").join(" ")).join("\n"));
