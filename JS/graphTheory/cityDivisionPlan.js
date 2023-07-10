"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `7 12
1 2 3
1 3 2
3 2 1
2 5 2
3 4 4
7 3 6
5 1 5
1 6 2
6 4 1
6 5 3
4 5 3
6 7 4`.split("\n");

function findParent(parent, x) {
  if (parent[x] !== x) parent[x] = findParent(parent, parent[x]);

  return parent[x];
}

function unionParent(parent, a, b) {
  let aParent = findParent(parent, a);
  let bParent = findParent(parent, b);

  if (aParent < bParent) parent[b] = aParent;
  else parent[a] = bParent;
}

const [n, m] = input[0].split(" ").map((v) => parseInt(v));

const parent = Array(n + 1)
  .fill(0)
  .map((v, i) => i);

const edge = [];
let result = 0;

for (let i = 1; i < m + 1; i++) {
  const [a, b, cost] = input[i].split(" ").map((v) => parseInt(v));

  edge.push([cost, a, b]);
}

edge.sort((a, b) => a[0] - b[0]);

let last = 0;

for (let i = 0; i < edge.length; i++) {
  const [cost, a, b] = edge[i];

  if (findParent(parent, a) !== findParent(parent, b)) {
    unionParent(parent, a, b);
    result += cost;
    last = cost;
  }
}

console.log(result - last);
