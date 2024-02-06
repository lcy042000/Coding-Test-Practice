function solution(maps) {
  var answer = 0;

  const newMap = maps.map((v) => v.split(""));
  const start = [];
  const end = [];
  const lever = [];

  newMap.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      if (col === "S") {
        start.push(rowI, colI);
        newMap[rowI][colI] = "O";
      }
      if (col === "E") {
        end.push(rowI, colI);
        newMap[rowI][colI] = "O";
      }
      if (col === "L") {
        lever.push(rowI, colI);
        newMap[rowI][colI] = "O";
      }
    });
  });

  const rowLen = newMap.length;
  const colLen = newMap[0].length;

  let graph = Array.from(Array(rowLen), () => Array(colLen).fill(Infinity));

  graph[start[0]][start[1]] = 0;

  let queue = [[...start, 0]];
  let idx = 0;
  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];

  while (queue.length > idx) {
    const [x, y, v] = queue[idx++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= rowLen || ny < 0 || ny >= colLen) continue;
      if (graph[nx][ny] <= v + 1 || newMap[nx][ny] === "X") continue;

      graph[nx][ny] = v + 1;

      if (nx === lever[0] && ny === lever[1]) break;
      queue.push([nx, ny, v + 1]);
    }
  }

  const toL =
    graph[lever[0]][lever[1]] === Infinity ? -1 : graph[lever[0]][lever[1]];

  if (toL === -1) return -1;

  graph = Array.from(Array(rowLen), () => Array(colLen).fill(Infinity));
  queue = [[...lever, 0]];
  idx = 0;

  while (queue.length > idx) {
    const [x, y, v] = queue[idx++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= rowLen || ny < 0 || ny >= colLen) continue;
      if (graph[nx][ny] <= v + 1 || newMap[nx][ny] === "X") continue;

      graph[nx][ny] = v + 1;

      if (nx === end[0] && ny === end[1]) break;
      queue.push([nx, ny, v + 1]);
    }
  }

  answer =
    graph[end[0]][end[1]] === Infinity ? -1 : graph[end[0]][end[1]] + toL;

  return answer;
}
