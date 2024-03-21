function solution(board, skill) {
  var answer = 0;

  const rowLen = board.length;
  const colLen = board[0].length;
  const accSum = Array.from(Array(rowLen + 1), () => Array(colLen + 1).fill(0));

  for (const [type, r1, c1, r2, c2, degree] of skill) {
    const attack = type === 1 ? degree * -1 : degree;
    accSum[r1][c1] += attack;
    accSum[r2 + 1][c2 + 1] += attack;
    accSum[r2 + 1][c1] += -attack;
    accSum[r1][c2 + 1] += -attack;
  }

  for (let j = 0; j < colLen + 1; j++) {
    for (let i = 1; i < rowLen + 1; i++) {
      accSum[i][j] += accSum[i - 1][j];
    }
  }

  for (let i = 0; i < rowLen + 1; i++) {
    for (let j = 1; j < colLen + 1; j++) {
      accSum[i][j] += accSum[i][j - 1];
    }
  }

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      board[i][j] += accSum[i][j];
    }
  }

  answer = board
    .map((v) => v.filter((value) => value > 0).length)
    .reduce((acc, cur) => (acc += cur), 0);
  return answer;
}
