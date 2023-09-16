"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `15
AFC
AAFC
AAAFFCC
AAFCC
BAFC
QWEDFGHJMNB
DFAFCB
ABCDEFC
DADC
SDFGHJKLQWERTYU
AAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCCCCCCCCCDDDDDDDDDDDEEEEEEEEEEEEEEEFFFFFFFFC
AAAFFFFFBBBBCCCAAAFFFF
ABCDEFAAAFFFCCCABCDEF
AFCP
AAFFCPP`.split("\n");

const n = +input[0];

function isCorrect(word) {
  if (word.length < 3) return false;

  if ("F" < word[0]) return false;

  let aStart = word.indexOf("A");
  while (word[aStart] === "A") {
    aStart++;
  }

  if (aStart === word.length || word[aStart] !== "F") return false;

  while (word[aStart] === "F") {
    aStart++;
  }

  if (aStart === word.length || word[aStart] !== "C") return false;

  while (word[aStart] === "C") {
    aStart++;

    if (aStart === word.length) return true;
  }

  if ("F" < word[aStart]) return false;

  if (aStart + 1 !== word.length) return false;
}

for (let i = 1; i <= n; i++) {
  if (isCorrect(input[i])) {
    console.log("Infected!");
  } else {
    console.log("Good");
  }
}
