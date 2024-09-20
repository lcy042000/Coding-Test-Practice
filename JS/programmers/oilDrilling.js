function solution(land) {
  var answer = 0;

  const flatLand = land.flat();
  const row = land.length,
    col = land[0].length;
  const list = Array(row * col).fill(-1);

  const dx = [0, 1, 0, -1],
    dy = [1, 0, -1, 0];

  flatLand.forEach((v, i) => {
    if (!v) list[i] = v;
  });

  const bfs = (x, y, num) => {
    list[col * x + y] = num;

    const queue = [[x, y]];
    let idx = 0;

    while (queue.length > idx) {
      const [cx, cy] = queue[idx++];

      for (let i = 0; i < 4; i++) {
        const [nx, ny] = [cx + dx[i], cy + dy[i]];

        if (nx < 0 || nx >= row || ny < 0 || ny >= col) continue;
        if (!land[nx][ny]) continue;
        if (list[col * nx + ny] > 0) continue;

        list[col * nx + ny] = num;
        queue.push([nx, ny]);
      }
    }
  };

  let num = 1;

  for (let i = 0; i < flatLand.length; i++) {
    if (list[i] > -1) continue;

    bfs(parseInt(i / col), i % col, num);
    num++;
  }

  const arr = Array(num).fill(0);

  list.forEach((v) => arr[v]++);

  const cols = Array.from(Array(col), () => new Set());

  list.forEach((v, i) => {
    if (v) {
      cols[i % col].add(v);
    }
  });

  let max = -Infinity;

  cols.forEach((v) => {
    const setArr = [...v];

    max = Math.max(
      max,
      setArr.reduce((acc, cur) => (acc += arr[cur]), 0)
    );
  });

  return max;
}
