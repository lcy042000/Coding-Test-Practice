"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `6 8
1 2
2 5
5 1
3 4
4 6
5 4
2 4
2 3`.split("\n");

const [n, m] = input.shift().split(" ").map(Number);
const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(0));
const visited = Array(n + 1).fill(false);
const stack = [];
let count = 0;

input.forEach((v) => {
  const [a, b] = v.split(" ").map(Number);
  graph[a][b] = 1;
  graph[b][a] = 1;
});

while (visited.slice(1).includes(false)) {
  const node = visited.findIndex((v, i) => i > 0 && v === false);
  count++;
  stack.push(node);
  visited[node] = true;

  while (stack.length > 0) {
    const cur = stack.pop();

    for (let i = 1; i <= n; i++) {
      if (graph[cur][i] === 1 && !visited[i]) {
        stack.push(i);
        visited[i] = true;
      }
    }
  }
}

console.log(count);
