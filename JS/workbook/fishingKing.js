"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `2 2 4
1 1 1 1 1
2 2 2 2 2
1 2 1 2 3
2 1 2 1 4`.split("\n");

const [r, c, m] = input[0].split(" ").map(Number);
let map = new Map();

input.slice(1).forEach((v) => {
  const [x, y, s, d, z] = v.split(" ").map(Number);

  map.set(`${x}/${y}`, [s, d - 1, z]);
});

const moveShark = () => {
  const temp = new Map();

  for (const [idx, [speed, dir, size]] of map) {
    let [x, y] = idx.split("/").map(Number);
    let nDir = dir;

    switch (dir) {
      case 0: {
        if (0 < x - speed) {
          x -= speed;
        } else {
          const dist = Math.floor((speed - (x - 1)) / (r - 1));
          const rest = (speed - (x - 1)) % (r - 1);

          if (dist % 2 === 0 && rest > 0) {
            nDir = dir % 2 ? dir - 1 : dir + 1;
            x = 1 + rest;
          } else if (dist % 2) {
            if (rest === 0) {
              nDir = dir % 2 ? dir - 1 : dir + 1;
            }
            x = r - rest;
          } else {
            x = 1;
          }
        }
        break;
      }
      case 1: {
        if (x + speed <= r) {
          x += speed;
          break;
        }

        const dist = Math.floor((speed - (r - x)) / (r - 1));
        const rest = (speed - (r - x)) % (r - 1);

        if (dist < 0 && rest <= 0) break;

        if (dist % 2 === 0 && rest > 0) {
          nDir = dir % 2 ? dir - 1 : dir + 1;
          x = r - rest;
        } else if (dist % 2) {
          if (rest === 0) {
            nDir = dir % 2 ? dir - 1 : dir + 1;
          }
          x = 1 + rest;
        } else x = r;

        break;
      }
      case 2: {
        if (y + speed <= c) {
          y += speed;
          break;
        }

        const dist = Math.floor((speed - (c - y)) / (c - 1));
        const rest = (speed - (c - y)) % (c - 1);

        if (dist < 0 && rest <= 0) break;

        if (dist % 2 === 0 && rest > 0) {
          nDir = dir % 2 ? dir - 1 : dir + 1;
          y = c - rest;
        } else if (dist % 2) {
          if (rest === 0) {
            nDir = dir % 2 ? dir - 1 : dir + 1;
          }
          y = 1 + rest;
        } else y = c;

        break;
      }
      case 3: {
        if (0 < y - speed) {
          y -= speed;
          break;
        }

        const dist = Math.floor((speed - (y - 1)) / (c - 1));
        const rest = (speed - (y - 1)) % (c - 1);

        if (dist < 0 && rest <= 0) break;

        if (dist % 2 === 0 && rest > 0) {
          nDir = dir % 2 ? dir - 1 : dir + 1;
          y = 1 + rest;
        } else if (dist % 2) {
          if (rest === 0) {
            nDir = dir % 2 ? dir - 1 : dir + 1;
          }
          y = c - rest;
        } else y = 1;

        break;
      }
    }

    if (temp.has(`${x}/${y}`) && size < temp.get(`${x}/${y}`)[2]) continue;

    temp.set(`${x}/${y}`, [speed, nDir, size]);
  }

  map = temp;
};

let result = 0;

for (let j = 1; j <= c; j++) {
  for (let i = 1; i <= r; i++) {
    if (!map.has(`${i}/${j}`)) continue;

    const [speed, dir, size] = map.get(`${i}/${j}`);
    result += size;
    map.delete(`${i}/${j}`);
    break;
  }

  moveShark();
}

console.log(result);
