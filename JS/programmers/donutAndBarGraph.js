function solution(edges) {
  var answer = Array(4).fill(0);

  const nodeInfo = edges.reduce((map, info) => {
    const [a, b] = info;

    if (!map.has(a)) {
      map.set(a, [0, 1]);
    } else {
      const [fadeIn, fadeOut] = map.get(a);

      map.set(a, [fadeIn, fadeOut + 1]);
    }

    if (!map.has(b)) {
      map.set(b, [1, 0]);
    } else {
      const [fadeIn, fadeOut] = map.get(b);

      map.set(b, [fadeIn + 1, fadeOut]);
    }

    return map;
  }, new Map());

  const nodes = nodeInfo.keys();

  for (const key of nodes) {
    const [fadeIn, fadeOut] = nodeInfo.get(key);

    if (fadeIn === 0 && fadeOut > 1) answer[0] = key;
    if (fadeOut === 0) answer[2]++;
    if (fadeIn >= 2 && fadeOut >= 2) answer[3]++;
  }

  answer[1] = nodeInfo.get(answer[0])[1] - (answer[2] + answer[3]);

  return answer;
}
