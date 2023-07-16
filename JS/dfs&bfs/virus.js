"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `7
6
1 2
2 3
1 5
5 2
5 6
4 7`.split("\n");

const n = parseInt(input[0]);
const m = parseInt(input[1]);
const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(false));

for (let i = 2; i < 2 + m; i++) {
  const [a, b] = input[i].split(" ").map((v) => parseInt(v));
  graph[a][b] = true;
  graph[b][a] = true;
}

const visited = Array(n + 1).fill(false);
const stack = [1];

visited[1] = true;

while (stack.length > 0) {
  const top = stack.pop();

  graph[top].forEach((v, i) => {
    if (v && !visited[i]) {
      stack.push(i);
      visited[i] = true;
    }
  });
}

const result = visited.filter((v) => v).length - 1;

console.log(result);
