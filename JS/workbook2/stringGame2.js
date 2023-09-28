"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `1
abaaaba
3`.split("\n");

const t = Number(input.shift());
const game = [];

for (let i = 0; i < t; i++) {
  const string = input.shift();
  const k = Number(input.shift());

  game.push([string, k]);
}

const solution = (game) => {
  const [string, k] = game;
  const arr = Array.from(
    Array("z".charCodeAt(0) - "a".charCodeAt(0) + 1),
    () => []
  );
  const chs = string.split("");

  chs.forEach((v, i) => {
    arr[v.charCodeAt(0) - "a".charCodeAt(0)].push(i);
  });

  let min = Infinity - 1;
  let max = -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < k) continue;

    for (let j = k - 1; j < arr[i].length; j++) {
      const dist = arr[i][j] - arr[i][j - k + 1];

      min = Math.min(min, dist);
      max = Math.max(max, dist);
    }
  }

  return [min + 1, max + 1];
};

game.forEach((v) => {
  const result = solution(v);

  if (result[0] === Infinity) console.log(-1);
  else console.log(result.join(" "));
});
