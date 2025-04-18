"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `1
1 1 1`.split("\n");

const blue = Array.from(Array(8), () => Array(4).fill(0));
const green = Array.from(Array(8), () => Array(4).fill(0));
let point = 0,
  num = 1;

const n = Number(input[0]);

const cntPoint = (idx) => {
  const arr = idx % 2 ? blue : green;

  for (let i = 7; 3 < i; i--) {
    const set = new Set(arr[i]);

    if (set.has(0)) continue;

    downBreak(arr, i);
    i += 1;
    point++;
  }
};

const downBlock = (x, y, type, num, idx) => {
  let block = [];
  const arr = idx % 2 ? blue : green;

  if (!idx) {
    // green
    block.push([0, y]);

    if (2 <= type) {
      if (type % 2) {
        block.push([1, y]);
      } else {
        block.push([0, y + 1]);
      }
    }
  } else {
    block.push([0, 3 - x]);

    if (2 <= type) {
      if (type % 2) {
        block.push([0, 2 - x]);
      } else {
        block.push([1, 3 - x]);
      }
    }
  }

  while (!isBreak(block, arr)) {
    block = block.map(([x, y]) => [x + 1, y]);
  }

  block.forEach(([x, y]) => (arr[x][y] = num));

  cntPoint(idx);
  stopBreak(idx);
};

const stopBreak = (idx) => {
  const arr = idx % 2 ? blue : green;

  while (
    arr[2].reduce((acc, cur) => (acc += cur), 0) ||
    arr[3].reduce((acc, cur) => (acc += cur), 0)
  ) {
    downBreak(arr, 7);
  }
};

const downBreak = (arr, x) => {
  for (let i = 0; i < 4; i++) {
    arr[x][i] = 0;
  }

  for (let i = x - 1; 1 < i; i--) {
    for (let j = 0; j < 4; j++) {
      arr[i + 1][j] = arr[i][j];
      arr[i][j] = 0;
    }
  }
};

const isBreak = (block, arr) => {
  if (block.length === 1) {
    const [x, y] = block[0];

    return 8 <= x + 1 || 0 < arr[x + 1][y];
  }

  const [x1, y1] = block[0];
  const [x2, y2] = block[1];

  return (
    8 <= x1 + 1 || 8 <= x2 + 1 || 0 < arr[x1 + 1][y1] || 0 < arr[x2 + 1][y2]
  );
};

input.slice(1).forEach((v) => {
  const [t, x, y] = v.split(" ").map(Number);
  downBlock(x, y, t, num, 0);
  downBlock(x, y, t, num++, 1);
});

const cnt =
  blue.reduce(
    (acc, arr) => (acc += arr.reduce((acc2, cur) => (acc2 += cur ? 1 : 0), 0)),
    0
  ) +
  green.reduce(
    (acc, arr) => (acc += arr.reduce((acc2, cur) => (acc2 += cur ? 1 : 0), 0)),
    0
  );
console.log(point + "\n" + cnt);
