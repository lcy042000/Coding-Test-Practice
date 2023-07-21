"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4`.split("\n");

const n = parseInt(input.shift());
const m = parseInt(input.shift());

const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(Infinity));

input.forEach((e) => {
  const [start, end, value] = e.split(" ").map(Number);

  graph[start][end] = Math.min(graph[start][end], value);
});

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < n + 1; j++) {
    for (let k = 1; k < n + 1; k++) {
      if (j === k) graph[j][k] = 0;
      else graph[j][k] = Math.min(graph[j][k], graph[j][i] + graph[i][k]);
    }
  }
}

console.log(
  graph
    .slice(1)
    .map((arr) =>
      arr
        .slice(1)
        .map((v) => (v === Infinity ? 0 : v))
        .join(" ")
    )
    .join("\n")
);
