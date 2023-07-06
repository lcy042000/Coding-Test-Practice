"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `26`.split("\n");

const X = parseInt(input[0]);

let n = 0;
let num = 1;

while (num * 5 <= X) {
  num *= 5;
  n++;
}

while (num * 3 <= X) {
  num *= 3;
  n++;
}

while (num * 2 <= X) {
  num *= 2;
  n++;
}

while (num + 1 <= X) {
  num++;
  n++;
}

console.log(n);
