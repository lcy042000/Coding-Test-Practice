"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `2 1 2
2 1`.split("\n");

const [n, m, h] = input[0].split(" ").map(Number);
const map = Array.from(Array(h), () => Array(n - 1).fill(false));
input.slice(1).forEach((v) => {
  const [a, b] = v.split(" ").map((num) => Number(num) - 1);

  map[a][b] = true;
});

const calc = () => {
  for (let start = 0; start < n; start++) {
    let j = start;

    for (let i = 0; i < h; i++) {
      if (j === 0 && map[i][j]) j += 1;
      else if (0 < j && j < n - 1) {
        if (map[i][j - 1]) j -= 1;
        else if (map[i][j]) j += 1;
      } else if (j === n - 1 && map[i][j - 1]) j -= 1;
    }

    if (j !== start) return false;
  }

  return true;
};

let min = 4;

const dfs = (cnt, x, y) => {
  const result = calc();

  if (min <= cnt) return;
  if (result) {
    min = Math.min(min, cnt);
    return;
  }
  if (cnt === 3) return;

  for (let i = x; i < h; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (i === x && j < y) continue;
      if (map[i][j]) continue;
      if (j === 0 && map[i][j + 1]) continue;
      if (0 < j && j < n - 2 && (map[i][j - 1] || map[i][j + 1])) continue;
      if (j === n - 2 && map[i][j - 1]) continue;

      map[i][j] = true;
      dfs(cnt + 1, i, j);
      map[i][j] = false;
    }
  }
};

dfs(0, 0, 0);
console.log(min < 4 ? min : -1);
