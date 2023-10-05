"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `baekjoon`.split("\n");

const arr = [];
const word = input[0];

for (let i = 0; i < word.length; i++) {
  arr.push(word.slice(i));
}

arr.sort();
console.log(arr.join("\n"));
