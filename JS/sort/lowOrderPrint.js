"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `2
홍길동 95
이순신 77`.split("\n");

const N = input[0];

const students = input.splice(1).map((item) => ({
  name: item.split(" ")[0],
  score: Number(item.split(" ")[1]),
}));

students.sort((a, b) => a.score - b.score);

students.forEach((item) => console.log(item.name));
