"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `10
5
1 5
1 3
1 2
1 6
1 7
4
8 D
10 D
11 D
13 L`.split("\n");

const N = parseInt(input[0]);
const K = parseInt(input[1]);
const apple = input
  .slice(2, 2 + K)
  .map((v) => v.split(" ").map((value) => Number(value) - 1));
const L = parseInt(input[2 + K]);
const convertInfo = input
  .slice(3 + K)
  .map((v) =>
    v.split(" ").map((value, i) => (!(i % 2) ? Number(value) : value))
  )
  .reverse();

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];
const appleSet = new Set();

apple.forEach(([x, y]) => {
  appleSet.add(`${x * N + y}`);
});

const stack = [[Array(1).fill(0), 0, 1]];

while (stack.length) {
  let [len, time, dir] = stack.pop();
  const head = len[len.length - 1];
  const [hx, hy] = [parseInt(head / N), head % N];
  const lenSet = new Set(len);

  const isConvert =
    convertInfo.length && convertInfo[convertInfo.length - 1][0] === time;
  dir = isConvert
    ? convertInfo[convertInfo.length - 1][1] === "L"
      ? (dir + 3) % 4
      : (dir + 1) % 4
    : dir;

  if (isConvert) convertInfo.pop();

  const [nx, ny] = [hx + dx[dir], hy + dy[dir]];

  if (nx < 0 || N <= nx || ny < 0 || N <= ny || lenSet.has(nx * N + ny))
    return console.log(time + 1);

  if (appleSet.has(`${nx * N + ny}`)) {
    len.push(nx * N + ny);
    appleSet.delete(`${nx * N + ny}`);
  } else {
    len = len.slice(1);
    len.push(nx * N + ny);
  }

  stack.push([len, time + 1, dir]);
}
