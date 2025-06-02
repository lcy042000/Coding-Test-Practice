function solution(n, m, x, y, queries) {
  var answer = 0;

  let [x1, y1] = [x, y],
    [x2, y2] = [x, y];

  for (let idx = queries.length - 1; 0 <= idx; idx--) {
    const [dir, cnt] = queries[idx];

    switch (dir) {
      case 0:
        if (y1 !== 0) y1 += cnt;
        y2 += cnt;
        if (y2 > m - 1) y2 = m - 1;
        break;
      case 1:
        y1 -= cnt;
        if (y1 < 0) y1 = 0;
        if (y2 !== m - 1) y2 -= cnt;
        break;
      case 2:
        if (x1 !== 0) x1 += cnt;
        x2 += cnt;
        if (x2 > n - 1) x2 = n - 1;
        break;
      case 3:
        x1 -= cnt;
        if (x1 < 0) x1 = 0;
        if (x2 !== n - 1) x2 -= cnt;
        break;
    }

    if (x1 > n - 1 || x2 < 0 || y1 > m - 1 || y2 < 0) return answer;
  }

  return BigInt(x2 - x1 + 1) * BigInt(y2 - y1 + 1);
}
