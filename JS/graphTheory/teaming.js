"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `7 8
0 3 1
1 1 7
0 7 6
1 7 1
0 3 7
0 4 2
0 1 1
1 1 1`.split("\n");

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

for (let i = 1; i < m + 1; i++) {
  const [oper, a, b] = input[i].split(" ").map((v) => parseInt(v));

  if (oper) {
    if (findParent(parent, a) === findParent(parent, b)) console.log("YES");
    else console.log("NO");
  } else {
    unionParent(parent, a, b);
  }
}
