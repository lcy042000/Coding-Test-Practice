"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3
2 2
1 5
13 29`.split("\n");

const t = Number(input[0]);

for (let i = 1; i < t + 1; i++) {
  const [n, m] = input[i].split(" ").map((num) => Number(num));
  let top = 1;
  let bottom = 1;

  const max = Math.max(m - n, n);
  const min = Math.min(m - n, n);

  for (let j = m; j > max; j--) {
    top *= j;
  }

  for (let j = 1; j < min + 1; j++) {
    bottom *= j;
  }

  console.log(parseInt(top / bottom));
}
