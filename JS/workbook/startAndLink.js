"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `8
0 5 4 5 4 5 4 5
4 0 5 1 2 3 4 5
9 8 0 1 2 3 1 2
9 9 9 0 9 9 9 9
1 1 1 1 0 1 1 1
8 7 6 5 4 0 3 2
9 1 9 1 9 1 0 9
6 5 4 3 2 1 9 0`.split("\n");

const N = Number(input[0]);
const graph = input.slice(1).map((v) => v.split(" ").map(Number));

const calc = (list1, list2) => {
  const sum1 = list1
    .map((v, i) => {
      let result = 0;

      for (let j = i + 1; j < list1.length; j++) {
        const r = list1[j];
        result += graph[v][r] + graph[r][v];
      }

      return result;
    })
    .reduce((acc, cur) => (acc += cur), 0);
  const sum2 = list2
    .map((v, i) => {
      let result = 0;

      for (let j = i + 1; j < list2.length; j++) {
        const r = list2[j];
        result += graph[v][r] + graph[r][v];
      }

      return result;
    })
    .reduce((acc, cur) => (acc += cur), 0);

  return Math.abs(sum1 - sum2);
};

let answer = Infinity;
const isVisited = new Set();

const dfs = () => {
  const stack = [[new Set(), 0]];

  while (stack.length) {
    const [list, idx] = stack.pop();

    if (idx === N && list.size < parseInt(N / 2)) continue;

    if (list.size === parseInt(N / 2)) {
      const list1 = [...list];
      const list2 = [];

      if (isVisited.has(list1.join("/"))) continue;

      for (let i = 0; i < N; i++) {
        if (list.has(i)) continue;

        list2.push(i);
      }

      isVisited.add(list1.join("/"));
      isVisited.add(list2.join("/"));

      answer = Math.min(answer, calc(list1, list2));
      continue;
    }

    for (let i = idx; i < N; i++) {
      const nList = [...list, i];

      stack.push([new Set(nList), i + 1]);
    }
  }
};

dfs();
console.log(answer);
