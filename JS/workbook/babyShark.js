"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3
0 0 0
0 0 0
0 9 0`.split("\n");

const n = Number(input[0]);
const map = input.slice(1).map((v) => v.split(" ").map(Number));

let shark = [-1, -1, 2];

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (map[i][j] === 9) {
      shark = [i, j, 2];
      map[i][j] = 0;
    }
  }
}

const dx = [-1, 0, 0, 1],
  dy = [0, -1, 1, 0];

const bfs = () => {
  const isVisited = Array.from(Array(n), () => Array(n).fill(false));
  isVisited[shark[0]][shark[1]] = true;

  const queue = [[shark[0], shark[1], 0]];
  let idx = 0;
  let min = [Infinity, Infinity, Infinity];

  while (idx < queue.length) {
    const [cx, cy, cnt] = queue[idx++];

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [cx + dx[i], cy + dy[i]];

      if (
        nx < 0 ||
        n <= nx ||
        ny < 0 ||
        n <= ny ||
        isVisited[nx][ny] ||
        shark[2] < map[nx][ny]
      )
        continue;
      if (0 < map[nx][ny] && map[nx][ny] < shark[2]) {
        if (min[2] < cnt + 1) return min;

        if (nx < min[0]) {
          min = [nx, ny, cnt + 1];
          continue;
        } else if (nx === min[0]) {
          if (ny < min[1]) {
            min = [nx, ny, cnt + 1];
            continue;
          } else continue;
        } else continue;
      }

      isVisited[nx][ny] = true;

      queue.push([nx, ny, cnt + 1]);
    }
  }

  return min[0] === Infinity ? [-1, -1, -1] : min;
};

let time = 0,
  cnt = 0;
let info = undefined;

while (0 <= (info = bfs()).reduce((acc, cur) => (acc *= cur), 1)) {
  time += info[2];
  cnt += 1;

  if (cnt === shark[2]) {
    cnt = 0;
    shark[2] += 1;
  }

  shark = [info[0], info[1], shark[2]];
  map[info[0]][info[1]] = 0;
}

console.log(time);
