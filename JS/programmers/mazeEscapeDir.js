function solution(n, m, x, y, r, c, k) {
  var answer = "impossible";

  const dx = [-1, 0, 0, 1],
    dy = [0, 1, -1, 0];
  const dir = ["u", "r", "l", "d"];

  const stack = [[x - 1, y - 1, ""]];

  const dist = k - Math.abs(r - x) + Math.abs(c - y);
  if (dist < 0 || dist % 2 !== 0) return answer;

  while (stack.length) {
    const [cx, cy, route] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const [nx, ny, nRoute] = [cx + dx[i], cy + dy[i], route + dir[i]];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (nx === r - 1 && ny === c - 1 && nRoute.length === k) return nRoute;
      if (nRoute.length === k) continue;
      if (Math.abs(nx - (r - 1)) + Math.abs(ny - (c - 1)) > k - nRoute.length)
        continue;

      stack.push([nx, ny, nRoute]);
    }
  }

  return answer;
}
