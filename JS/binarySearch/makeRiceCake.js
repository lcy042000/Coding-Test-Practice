"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `4 6
    19 15 10 17`.split("\n");

const [N, M] = input[0].split(" ").map((item) => Number(item));
const riceCake = input[1].split(" ").map((item) => Number(item));

riceCake.sort((a, b) => a - b);

const binarySearch = () => {
  let start = 0;
  let end = riceCake[riceCake.length - 1];

  let result = 0;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = riceCake.reduce(
      (acc, cur) => acc + (cur > mid ? cur - mid : 0),
      0
    );

    if (sum >= M) {
      result = mid;
      start = mid + 1;
    } else end = mid - 1;
  }

  return result;
};

console.log(binarySearch());
