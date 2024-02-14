function solution(board) {
  var answer = 0;

  const start = [];
  const end = [];

  const newBoard = board.map((v) => v.split(""));

  const rowLen = newBoard.length;
  const colLen = newBoard[0].length;

  newBoard.forEach((row, idx) => {
    row.forEach((value, col) => {
      if (value === "R") start.push(...[idx, col]);
      if (value === "G") end.push(...[idx, col]);
    });
  });

  const queue = [[...start, 0]];
  let idx = 0;
  const isVisited = Array.from(Array(rowLen), () => Array(colLen).fill(false));
  let min = Infinity;

  while (queue.length > idx) {
    const [x, y, cnt] = queue[idx++];

    if (x === end[0] && y === end[1]) {
      min = Math.min(min, cnt);
      continue;
    }

    for (let i = y - 1; i > -1; i--) {
      if (newBoard[x][i] === "D") {
        if (!isVisited[x][i + 1]) {
          queue.push([x, i + 1, cnt + 1]);
          isVisited[x][i + 1] = true;
        }

        break;
      }

      if (i === 0) {
        if (!isVisited[x][i]) {
          queue.push([x, i, cnt + 1]);
          isVisited[x][i] = true;
        }
        break;
      }
    }

    for (let i = y + 1; i < colLen; i++) {
      if (newBoard[x][i] === "D") {
        if (!isVisited[x][i - 1]) {
          queue.push([x, i - 1, cnt + 1]);
          isVisited[x][i - 1] = true;
        }
        break;
      }

      if (i === colLen - 1) {
        if (!isVisited[x][i]) {
          queue.push([x, i, cnt + 1]);
          isVisited[x][i] = true;
        }
        break;
      }
    }

    for (let i = x - 1; i > -1; i--) {
      if (newBoard[i][y] === "D") {
        if (!isVisited[i + 1][y]) {
          queue.push([i + 1, y, cnt + 1]);
          isVisited[i + 1][y] = true;
        }
        break;
      }

      if (i === 0) {
        if (!isVisited[i][y]) {
          queue.push([i, y, cnt + 1]);
          isVisited[i][y] = true;
        }
        break;
      }
    }

    for (let i = x + 1; i < rowLen; i++) {
      if (newBoard[i][y] === "D") {
        if (!isVisited[i - 1][y]) {
          queue.push([i - 1, y, cnt + 1]);
          isVisited[i - 1][y] = true;
        }
        break;
      }

      if (i === rowLen - 1) {
        if (!isVisited[i][y]) {
          queue.push([i, y, cnt + 1]);
          isVisited[i][y] = true;
        }
        break;
      }
    }
  }

  answer = min === Infinity ? -1 : min;

  return answer;
}
