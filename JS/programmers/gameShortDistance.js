function solution(maps) {
  var answer = 0;

  const row = maps.length;
  const col = maps[0].length;

  const isVisited = Array.from(Array(row), () => Array(col).fill(Infinity));

  maps.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === 0) {
        isVisited[rowIdx][colIdx] = -1;
      }
    });
  });

  isVisited[0][0] = 1;
  const queue = [[0, 0]];
  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];
  let idx = 0;

  while (idx < queue.length) {
    const [cRow, cCol] = queue[idx++];
    const nValue = isVisited[cRow][cCol] + 1;

    for (let i = 0; i < 4; i++) {
      const nx = cRow + dx[i];
      const ny = cCol + dy[i];

      if (nx < 0 || nx >= row || ny < 0 || ny >= col) continue;

      if (isVisited[nx][ny] === -1) continue;

      if (isVisited[nx][ny] > nValue) {
        isVisited[nx][ny] = nValue;

        if (nx === row - 1 && ny === col - 1) break;

        queue.push([nx, ny]);
      }
    }
  }

  answer =
    isVisited[row - 1][col - 1] !== Infinity ? isVisited[row - 1][col - 1] : -1;
  return answer;
}
