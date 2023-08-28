"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5
8*3+5`.split("\n");

const n = +input[0];
const arr = Array.from(Array(n), () => Array.from(Array(n), () => []));
const expression = input[1].split("");

for (let i = 0; i < n; i += 2) {
  arr[i][i].push(+expression[i]);
  arr[i][i].push(+expression[i]);
}

function calculate(num1, num2, op) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
  }
}

for (let j = 2; j < n; j += 2) {
  for (let i = 0; i < n - j; i += 2) {
    for (let k = 2; k <= j; k += 2) {
      const op = expression[i + k - 1];
      const list = [];
      list.push(calculate(arr[i][i + k - 2][0], arr[i + k][i + j][0], op));
      list.push(calculate(arr[i][i + k - 2][0], arr[i + k][i + j][1], op));
      list.push(calculate(arr[i][i + k - 2][1], arr[i + k][i + j][0], op));
      list.push(calculate(arr[i][i + k - 2][1], arr[i + k][i + j][1], op));

      const max =
        arr[i][i + j].length > 0
          ? Math.max(...list, arr[i][i + j][0])
          : Math.max(...list);
      const min =
        arr[i][i + j].length > 0
          ? Math.min(...list, arr[i][i + j][1])
          : Math.min(...list);
      arr[i][i + j][0] = max;
      arr[i][i + j][1] = min;
    }
  }
}

console.log(arr[0][n - 1][0]);
