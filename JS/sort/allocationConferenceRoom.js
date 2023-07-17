"use strict";

const fs = require("fs");

let input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `11
1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14`.split("\n");

const n = parseInt(input[0]);
const arr = Array(n);
let maxEnd = -1;

for (let i = 1; i < n + 1; i++) {
  const [start, end] = input[i].split(" ").map((v) => parseInt(v));

  if (maxEnd < end) maxEnd = end;

  arr[i - 1] = { start, end };
}

input = null;

arr.sort((a, b) => {
  if (a.end < b.end) return -1;
  else if (a.end > b.end) return 1;
  else {
    return a.start - b.start;
  }
});
let count = 1;
let time = arr[0];

for (let i = 1; i < arr.length; i++) {
  if (time.end <= arr[i].start) {
    time = arr[i];
    count++;
  }
}

console.log(count);
