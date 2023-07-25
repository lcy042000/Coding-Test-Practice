"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `7 3`.trim().split("\n");

const [n, k] = input[0].split(" ").map((num) => Number(num));
let count = 0;

const arr = Array(n + 1).fill(true);

for (let i = 2; i < n + 1; i++) {
  if (arr[i]) {
    let j = 1;

    while (i * j <= n) {
      if (arr[i * j]) {
        arr[i * j] = false;

        count++;

        if (count === k) {
          console.log(i * j);
          return;
        }
      }

      j++;
    }
  }
}
