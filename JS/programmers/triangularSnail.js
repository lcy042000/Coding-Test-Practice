function solution(n) {
  var answer = [];

  const arr = Array(n + 1);

  for (let i = 1; i <= n; i++) {
    arr[i] = Array(i + 1).fill(-1);
  }

  const dx = [1, 0, -1];
  const dy = [0, 1, -1];

  const queue = [[1, 1, 1, 0]];
  let idx = 0;

  while (queue.length > idx) {
    const [x, y, value, dir] = queue[idx++];

    arr[x][y] = value;

    let nx = x + dx[dir];
    let ny = y + dy[dir];
    const nValue = value + 1;
    let nDir = dir;

    if (dir === 0) {
      if (
        nx < 1 ||
        nx > n ||
        ny < 1 ||
        ny >= arr[nx].length ||
        arr[nx][ny] !== -1
      ) {
        nx = x + dx[1];
        ny = y + dy[1];
        nDir = 1;
      }
    } else if (dir === 1) {
      if (
        nx < 1 ||
        nx > n ||
        ny < 1 ||
        ny >= arr[nx].length ||
        arr[nx][ny] !== -1
      ) {
        nx = x + dx[2];
        ny = y + dy[2];
        nDir = 2;
      }
    } else {
      if (
        nx < 1 ||
        nx > n ||
        ny < 1 ||
        ny >= arr[nx].length ||
        arr[nx][ny] !== -1
      ) {
        nx = x + dx[0];
        ny = y + dy[0];
        nDir = 0;
      }
    }

    if (
      nx < 1 ||
      nx > n ||
      ny < 1 ||
      ny >= arr[nx].length ||
      arr[nx][ny] !== -1
    )
      continue;

    queue.push([nx, ny, nValue, nDir]);
  }

  return arr
    .filter((v) => v.length > 0)
    .flat()
    .filter((v) => v > 0);
}
