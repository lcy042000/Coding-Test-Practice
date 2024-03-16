function solution(n, roads, sources, destination) {
  var answer = [];

  const graph = Array.from(Array(n + 1), () => Array());

  roads.forEach((v) => {
    const [a, b] = v;

    graph[a].push([b, 1]);
    graph[b].push([a, 1]);
  });

  const isVisited = Array(n + 1).fill(Infinity);
  isVisited[destination] = 0;
  isVisited[0] = -1;

  for (const [node, value] of graph[destination]) {
    isVisited[node] = value;
  }

  const queue = graph[destination].slice();
  let idx = 0;

  while (queue.length > idx) {
    const [node, value] = queue[idx++];

    const nexts = graph[node];

    for (const [nNode, nValue] of nexts) {
      if (isVisited[nNode] <= nValue + value) continue;

      queue.push([nNode, nValue + value]);
      isVisited[nNode] = nValue + value;
    }
  }

  sources.forEach((v) => {
    const cost = isVisited[v] === Infinity ? -1 : isVisited[v];

    answer.push(cost);
  });

  return answer;
}
