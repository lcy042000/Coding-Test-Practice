"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4
50 50 0 10
50 50 1 10
50 50 2 10
50 50 3 10`.split("\n");

const n = Number(input[0]);

const dx = [0, -1, 0, 1],
  dy = [1, 0, -1, 0];

const makeCurve = (maxG, curG, dirs, points) => {
  if (maxG === curG) return points;

  let [cx, cy] = points[points.length - 1];
  const nDir = [];

  for (let i = dirs.length - 1; i >= 0; i--) {
    const dir = (dirs[i] + 1) % 4;

    cx += dx[dir];
    cy += dy[dir];

    nDir.push(dir);
    points.push([cx, cy]);
  }

  dirs.push(...nDir);

  makeCurve(maxG, curG + 1, dirs, points);
};

const validPoints = Array.from(Array(101), () => Array(101).fill(false));

for (let i = 1; i < input.length; i++) {
  const [y, x, d, g] = input[i].split(" ").map(Number);
  const points = [
    [x, y],
    [x + dx[d], y + dy[d]],
  ];

  makeCurve(g, 0, [d], points);

  for (const [x, y] of points) {
    if (x < 0 || 100 < x || y < 0 || 100 < y) continue;

    validPoints[x][y] = true;
  }
}

let cnt = 0;

for (let i = 1; i < 101; i++) {
  for (let j = 1; j < 101; j++) {
    if (!validPoints[i][j]) continue;

    if (!validPoints[i - 1][j - 1]) continue;
    if (!validPoints[i - 1][j]) continue;
    if (!validPoints[i][j - 1]) continue;

    cnt++;
  }
}

console.log(cnt);
