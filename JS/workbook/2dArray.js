"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `28 13 13
1 2 1
2 1 3
3 3 3`.split("\n");

const [r, c, k] = input[0].split(" ").map(Number);
let arr = input.slice(1).map((v) => v.split(" ").map(Number));

const rOperation = () => {
  const rowLen = arr.length,
    colLen = arr[0].length;
  const mapList = Array.from(Array(rowLen), () => new Map());

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (!arr[i][j]) continue;

      const map = mapList[i],
        num = arr[i][j];

      if (map.has(num)) {
        map.set(num, map.get(num) + 1);
        continue;
      }

      map.set(num, 1);
    }
  }

  const maxLen = Math.max(...mapList.map((v) => v.size)) * 2;

  for (let i = 0; i < rowLen; i++) {
    const keys = [...mapList[i].keys()],
      values = [...mapList[i].values()];
    let list = keys.map((v, idx) => [v, values[idx]]);

    list.sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];

      return a[1] - b[1];
    });

    list = list.flat();

    if (list.length < maxLen) {
      arr[i] =
        100 < maxLen
          ? [...list, ...Array(maxLen - list.length).fill(0)].slice(0, 101)
          : [...list, ...Array(maxLen - list.length).fill(0)];
      continue;
    }

    arr[i] = 100 < maxLen ? list.slice(0, 101) : list;
  }
};

const cOperation = () => {
  const rowLen = arr.length,
    colLen = arr[0].length;
  const mapList = Array.from(Array(colLen), () => new Map());

  for (let j = 0; j < colLen; j++) {
    for (let i = 0; i < rowLen; i++) {
      if (!arr[i][j]) continue;

      const map = mapList[j];
      const num = arr[i][j];

      if (map.has(num)) {
        map.set(num, map.get(num) + 1);
        continue;
      }

      map.set(num, 1);
    }
  }

  const maxLen = Math.max(...mapList.map((v) => v.size)) * 2;
  const temp = Array.from(Array(100 < maxLen ? 100 : maxLen), () =>
    Array(colLen)
  );

  for (let j = 0; j < colLen; j++) {
    const keys = [...mapList[j].keys()],
      values = [...mapList[j].values()];
    let list = keys.map((v, idx) => [v, values[idx]]);

    list.sort((a, b) => {
      if (a[1] === b[1]) return a[0] - b[0];

      return a[1] - b[1];
    });

    list = list.flat();
    let idx = 0;

    for (let i = 0; i < maxLen && i < 100; i++) {
      if (list.length <= idx) {
        temp[i][j] = 0;
        continue;
      }

      temp[i][j] = list[idx++];
    }
  }

  arr = temp;
};

let result = -1;

for (let t = 0; t < 101; t++) {
  const rowLen = arr.length,
    colLen = arr[0].length;

  if (r <= rowLen && c <= colLen && arr[r - 1][c - 1] === k) {
    result = t;
    break;
  }

  colLen <= rowLen ? rOperation() : cOperation();
}

console.log(result);
