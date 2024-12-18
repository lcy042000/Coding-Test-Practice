function solution(a, edges) {
  var answer = 0n;

  const sum = a.reduce((acc, cur) => (acc += cur), 0);

  if (sum !== 0) return -1;

  const isVisited = Array(a.length).fill(false);
  const graph = Array.from(Array(a.length), () => []);

  edges.forEach(([u, v]) => {
    graph[u].push(v);
    graph[v].push(u);
  });

  const stack = [[0, 0]];
  isVisited[0] = true;

  let idx = 0;

  while (stack.length > idx) {
    const [prev, curNode] = stack[idx++];

    for (const nextNode of graph[curNode]) {
      if (isVisited[nextNode]) continue;

      stack.push([curNode, nextNode]);
      isVisited[nextNode] = true;
    }
  }

  while (stack.length) {
    const [prev, cur] = stack.pop();
    const prevV = a[prev],
      curV = a[cur];

    answer += curV >= 0 ? BigInt(curV) : BigInt(-1 * curV);

    a[prev] += curV;
    a[cur] -= curV;
  }

  return answer;
}
