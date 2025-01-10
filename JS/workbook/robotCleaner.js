"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `7 7
4 2 1
1 1 1 1 1 1 1
1 0 0 0 1 0 1
1 0 1 1 0 0 1
1 0 0 0 0 1 1
1 0 0 1 0 0 1
1 0 0 0 0 0 1
1 1 1 1 1 1 1`.split("\n");

const [N, M] = input[0].split(" ").map(Number);
const [r, c, d] = input[1].split(" ").map(Number);
const board = input.slice(2).map((v) => v.split(" ").map(Number));

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];

const queue = [[r, c, d]];
let idx = 0,
  cnt = 0;

while (idx < queue.length) {
  const [x, y, dir] = queue[idx++];

  if (board[x][y] === 0) {
    cnt++;
    board[x][y] = -1;
  }

  let isDirty = false;

  for (let i = 0; i < 4; i++) {
    const [nx, ny] = [x + dx[i], y + dy[i]];

    if (nx < 0 || N <= nx || ny < 0 || M <= ny) continue;
    if (board[nx][ny] !== 0) continue;

    isDirty = true;
  }

  let nDir = isDirty ? (dir + 3) % 4 : dir;
  if (isDirty) {
    let [nx, ny] = [x + dx[nDir], y + dy[nDir]];

    while (board[nx][ny] !== 0) {
      nDir = (nDir + 3) % 4;
      nx = x + dx[nDir];
      ny = y + dy[nDir];
    }

    queue.push([nx, ny, nDir]);
  } else {
    const [nx, ny] = [x + dx[(nDir + 2) % 4], y + dy[(nDir + 2) % 4]];

    if (board[nx][ny] === 1) break;

    queue.push([nx, ny, nDir]);
  }
}

console.log(cnt);
