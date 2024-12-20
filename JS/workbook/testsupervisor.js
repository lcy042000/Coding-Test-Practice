"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5
1000000 1000000 1000000 1000000 1000000
5 7`.split("\n");

const [B, C] = input[2].split(" ").map(Number);
const testers = input[1].split(" ").map(Number);

let answer = 0;

for (const tester of testers) {
  if (tester - B <= 0) {
    answer += 1;
    continue;
  }

  answer += 1 + Math.ceil((tester - B) / C);
}

console.log(answer);
