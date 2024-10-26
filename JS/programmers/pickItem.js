function solution(rectangle, characterX, characterY, itemX, itemY) {
  var answer = Infinity;

  const isInside = (idx, cx, cy) => {
    for (let i = 0; i < rectangle.length; i++) {
      if (i === idx) continue;

      const [lx, ly, rx, ry] = rectangle[i].map((v) => v * 2);

      if (lx < cx && cx < rx && ly < cy && cy < ry) return true;
    }

    return false;
  };

  const graph = Array.from(Array(101), () => Array(101).fill(0));
  const list = [];

  rectangle.forEach(([lx, ly, rx, ry], idx) => {
    for (let i = lx * 2; i <= rx * 2; i++) {
      list.push([i, ly * 2, idx], [i, ry * 2, idx]);
    }

    for (let y = ly * 2; y <= ry * 2; y++) {
      list.push([lx * 2, y, idx], [rx * 2, y, idx]);
    }
  });

  list.forEach(([cx, cy, idx]) => {
    if (!isInside(idx, cx, cy)) graph[cx][cy] = 1;
  });

  const queue = [[characterX * 2, characterY * 2, 0]];
  let idx = 0;
  const dx = [1, 0, -1, 0],
    dy = [0, 1, 0, -1];
  graph[characterX * 2][characterY * 2] = 0;

  while (queue.length > idx) {
    const [cx, cy, dist] = queue[idx++];

    for (let i = 0; i < 4; i++) {
      const nx = cx + dx[i],
        ny = cy + dy[i];

      if (nx < 0 || nx > 100 || ny < 0 || ny > 100 || !graph[nx][ny]) continue;

      if (nx === itemX * 2 && ny === itemY * 2) {
        return parseInt((dist + 1) / 2);
      }

      graph[nx][ny] = 0;
      queue.push([nx, ny, dist + 1]);
    }
  }

  return answer;
}
