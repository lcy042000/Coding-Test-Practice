function solution(n, lighthouse) {
  var answer = 0;

  const map = Array.from(Array(n + 1), () => []);
  const isVisited = new Set();
  const isLight = Array(n + 1).fill(false);

  for (const [a, b] of lighthouse) {
    map[a].push(b);
    map[b].push(a);
  }

  const stack = [[1, 0]];
  const postOrder = [];

  while (stack.length) {
    const [node, parent] = stack.pop();

    isVisited.add(node);
    postOrder.push([node, parent]);

    for (const next of map[node]) {
      if (isVisited.has(next)) continue;

      stack.push([next, node]);
    }
  }

  for (let idx = postOrder.length - 1; 0 <= idx; idx--) {
    const [node, parent] = postOrder[idx];

    let needLight = false;
    for (const child of map[node]) {
      if (parent !== child && !isLight[child]) {
        needLight = true;
        break;
      }
    }

    if (needLight) {
      isLight[node] = true;
      answer++;
    }
  }

  return answer;
}
