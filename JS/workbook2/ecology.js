"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `Red Alder
 Ash
 Aspen
 Basswood
 Ash
 Beech
 Yellow Birch
 Ash
 Cherry
 Cottonwood
 Ash
 Cypress
 Red Elm
 Gum
 Hackberry
 White Oak
 Hickory
 Pecan
 Hard Maple
 White Oak
 Soft Maple
 Red Oak
 Red Oak
 White Oak
 Poplan
 Sassafras
 Sycamore
 Black Walnut
 Willow`.split("\n");

const trees = {};

input.forEach((v) => {
  if (!trees[v]) trees[v] = 1;
  else trees[v]++;
});

const keys = Object.keys(trees);

keys.sort();

const arr = [];

keys.forEach((v) => {
  arr.push([v, trees[v]]);
});

arr.forEach((v) => {
  const [name, count] = v;

  console.log(name, ((count / input.length) * 100).toFixed(4));
});
