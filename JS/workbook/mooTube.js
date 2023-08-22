"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `4 3
1 2 3
2 3 2
2 4 4
1 2
4 1
3 1`.split("\n");

const [n, q] = input[0].split(" ").map((v) => +v);
const graph = Array.from(Array(n + 1), () => Array());

for (let i = 1; i < n; i++) {
  const [p, q, r] = input[i].split(" ").map((v) => +v);

  graph[p].push([q, r]);
  graph[q].push([p, r]);
}

for (let i = n; i < input.length; i++) {
  const [k, v] = input[i].split(" ").map((v) => +v);

  const visited = Array(n + 1).fill(false);
  const queue = [v];
  visited[v] = true;
  let count = 0;

  while (queue.length) {
    const cur = queue.shift();

    graph[cur].forEach((v) => {
      if (!visited[v[0]] && v[1] >= k) {
        visited[v[0]] = true;
        count++;
        queue.push(v[0]);
      }
    });
  }

  console.log(count);
}
