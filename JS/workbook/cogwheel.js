"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `10010011
01010011
11100011
01010101
8
1 1
2 1
3 1
4 1
1 -1
2 -1
3 -1
4 -1`.split("\n");

const cogwheels = input.slice(0, 4).map((v) => v.split("").map(Number));

const K = Number(input[4]);
const cmd = input.slice(5).map((v) => v.split(" ").map(Number));

const seq = [
  [1, 2, 3],
  [0, 2, 3],
  [1, 3, 0],
  [2, 1, 0],
];

for (const [num, dir] of cmd) {
  const isNeedConvert = Array(4).fill(Infinity);
  isNeedConvert[num - 1] = dir;
  const sequence = seq[num - 1];

  for (const idx of sequence) {
    switch (idx) {
      case 0:
        if (
          isNeedConvert[1] !== Infinity &&
          cogwheels[0][2] !== cogwheels[1][6]
        ) {
          isNeedConvert[0] = -1 * isNeedConvert[1];
        } else isNeedConvert[0] = 0;

        break;
      case 1:
        if (
          isNeedConvert[0] !== Infinity &&
          cogwheels[0][2] !== cogwheels[1][6]
        ) {
          isNeedConvert[1] = -1 * isNeedConvert[0];
        } else if (
          isNeedConvert[2] !== Infinity &&
          cogwheels[1][2] !== cogwheels[2][6]
        ) {
          isNeedConvert[1] = -1 * isNeedConvert[2];
        } else isNeedConvert[1] = 0;

        break;
      case 2:
        if (
          isNeedConvert[1] !== Infinity &&
          cogwheels[1][2] !== cogwheels[2][6]
        ) {
          isNeedConvert[2] = -1 * isNeedConvert[1];
        } else if (
          isNeedConvert[3] !== Infinity &&
          cogwheels[2][2] !== cogwheels[3][6]
        ) {
          isNeedConvert[2] = -1 * isNeedConvert[3];
        } else isNeedConvert[2] = 0;

        break;
      case 3:
        if (
          isNeedConvert[2] !== Infinity &&
          cogwheels[2][2] !== cogwheels[3][6]
        ) {
          isNeedConvert[3] = -1 * isNeedConvert[2];
        } else isNeedConvert[3] = 0;

        break;
    }
  }

  for (let i = 0; i < 4; i++) {
    const convert = isNeedConvert[i];

    if (!convert) continue;

    const arr = cogwheels[i];

    if (convert < 0) {
      cogwheels[i] = [...arr.slice(1), arr[0]];
    } else {
      cogwheels[i] = [arr.pop(), ...arr];
    }
  }
}

let answer = 0;

for (let i = 0; i < 4; i++) {
  const pole = cogwheels[i][0];

  answer += pole === 0 ? 0 : Math.pow(2, i);
}

console.log(answer);
