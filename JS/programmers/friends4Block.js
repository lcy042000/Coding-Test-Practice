function setBoard(list, col, board) {
  list.forEach((v) => {
    const i = parseInt(v / col);
    const j = v % col;

    board[i][j] = undefined;
  });

  list.forEach((v) => {
    const i = parseInt(v / col);
    const j = v % col;

    for (let k = i - 1; k > -1; k--) {
      board[k + 1][j] = board[k][j];
      if (k === 0) board[k][j] = undefined;
    }
  });
}

function game(row, col, board) {
  const set = new Set();

  const dx = [0, 1, 1];
  const dy = [1, 1, 0];

  for (let i = 0; i < row - 1; i++) {
    for (let j = 0; j < col - 1; j++) {
      if (!board[i][j]) continue;

      const value = board[i][j];

      if (value !== board[i + dx[0]][j + dy[0]]) continue;
      if (value !== board[i + dx[1]][j + dy[1]]) continue;
      if (value !== board[i + dx[2]][j + dy[2]]) continue;

      set.add(i * col + j);
      set.add((i + dx[0]) * col + (j + dy[0]));
      set.add((i + dx[1]) * col + (j + dy[1]));
      set.add((i + dx[2]) * col + (j + dy[2]));
    }
  }

  return set;
}

function solution(m, n, board) {
  var answer = 0;
  const gameBoard = board.map((v) => v.split(""));

  while (true) {
    const list = game(m, n, gameBoard);
    answer += list.size;

    if (list.size === 0) break;

    setBoard(list, n, gameBoard);
  }

  return answer;
}
