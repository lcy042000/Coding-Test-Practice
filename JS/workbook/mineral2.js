"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `9 8
........
.xxxx...
.x......
.x.xxxx.
.x....x.
.x....x.
.xxxx.x.
....xxx.
......x.
1
2`.split("\n");

const [r, c] = input[0].split(" ").map((v) => +v);
const graph = Array.from(Array(r), () => Array(c).fill("."));

for (let i = 1; i < r + 1; i++) {
  input[i].split("").forEach((v, idx) => {
    graph[i - 1][idx] = v;
  });
}

const dx = [0, -1, 0, 1];
const dy = [-1, 0, 1, 0];

function drop(list) {
  let min = Infinity;

  list.forEach((row, rowIdx) => {
    row.forEach((v, colIdx) => {
      if (v !== "-") {
        list[rowIdx][colIdx] = graph[rowIdx][colIdx];
      }
    });
  });

  list.forEach((row, rowIdx) => {
    row.forEach((v, colIdx) => {
      if (v === "-") {
        let cnt = 0;
        let x = rowIdx + 1;

        while (x < r && list[x][colIdx] !== "x") {
          cnt++;
          x++;
        }

        min = Math.min(min, cnt);
      }
    });
  });

  for (let i = r - 1; i >= 0; i--) {
    if (list[i].includes("-")) {
      list[i].forEach((v, idx) => {
        if (v === "-") {
          graph[i][idx] = ".";
          graph[i + min][idx] = "x";
        }
      });
    }
  }
}

function bfs(start) {
  const visited = Array.from(Array(r), () => Array(c).fill(false));
  const queue = [start];

  visited[start[0]][start[1]] = true;

  let list = Array.from(Array(r), () => Array(c).fill("."));

  while (queue.length) {
    const [x, y] = queue.shift();

    list[x][y] = "-";

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || ny >= c) continue;

      if (nx >= r) {
        return;
      }

      if (!visited[nx][ny] && graph[nx][ny] === "x") {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
      }
    }
  }

  drop(list);
}

const n = +input[r + 1];

input[r + 2].split(" ").forEach((v, i) => {
  if (i % 2 === 0) {
    const x = Math.abs(v - r);
    let y = 0;

    while (true) {
      if (graph[x][y] === "x") {
        graph[x][y] = ".";
        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (nx < 0 || ny < 0 || ny >= c || nx >= r) continue;

          if (graph[nx][ny] === "x") {
            bfs([nx, ny]);
          }
        }

        break;
      } else if (y === c - 1) {
        break;
      } else {
        y++;
      }
    }
  } else {
    const x = Math.abs(v - r);
    let y = c - 1;

    while (true) {
      if (graph[x][y] === "x") {
        graph[x][y] = ".";
        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (nx < 0 || ny < 0 || ny >= c || nx >= r) continue;

          if (graph[nx][ny] === "x") {
            bfs([nx, ny]);
          }
        }

        break;
      } else if (y === 0) {
        break;
      } else {
        y--;
      }
    }
  }
});

console.log(graph.map((v) => v.join("")).join("\n"));
