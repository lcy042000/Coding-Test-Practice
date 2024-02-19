function solution(board) {
  var answer = 0;
  const len = board.length;
  const roades = [];
  const queue = [[0, 0, []]];
  let idx = 0;
  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];
  const isVisited = Array.from(Array(board.length), () =>
    Array(board.length).fill(Infinity)
  );

  isVisited[0][0] = 0;

  while (queue.length > idx) {
    const [x, y, road] = queue[idx++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= len || ny < 0 || ny >= len) continue;
      if (board[nx][ny] === 1) continue;

      let cnt = 0;
      for (let i = 1; i < road.length; i++) {
        if (road[i - 1] !== road[i]) cnt++;
      }

      if (isVisited[nx][ny] < cnt) continue;

      isVisited[nx][ny] = cnt;

      const nRoad = [...road, i];

      if (nx === len - 1 && ny === len - 1) {
        roades.push(nRoad);
        continue;
      }

      queue.push([nx, ny, nRoad]);
    }
  }

  let min = Infinity;

  roades.forEach((v) => {
    let cnt = 0;

    for (let i = 1; i < v.length; i++) {
      if (v[i - 1] !== v[i]) cnt++;
    }

    min = Math.min(min, 100 * v.length + cnt * 500);
  });

  answer = min;

  return answer;
}
