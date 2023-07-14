"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `10 4200
1
5
10
50
100
500
1000
5000
10000
50000`.split("\n");

let [N, K] = input[0].split(" ").map((n) => parseInt(n));
const coins = [];

for (let i = 1; i < N + 1; i++) {
  const coin = parseInt(input[i]);

  coin <= K && coins.push(coin);
}

let count = 0;

for (let i = coins.length - 1; i > -1; i--) {
  if (K === 0) break;
  else if (K < coins[i]) continue;
  else {
    count += parseInt(K / coins[i]);
    K = K % coins[i];
  }
}

console.log(count);
