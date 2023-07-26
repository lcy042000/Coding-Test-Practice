"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `4 6
a t c i s w`.split("\n");

const [l, c] = input[0].split(" ").map((num) => Number(num));
const arr = input[1].split(" ").sort();

const visited = Array(c).fill(false);

const dfs = (idx, cnt, vowel, consonant) => {
  if (cnt === l) {
    if (vowel >= 1 && consonant >= 2) {
      console.log(arr.filter((_, idx) => visited[idx]).join(""));
    }

    return;
  }

  for (let i = idx; i < c; i++) {
    if (!visited[i]) {
      visited[i] = true;

      if (
        arr[i] === "a" ||
        arr[i] === "e" ||
        arr[i] === "i" ||
        arr[i] === "o" ||
        arr[i] === "u"
      ) {
        dfs(i + 1, cnt + 1, vowel + 1, consonant);
      } else {
        dfs(i + 1, cnt + 1, vowel, consonant + 1);
      }

      visited[i] = false;
    }
  }
};

dfs(0, 0, 0, 0);
