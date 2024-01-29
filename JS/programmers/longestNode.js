function solution(n, edge) {
  var answer = 0;

  const graph = Array.from(Array(n + 1), () => []);
  const isVisited = Array(n + 1).fill(Infinity);

  let queue = [];

  edge.forEach((v) => {
    const [start, end] = v;

    graph[start].push(end);
    graph[end].push(start);

    if (start === 1) {
      queue.push([end, 1]);
      isVisited[end] = 1;
    }
    if (end === 1) {
      queue.push([start, 1]);
      isVisited[start] = 1;
    }
  });

  let idx = 0;

  while (queue.length) {
    const [end, value] = queue.shift();

    const nodes = graph[end];

    for (const i of nodes) {
      if (isVisited[i] <= value + 1 || i === 1) continue;

      isVisited[i] = value + 1;
      queue.push([i, value + 1]);
    }
  }

  let max = -Infinity;

  isVisited.forEach((v) => {
    if (v !== Infinity) {
      max = Math.max(max, v);
    }
  });

  answer = isVisited.filter((v) => v === max).length;

  return answer;
}
