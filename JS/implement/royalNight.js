"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `c2`.split("\n");

const col = input[0].split("")[0];
const row = parseInt(input[0].split("")[1]);

function isAvailable(arr) {
  return arr.filter(
    (v) =>
      String.fromCharCode(v.col) >= "a" &&
      String.fromCharCode(v.col) <= "h" &&
      v.row >= 1 &&
      v.row <= 8
  );
}

const values = [
  { col: col.charCodeAt(0) - 1, row: row + 2 },
  { col: col.charCodeAt(0) + 1, row: row + 2 },
  { col: col.charCodeAt(0) - 1, row: row - 2 },
  { col: col.charCodeAt(0) + 1, row: row - 2 },
  { col: col.charCodeAt(0) - 2, row: row + 1 },
  { col: col.charCodeAt(0) - 2, row: row - 1 },
  { col: col.charCodeAt(0) + 2, row: row + 1 },
  { col: col.charCodeAt(0) + 2, row: row - 1 },
];

console.log(isAvailable(values).length);
