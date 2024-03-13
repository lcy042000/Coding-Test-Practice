function isOpen(graph) {
  return graph.every((v) => v === 1);
}

function solution(key, lock) {
  var answer = false;

  const m = key.length;
  const n = lock.length;
  const graphLen = n + (m - 1) * 2;
  const graph = Array(graphLen ** 2).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      graph[(i + m - 1) * graphLen + (j + m - 1)] = lock[i][j];
    }
  }

  const keys = [key];

  for (let i = 0; i < 3; i++) {
    const before = keys[i];
    const arr = [];

    for (let j = 0; j < m; j++) {
      const row = [];
      for (let k = m - 1; k >= 0; k--) {
        row.push(before[k][j]);
      }
      arr.push(row);
    }
    keys.push(arr);
  }

  const [startRow, startCol] = [m - 1, m - 1];
  const [endRow, endCol] = [n - 1 + (m - 1), n - 1 + (m - 1)];

  const dx = [0, 1];
  const dy = [1, 0];

  const isVisited = Array(graphLen ** 2).fill(false);
  const queue = [[0, 0]];
  let idx = 0;

  isVisited[0] = true;

  while (queue.length > idx) {
    const [x, y] = queue[idx++];

    for (let j = 0; j < 4; j++) {
      const cur = keys[j].flat();
      const copy = graph.slice();

      for (let i = 0; i < cur.length; i++) {
        const row = parseInt(i / m);
        const col = i % m;

        copy[(x + row) * graphLen + (y + col)] += cur[i];
      }

      const realGraph = [];

      for (let i = startRow; i <= endRow; i++) {
        realGraph.push(
          ...copy.slice(i * graphLen + startCol, i * graphLen + (endCol + 1))
        );
      }

      if (isOpen(realGraph)) {
        return true;
      }
    }

    for (let i = 0; i < 2; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx < 0 || nx > endRow || ny < 0 || ny > endCol) continue;
      if (isVisited[nx * graphLen + ny]) continue;

      queue.push([nx, ny]);
      isVisited[nx * graphLen + ny] = true;
    }
  }

  return answer;
}
