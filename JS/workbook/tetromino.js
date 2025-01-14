"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4 10
1 2 1 2 1 2 1 2 1 2
2 1 2 1 2 1 2 1 2 1
1 2 1 2 1 2 1 2 1 2
2 1 2 1 2 1 2 1 2 1`.split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(1).map((v) => v.split(" ").map(Number));

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];

let maxV = -Infinity;
board.forEach((v) => {
  const max = Math.max(...v);
  maxV = Math.max(maxV, max);
});

let answer = -Infinity;

const bfs = (startNode) => {
  const stack = [
    [
      startNode,
      board[Math.floor(startNode / M)][startNode % M],
      new Set([startNode]),
    ],
  ];

  while (stack.length) {
    const [node, point, isVisited] = stack.pop();
    const [x, y] = [Math.floor(node / M), node % M];

    if (point + maxV * (4 - isVisited.size) < answer) continue;

    for (let i = 0; i < 4; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx < 0 || N <= nx || ny < 0 || M <= ny) continue;
      if (isVisited.has(nx * M + ny)) continue;

      const nPoint = point + board[nx][ny];
      const nVisited = new Set(isVisited);
      nVisited.add(nx * M + ny);

      if (nVisited.size === 4) {
        answer = Math.max(answer, nPoint);
        continue;
      }

      if (nVisited.size === 3) {
        stack.push([x * M + y, nPoint, nVisited]);
      }

      stack.push([nx * M + ny, nPoint, nVisited]);
    }
  }
};

for (let i = 0; i < N * M; i++) {
  bfs(i);
}

console.log(answer);
