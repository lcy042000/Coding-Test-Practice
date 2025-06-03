function solution(m, n, startX, startY, balls) {
  var answer = [];

  const dx = [startX, -1 * startX, startX, m + (m - startX)];
  const dy = [-1 * startY, startY, n + (n - startY), startY];

  const calcDist = (point) => {
    const [x, y] = point;
    let min = Infinity;

    for (let i = 0; i < 4; i++) {
      const [px, py] = [dx[i], dy[i]];

      if (x === startX) {
        if (y < startY && i === 0) continue;
        else if (startY < y && i === 2) continue;
      }
      if (y === startY) {
        if (x < startX && i === 1) continue;
        if (startX < x && i === 3) continue;
      }

      const result =
        Math.pow(Math.abs(px - x), 2) + Math.pow(Math.abs(py - y), 2);

      min = Math.min(min, result);
    }

    return min;
  };

  return balls.map((point) => calcDist(point));
}
