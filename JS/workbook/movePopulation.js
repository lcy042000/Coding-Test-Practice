"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `9 1 2
1 2 3 4 5 6 7 8 9
4 5 6 7 8 9 1 2 3
3 4 5 6 7 8 9 1 2
2 3 4 1 2 3 4 5 6
3 4 5 8 9 1 2 3 4
5 5 5 5 5 1 2 4 4
1 1 1 1 2 3 4 5 6
9 8 7 6 5 4 3 3 3
2 3 4 1 2 3 4 5 6`.split("\n");

const [n, l, r] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

const isUnion = (a, b) => l <= Math.abs(a - b) && Math.abs(a - b) <= r;

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];

const makeUnionList = (x, y, isVisited) => {
  const queue = [[x, y]],
    list = [[x, y]];
  let idx = 0,
    cnt = map[x][y];

  isVisited[x][y] = true;

  while (idx < queue.length) {
    const [cx, cy] = queue[idx++];

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [cx + dx[i], cy + dy[i]];

      if (nx < 0 || n <= nx || ny < 0 || n <= ny || isVisited[nx][ny]) continue;
      if (!isUnion(map[cx][cy], map[nx][ny])) continue;

      isVisited[nx][ny] = true;
      list.push([nx, ny]);
      cnt += map[nx][ny];
      queue.push([nx, ny]);
    }
  }

  return [list, cnt];
};

const calcMap = () => {
  const isVisited = Array.from(Array(n), () => Array(n).fill(false));
  const list = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (isVisited[i][j]) continue;

      const result = makeUnionList(i, j, isVisited);

      if (1 < result[0].length) list.push(result);
    }
  }

  return list;
};

let list = calcMap();
let cnt = 0;

while (list.length) {
  cnt++;

  for (const [unionList, people] of list) {
    if (unionList.length <= 1) continue;

    const value = Math.floor(people / unionList.length);

    for (const [x, y] of unionList) {
      map[x][y] = value;
    }
  }

  list = calcMap();
}

console.log(cnt);
