function solution(points, routes) {
  var answer = 0;

  const bfs = (n1, n2) => {
    const [sx, sy] = points[n1].map((v) => v - 1);
    const [ex, ey] = points[n2].map((v) => v - 1);
    const list = [sx * 100 + sy];

    let [cx, cy] = [sx, sy];

    while (cx !== ex) {
      cx = cx < ex ? cx + 1 : cx - 1;

      list.push(cx * 100 + cy);
    }

    while (cy !== ey) {
      cy = cy < ey ? cy + 1 : cy - 1;

      list.push(cx * 100 + cy);
    }

    return list;
  };

  const timeMap = new Map();

  routes.forEach((route) => {
    let arr = [];

    for (let i = 0; i < route.length - 1; i++) {
      if (i === 0) {
        arr.push(...bfs(route[i] - 1, route[i + 1] - 1));
        continue;
      }

      arr.push(...bfs(route[i] - 1, route[i + 1] - 1).slice(1));
    }

    for (let i = 0; i < arr.length; i++) {
      const key = i + "/" + arr[i];

      if (timeMap.has(key)) {
        timeMap.set(key, timeMap.get(key) + 1);
        continue;
      }

      timeMap.set(key, 1);
    }
  });

  for (const key of timeMap.keys()) {
    if (timeMap.get(key) > 1) answer++;
  }

  return answer;
}
