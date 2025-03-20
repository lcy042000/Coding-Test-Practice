function solution(storage, requests) {
  var answer = 0;

  const n = storage.length,
    m = storage[0].length;
  const map = storage.map((v) => v.split(""));
  const dx = [-1, 0, 1, 0],
    dy = [0, 1, 0, -1];

  const bfs = (x, y) => {
    const queue = [[x, y]],
      isVisited = Array.from(Array(n), () => Array(m).fill(false));
    let idx = 0;
    isVisited[x][y] = true;

    while (idx < queue.length) {
      const [cx, cy] = queue[idx++];

      for (let i = 0; i < 4; i++) {
        const [nx, ny] = [cx + dx[i], cy + dy[i]];

        if (nx < 0 || n <= nx || ny < 0 || m <= ny) return true;
        if (isVisited[nx][ny] || map[nx][ny]) continue;

        queue.push([nx, ny]);
        isVisited[nx][ny] = true;
      }
    }

    return false;
  };

  for (const req of requests) {
    if (req.length === 1) {
      const delList = [];

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (!map[i][j] || map[i][j] !== req) continue;
          if (!bfs(i, j)) continue;

          delList.push([i, j]);
        }
      }

      for (const [x, y] of delList) {
        map[x][y] = null;
      }
    } else {
      const str = req.split("")[0];

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          if (!map[i][j] || map[i][j] !== str) continue;

          map[i][j] = null;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j]) answer++;
    }
  }

  return answer;
}
