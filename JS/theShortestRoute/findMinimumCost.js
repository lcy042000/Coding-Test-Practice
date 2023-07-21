"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().split("\n")
    : `5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5`.split("\n");

const n = parseInt(input[0]);
const m = parseInt(input[1]);

const graph = Array.from(Array(n + 1), () => []);

for (let i = 2; i < m + 2; i++) {
  const [start, end, value] = input[i].split(" ").map(Number);

  graph[start].push({ node: end, value: value });
}

const [start, end] = input[m + 2].split(" ").map(Number);

const dist = Array(n + 1).fill(Infinity);

dist[start] = 0;
const queue = [{ node: start, value: 0 }];

while (queue.length > 0) {
  const { node, value } = queue.shift();

  if (value > dist[node]) continue;

  for (const { node: end, value: w } of graph[node]) {
    if (dist[end] > dist[node] + w) {
      dist[end] = dist[node] + w;
      queue.push({ node: end, value: dist[end] });
    }
  }
}

console.log(dist[end]);
