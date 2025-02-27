"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5 2 6
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 1 3
3 2 3`.split("\n");

const [n, m, k] = input[0].split(" ").map(Number);
const nutrient = input.slice(1, n + 1).map((v) => v.split(" ").map(Number));

const map = Array.from(Array(n), () => Array(n));
const ntrMap = Array.from(Array(n), () => Array(n).fill(5));

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    map[i][j] = new Array();
  }
}

input
  .slice(n + 1)
  .map((v) => v.split(" ").map(Number))
  .sort((a, b) => a[2] - b[2])
  .forEach(([x, y, z]) => {
    map[x - 1][y - 1].push(z);
  });

const spring = () => {
  const deadList = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!map[i][j].length) continue;

      for (let k = 0; k < map[i][j].length; k++) {
        if (ntrMap[i][j] < map[i][j][k]) {
          deadList.push([i, j, k]);
          break;
        }

        ntrMap[i][j] -= map[i][j][k];
        map[i][j][k] += 1;
      }
    }
  }

  return deadList;
};

const summer = (deadList) => {
  for (const [i, j, k] of deadList) {
    const list = map[i][j].slice(k);
    map[i][j] = map[i][j].slice(0, k);

    for (const age of list) {
      ntrMap[i][j] += Math.floor(age / 2);
    }
  }
};

const fall = () => {
  const dx = [-1, -1, -1, 0, 1, 1, 1, 0],
    dy = [-1, 0, 1, 1, 1, 0, -1, -1];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const list = map[i][j];

      for (const age of list) {
        if (age % 5 !== 0) continue;

        for (let k = 0; k < 8; k++) {
          const [nx, ny] = [i + dx[k], j + dy[k]];

          if (nx < 0 || n <= nx || ny < 0 || n <= ny) continue;

          map[nx][ny] = [1, ...map[nx][ny]];
        }
      }
    }
  }
};

const winter = () => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      ntrMap[i][j] += nutrient[i][j];
    }
  }
};

for (let year = 0; year < k; year++) {
  const deadList = spring();
  summer(deadList);
  fall();
  winter();
}

let cnt = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    cnt += map[i][j].length;
  }
}

console.log(cnt);
