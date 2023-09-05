"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `6 10
0 1 2 0 1 1
1 2 0 1 1 0
2 1 0 1 1 0
1 0 1 1 0 2
2 0 1 2 0 1
0 2 1 0 2 1
1 1 1
2 2 2
3 3 4
4 4 1
5 5 3
6 6 2
1 6 3
6 1 2
2 4 3
4 2 1`.split("\n");

const [n, k] = input[0].split(" ").map((v) => +v);
const board = Array.from(Array(n + 2), () => Array(n + 2).fill(2));

for (let i = 1; i < n + 1; i++) {
  const arr = input[i].split(" ").map((v) => +v);

  for (let j = 1; j < n + 1; j++) {
    board[i][j] = arr[j - 1];
  }
}

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

const horses = Array(k);
const map = Array.from(Array(n + 2), () => Array.from(Array(n + 2), () => []));
for (let i = n + 1; i < n + k + 1; i++) {
  const [x, y, dir] = input[i].split(" ").map((v) => +v);
  horses[i - n - 1] = [[x, y], dir - 1];
  map[x][y].push(i - n - 1);
}

let cnt = 0;

while (cnt <= 1000) {
  cnt++;
  for (let i = 0; i < k; i++) {
    let [location, dir] = horses[i];
    const [x, y] = location;

    let nextX = x + dx[dir];
    let nextY = y + dy[dir];
    let nextLocation = board[nextX][nextY];

    if (nextLocation === 2) {
      dir = dir % 2 === 0 ? dir + 1 : dir - 1;
      nextX = x + dx[dir];
      nextY = y + dy[dir];
      nextLocation = board[nextX][nextY];
    }

    switch (nextLocation) {
      case 0:
        const arr = map[x][y].splice(map[x][y].indexOf(i));
        map[nextX][nextY].push(...arr);

        arr.forEach((v) => {
          horses[v] = [[nextX, nextY], horses[v][1]];
        });

        horses[i] = [[nextX, nextY], dir];

        break;
      case 1:
        const arr1 = map[x][y].splice(map[x][y].indexOf(i)).reverse();
        map[nextX][nextY].push(...arr1);

        arr1.forEach((v) => {
          horses[v] = [[nextX, nextY], horses[v][1]];
        });

        horses[i] = [[nextX, nextY], dir];

        break;
      case 2:
        horses[i] = [[x, y], dir];
        break;
    }

    if (map[nextX][nextY].length >= 4) {
      console.log(cnt);
      return;
    }
  }
}

console.log(-1);
