"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5 8 3
2 4 5 4 6`.split("\n");

const N = parseInt(input[0].split(" ")[0]);
const M = parseInt(input[0].split(" ")[1]);
const K = parseInt(input[0].split(" ")[2]);

const arr = new Array();

arr.push(...input[1].split(" ").map((num) => parseInt(num)));

arr.sort((a, b) => b - a);

let result = 0;
let count = 0;

for (let i = 0; i < M; i++) {
  if (count === K) {
    result += arr[1];
    count = 0;
  } else {
    result += arr[0];
    count++;
  }
}

console.log(result);
