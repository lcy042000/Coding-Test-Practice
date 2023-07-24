"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5`
        .trim()
        .split("\n");

const t = parseInt(input.shift());

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

for (let i = 0; i < t; i++) {
  const [m, n, k] = input.shift().split(" ").map(Number);
  const graph = Array.from(Array(n), () => Array(m).fill(0));
  const visited = Array.from(Array(n), () => Array(m).fill(-1));

  for (let j = 0; j < k; j++) {
    const [y, x] = input.shift().split(" ").map(Number);
    graph[x][y] = 1;
  }

  const queue = [[0, 0]];
  let count = 1;

  visited.forEach((arr, row) => {
    arr.forEach((v, col) => {
      if (v !== -1 || graph[row][col] === 0) return;

      queue.push([row, col]);

      while (queue.length > 0) {
        const [x, y] = queue.shift();

        if (visited[x][y] !== -1) continue;

        if (graph[x][y] === 0) {
          visited[x][y] = 0;
        } else {
          visited[x][y] = count;
        }

        for (let j = 0; j < 4; j++) {
          const nx = x + dx[j];
          const ny = y + dy[j];

          if (0 <= nx && nx < n && 0 <= ny && ny < m) {
            graph[nx][ny] > 0 && queue.push([nx, ny]);
          }
        }
      }

      count++;
    });
  });

  console.log(count - 1);
}
