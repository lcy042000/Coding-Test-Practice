"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3 7
4 0 0 0 0 0 0
0 0 0 2 0 0 0
0 0 0 0 0 0 4`.split("\n");

const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1).map((v) => v.split(" ").map(Number));
const cameras = [];
let six = 0;

map.forEach((v, i) => {
  v.forEach((num, j) => {
    if (0 < num && num < 6) {
      cameras.push([num, i * M + j]);
    } else if (num === 6) six++;
  });
});

const straight = (x, y, dx, dy) => {
  const list = [x * M + y];

  while (true) {
    const idx = list[list.length - 1];
    const nx = Math.floor(idx / M) + dx,
      ny = (idx % M) + dy;

    if (nx < 0 || N <= nx || ny < 0 || M <= ny || map[nx][ny] === 6) break;

    list.push(nx * M + ny);
  }

  return list;
};

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];

const one = (idx) => {
  const x = Math.floor(idx / M),
    y = idx % M;

  const cases = [];

  for (let i = 0; i < 4; i++) {
    cases.push(straight(x, y, dx[i], dy[i]));
  }

  return cases;
};

const two = (idx) => {
  const x = Math.floor(idx / M),
    y = idx % M;
  const route = [];

  for (let i = 0; i < 4; i++) {
    route.push(straight(x, y, dx[i], dy[i]));
  }

  return [
    [...route[0], ...route[2]],
    [...route[1], ...route[3]],
  ];
};

const three = (idx) => {
  const x = Math.floor(idx / M),
    y = idx % M;
  const route = [];

  for (let i = 0; i < 4; i++) {
    route.push(straight(x, y, dx[i], dy[i]));
  }

  return route.map((v, i) => [...v, ...route[(i + 1) % 4]]);
};

const four = (idx) => {
  const x = Math.floor(idx / M),
    y = idx % M;
  const route = [];

  for (let i = 0; i < 4; i++) {
    route.push(straight(x, y, dx[i], dy[i]));
  }

  return route.map((v, i) => [
    ...v,
    ...route[(i + 1) % 4],
    ...route[(i + 2) % 4],
  ]);
};

const five = (idx) => {
  const x = Math.floor(idx / M),
    y = idx % M;
  const route = [];

  for (let i = 0; i < 4; i++) {
    route.push(straight(x, y, dx[i], dy[i]));
  }

  return [route.flat()];
};

const getRoute = (num, idx) => {
  switch (num) {
    case 1:
      return one(idx);
    case 2:
      return two(idx);
    case 3:
      return three(idx);
    case 4:
      return four(idx);
    case 5:
      return five(idx);
  }
};

const queue = [[0, new Set()]];
let idx = 0,
  answer = -Infinity;
const isVisited = new Set();

while (idx < queue.length) {
  const [cameraIdx, set] = queue[idx++];

  if (cameraIdx === cameras.length) {
    answer = Math.max(answer, set.size);

    continue;
  }

  const [info, index] = cameras[cameraIdx];
  const routes = getRoute(info, index);

  for (const route of routes) {
    const nRoute = [...route, ...set];
    const nSet = new Set(nRoute);

    if (isVisited.has(`${cameraIdx}-${nRoute.join("/")}`)) continue;

    isVisited.add(`${cameraIdx}-${nRoute.join("/")}`);
    queue.push([cameraIdx + 1, nSet]);
  }
}

console.log(N * M - (answer + six));
