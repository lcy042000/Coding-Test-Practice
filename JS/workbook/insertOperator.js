"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `2
-9 3
0 0 0 1`.split("\n");

const nums = input[1].split(" ").map(Number);
const ops = input[2].split(" ").map(Number);

let max = -Infinity,
  min = Infinity;

const calc = (list) => {
  const [num1, op, num2] = [list.pop(), list.pop(), list.pop()];
  let result = num1;

  switch (op) {
    case "+":
      result += num2;
      break;
    case "-":
      result -= num2;
      break;
    case "*":
      result *= num2;
      break;
    case "/":
      if (result < 0) {
        result = parseInt((result * -1) / num2) * -1;
      } else if (result === 0) {
        result = 0;
      } else result = parseInt(result / num2);
      break;
  }

  if (!list.length) {
    return result;
  } else {
    list.push(result);
    return calc(list);
  }
};

const dop = ["+", "-", "*", "/"];
const isVisited = new Set();

const find = () => {
  const stack = [[[], 0, [...ops]]];

  while (stack.length) {
    const [list, cnt, opList] = stack.pop();

    if (cnt === nums.length - 1) {
      const nList = [...list, nums[cnt]];
      const result = calc(nList.reverse());

      max = Math.max(max, result);
      min = Math.min(min, result);
      continue;
    }

    for (let i = 0; i < 4; i++) {
      if (!opList[i]) continue;

      const nList = [...list, nums[cnt], dop[i]];
      const nOpList = opList.map((v, index) => (i === index ? v - 1 : v));

      if (isVisited.has(nList.join(""))) continue;

      stack.push([nList, cnt + 1, nOpList]);
      isVisited.add(nList.join(""));
    }
  }
};

find();
console.log(max + "\n" + min);
