"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().trim().split("\n")
    : `3
2 2 2
4 4 4
8 8 8`.split("\n");

const N = Number(input[0]);
const board = input.slice(1).map((v) => v.split(" ").map(Number));

const moveNum = (dir, board) => {
  const nBoard = [];

  switch (dir) {
    case "L": {
      for (let i = 0; i < N; i++) {
        let row = [...board[i]];

        for (let j = 0; j < N - 1; j++) {
          const num = row[j];

          if (num === 0) continue;

          for (let k = j + 1; k < N; k++) {
            if (row[k] === 0) continue;
            if (num !== row[k]) break;

            row[j] *= 2;
            row[k] = 0;
            break;
          }
        }

        row = row.filter((v) => v > 0);
        nBoard.push([...row, ...Array(N - row.length).fill(0)]);
      }

      break;
    }
    case "R": {
      for (let i = 0; i < N; i++) {
        let row = [...board[i]];

        for (let j = N - 1; j > 0; j--) {
          const num = row[j];

          if (num === 0) continue;

          for (let k = j - 1; k >= 0; k--) {
            if (row[k] === 0) continue;
            if (num !== row[k]) break;

            row[j] *= 2;
            row[k] = 0;
            break;
          }
        }

        row = row.filter((v) => v > 0);
        nBoard.push([...Array(N - row.length).fill(0), ...row]);
      }
      break;
    }
    case "U": {
      const copy = Array.from(Array(N), () => Array(N).fill(0));
      for (let i = 0; i < N; i++) {
        let col = board.map((v) => v[i]);
        for (let j = 0; j < N - 1; j++) {
          const num = col[j];

          if (num === 0) continue;

          for (let k = j + 1; k < N; k++) {
            if (col[k] === 0) continue;
            if (num !== col[k]) break;

            col[j] *= 2;
            col[k] = 0;
            break;
          }
        }

        col = col.filter((v) => v > 0);
        col.forEach((v, idx) => {
          copy[idx][i] = v;
        });
      }

      nBoard.push(...copy);
      break;
    }
    case "D": {
      const copy = Array.from(Array(N), () => Array(N).fill(0));

      for (let i = 0; i < N; i++) {
        let col = board.map((v) => v[i]).reverse();

        for (let j = 0; j < N - 1; j++) {
          const num = col[j];

          if (num === 0) continue;

          for (let k = j + 1; k < N; k++) {
            if (col[k] === 0) continue;
            if (num !== col[k]) break;

            col[j] *= 2;
            col[k] = 0;
            break;
          }
        }

        col = col.filter((v) => v > 0);
        col.forEach((v, idx) => {
          copy[N - (idx + 1)][i] = v;
        });
      }

      nBoard.push(...copy);
      break;
    }
  }

  return nBoard;
};

const dirs = ["L", "R", "U", "D"];
const stack = [[board, 0]];
let max = -Infinity;

while (stack.length) {
  const [board, cnt] = stack.pop();

  for (const dir of dirs) {
    const nBoard = moveNum(dir, board);

    if (cnt === 4) {
      max = Math.max(max, ...nBoard.flat());
      continue;
    }

    stack.push([nBoard, cnt + 1]);
  }
}

console.log(max);
