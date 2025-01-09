"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `5 5
#####
#..B#
#.#.#
#RO.#
#####`.split("\n");

const [N, M] = input[0].split(" ").map(Number);
const board = input.slice(2, N).map((v) => v.split("").slice(1, M - 1));

let red = null,
  blue = null;

board.forEach((v, i) => {
  for (let j = 0; j < v.length; j++) {
    if (v[j] === "R") {
      red = [i, j];
    } else if (v[j] === "B") {
      blue = [i, j];
    }
  }
});

const dx = [-1, 0, 1, 0],
  dy = [0, 1, 0, -1];
const isVisited = new Set();

const bfs = () => {
  const queue = [[red, blue, 0, -1]];
  let idx = 0;

  while (idx < queue.length) {
    const [[rx, ry], [bx, by], cnt, prev] = queue[idx++];
    isVisited.add(`${rx}/${ry}/${bx}/${by}`);

    for (let i = 0; i < 4; i++) {
      if (i === prev) continue;

      let [rcx, rcy] = [rx, ry];
      let [bcx, bcy] = [bx, by];

      let isRedHole = false,
        isBlueHole = false;

      while (true) {
        let [rnx, rny] = [rcx + dx[i], rcy + dy[i]];
        let [bnx, bny] = [bcx + dx[i], bcy + dy[i]];

        if (
          rnx < 0 ||
          N - 2 <= rnx ||
          rny < 0 ||
          M - 2 <= rny ||
          board[rnx][rny] === "#" ||
          (bcx === rnx && bcy === rny)
        ) {
          rnx = rcx;
          rny = rcy;
        }
        if (
          bnx < 0 ||
          N - 2 <= bnx ||
          bny < 0 ||
          M - 2 <= bny ||
          board[bnx][bny] === "#" ||
          (!isRedHole && rcx === bnx && rcy === bny)
        ) {
          bnx = bcx;
          bny = bcy;
        }

        if (board[bnx][bny] === "O") {
          isBlueHole = true;
          break;
        }

        if (board[bnx][bny] !== "O" && board[rnx][rny] === "O") {
          isRedHole = true;
        }

        if (rnx === rcx && rny === rcy && bnx === bcx && bny === bcy) break;

        rcx = rnx;
        rcy = rny;
        bcx = bnx;
        bcy = bny;
      }

      if (isBlueHole) continue;
      else if (!isBlueHole && isRedHole) return cnt + 1;

      if (isVisited.has(`${rcx}/${rcy}/${bcx}/${bcy}`)) continue;
      isVisited.add(`${rcx}/${rcy}/${bcx}/${bcy}`);

      queue.push([[rcx, rcy], [bcx, bcy], cnt + 1, i]);
    }
  }

  return -1;
};

const result = bfs();

console.log(result <= 10 ? result : -1);
