"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `7
pop
top
push 123
top
pop
top
pop`.split("\n");

const N = parseInt(input[0]);

const stack = [];
const result = [];

for (let i = 1; i < N + 1; i++) {
  const command = input[i].split(" ");

  switch (command[0]) {
    case "push": {
      stack.push(parseInt(command[1]));
      break;
    }
    case "pop": {
      result.push(stack.pop() || -1);
      break;
    }
    case "size": {
      result.push(stack.length);
      break;
    }
    case "empty": {
      result.push(stack.length ? 0 : 1);
      break;
    }
    case "top": {
      result.push(stack[stack.length - 1] || -1);
      break;
    }
    default:
      continue;
  }
}

console.log(result.join("\n"));
