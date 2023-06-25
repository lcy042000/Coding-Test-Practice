"use strict";

class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(item) {
    this.queue.push(item);
  }
  dequeue() {
    return this.queue.shift();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5 6
101010
111111
000001
111111
111111`.split("\n");

const N = Number(input[0].split(" ")[0]);
const M = Number(input[0].split(" ")[1]);

const graph = Array.from(Array(N), () => Array(M).fill(0));

for (let i = 0; i < N; i++) {
  graph[i] = input[i + 1].split("").map((item) => Number(item));
}

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const bfs = (x, y) => {
  const queue = new Queue();
  queue.enqueue([x, y]);

  while (!queue.isEmpty()) {
    const [x, y] = queue.dequeue();

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx < 0 || nx >= N || ny < 0 || ny >= M) continue;

      if (graph[nx][ny] === 0) continue;

      if (graph[nx][ny] === 1) {
        graph[nx][ny] = graph[x][y] + 1;
        queue.enqueue([nx, ny]);

        if (nx === N - 1 && ny === M - 1) {
          return graph[nx][ny];
        }
      }
    }
  }

  return graph[N - 1][M - 1];
};

console.log(bfs(0, 0));
