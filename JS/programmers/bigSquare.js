function solution(board) {
  var answer = 0;

  const row = board.length;
  const col = board[0].length;

  if (row <= 1 || col <= 1) return 1;

  const dx = [0, -1, -1];
  const dy = [-1, -1, 0];

  let max = 0;

  for (let i = 1; i < row; i++) {
    for (let j = 1; j < col; j++) {
      if (!board[i][j]) {
        continue;
      }

      let min = Infinity;

      for (let k = 0; k < 3; k++) {
        const nx = i + dx[k];
        const ny = j + dy[k];

        min = Math.min(min, board[nx][ny]);
      }

      board[i][j] = min + 1;
      max = Math.max(max, min + 1);
    }
  }

  answer = max ** 2;

  return answer;
}
