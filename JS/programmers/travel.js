function solution(maps) {
  var answer = [];
  const map = maps.map((v) => v.split(""));
  const n = maps.length;
  const m = maps[0].length;
  const isVisited = Array.from(Array(n), () => Array(m).fill(false));

  map.forEach((row, i) => {
    row.forEach((v, j) => {
      if (v === "X") isVisited[i][j] = true;
    });
  });

  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (isVisited[i][j]) continue;

      const queue = [[i, j]];
      isVisited[i][j] = true;
      let idx = 0;
      let sum = 0;

      while (queue.length > idx) {
        const [x, y] = queue[idx++];

        sum += Number(map[x][y]);

        for (let k = 0; k < 4; k++) {
          const nx = x + dx[k];
          const ny = y + dy[k];

          if (nx < 0 || nx >= n || ny < 0 || ny >= m || isVisited[nx][ny])
            continue;

          queue.push([nx, ny]);
          isVisited[nx][ny] = true;
        }
      }
      answer.push(sum);
    }
  }

  if (answer.length) answer.sort((a, b) => a - b);
  else answer.push(-1);

  return answer;
}
