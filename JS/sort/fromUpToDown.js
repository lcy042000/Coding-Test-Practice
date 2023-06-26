"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `3
15
27
12`.split("\n");

const N = input[0];

const nums = input.slice(1).map((item) => Number(item));

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;

  let pivot = arr[~~(arr.length / 2)];
  let tail = arr.filter((item, index) => index !== ~~(arr.length / 2));

  let left = tail.filter((item) => item > pivot);
  let right = tail.filter((item) => item <= pivot) || [];

  return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log(quickSort(nums));
