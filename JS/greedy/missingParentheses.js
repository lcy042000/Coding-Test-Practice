"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `00009-00009`.split("\n");

const plus = input[0].split("-");

let result = 0;

for (let i = 0; i < plus.length; i++) {
  let value = plus[i].split("+").reduce((acc, cur) => acc + Number(cur), 0);

  if (i === 0) result += value;
  else result -= value;
}

console.log(result);
