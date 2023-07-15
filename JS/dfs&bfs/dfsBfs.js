"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `4 5 1
1 2
1 3
1 4
2 4
3 4`.split("\n");

const [N, M, V] = input[0].split(" ").map((v) => parseInt(v));

const graph = Array.from(Array(N + 1), () => Array.from(N + 1).fill(false));

for (let i = 1; i < M + 1; i++) {
  const [a, b] = input[i].split(" ").map((v) => parseInt(v));

  graph[a][b] = true;
  graph[b][a] = true;
}

const dfsVisited = Array.from(Array(N + 1), () => false);
dfsVisited[V] = true;
const result = [V];

function dfs(node) {
  graph[node].forEach((v, i) => {
    if (v && !dfsVisited[i]) {
      dfsVisited[i] = true;
      result.push(i);
      dfs(i);
    }
  });
}

function bfs() {
  const visited = Array.from(Array(N + 1), () => false);

  visited[V] = true;

  const queue = [V];
  const result = [];

  while (queue.length > 0) {
    const cur = queue.shift();

    result.push(cur);

    for (let i = 1; i < N + 1; i++) {
      if (graph[cur][i] && !visited[i]) {
        queue.push(i);
        visited[i] = true;
      }
    }
  }

  return result;
}

dfs(V);
console.log(result.join(" "));
console.log(bfs().join(" "));
