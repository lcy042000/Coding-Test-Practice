"use strict";

const fs = require("fs");
const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3 3 0 0 16
0 1 2
3 4 5
6 7 8
4 4 1 1 3 3 2 2 4 4 1 1 3 3 2 2`.split("\n");

const [N, M, x, y, K] = input[0].split(" ").map(Number);
const graph = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const dirList = input[N + 1].split(" ").map(Number);

const dice = Array(6).fill(0);
let list = ["u", "s", "e", "w", "n", "d"];
let down = 5;
let [cx, cy] = [x, y];
const dx = [0, 0, -1, 1],
  dy = [1, -1, 0, 0];

const nextDir = (dir, list) => {
  if (dir === 1) {
    // east 북, 남 / 동 -> down, 서 -> up, up -> 동, down -> 서
    return list.map((v, i) => {
      switch (v) {
        case "e":
          down = i;
          return "d";
        case "w":
          return "u";
        case "u":
          return "e";
        case "d":
          return "w";
        default:
          return v;
      }
    });
  } else if (dir === 2) {
    //west 북, 남 / 동 -> up, 서 -> down, up -> 서, down -> 동
    return list.map((v, i) => {
      switch (v) {
        case "e":
          return "u";
        case "w":
          down = i;
          return "d";
        case "u":
          return "w";
        case "d":
          return "e";
        default:
          return v;
      }
    });
  } else if (dir === 3) {
    // north 동, 서 / 북 -> down, 남 -> up, up -> 북, down -> 남
    return list.map((v, i) => {
      switch (v) {
        case "n":
          down = i;
          return "d";
        case "s":
          return "u";
        case "u":
          return "n";
        case "d":
          return "s";
        default:
          return v;
      }
    });
  } else if (dir === 4) {
    // south 동, 서 / 북 -> up, 남 -> down, up -> 남, down -> 북
    return list.map((v, i) => {
      switch (v) {
        case "n":
          return "u";
        case "s":
          down = i;
          return "d";
        case "u":
          return "s";
        case "d":
          return "n";
        default:
          return v;
      }
    });
  }
};

const findUp = (down) => {
  switch (down) {
    case 0:
      return 5;
    case 1:
      return 4;
    case 2:
      return 3;
    case 3:
      return 2;
    case 4:
      return 1;
    case 5:
      return 0;
  }
};

for (const dir of dirList) {
  const [nx, ny] = [cx + dx[dir - 1], cy + dy[dir - 1]];

  if (nx < 0 || N <= nx || ny < 0 || M <= ny) continue;

  cx = nx;
  cy = ny;
  list = nextDir(dir, list);

  if (!graph[nx][ny]) {
    graph[nx][ny] = dice[down];
  } else {
    dice[down] = graph[nx][ny];
    graph[nx][ny] = 0;
  }

  console.log(dice[findUp(down)]);
}
