"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3
1 0
5
4 2
1 2 3 4
6 0
1 1 9 1 1 1`.split("\n");

const t = parseInt(input.shift());

for (let i = 0; i < t; i++) {
  const [n, m] = input.shift().split(" ").map(Number);
  const arr = input.shift().split(" ").map(Number);

  arr.forEach((v, i) => {
    arr[i] = [v, i];
  });

  while (arr.length > 0) {
    const top = arr[0];

    if (arr.every((v) => v[0] <= top[0])) {
      arr.shift();

      if (top[1] === m) {
        console.log(n - arr.length);
        break;
      }
    } else {
      arr.push(arr.shift());
    }
  }
}
