function solution(info, edges) {
  var answer = -Infinity;

  const arr = Array.from(Array(info.length), () => []);

  edges.forEach(([s, e]) => {
    arr[s].push(e);
  });

  const queue = [[0, Array(info.length).fill(false), [], 0, 0]];
  let idx = 0;

  while (queue.length > idx) {
    const [curNode, isVisited, canVisit, sheep, wolf] = queue[idx++];
    let nSheep = !info[curNode] ? sheep + 1 : sheep;
    let nWolf = info[curNode] ? wolf + 1 : wolf;

    if (nSheep <= nWolf) nSheep = 0;

    if (nSheep > answer) {
      answer = nSheep;
    }

    if (isVisited.every((v) => v)) continue;

    const nNodes = [...arr[curNode], ...canVisit];

    for (let i = 0; i < nNodes.length; i++) {
      const node = nNodes[i];

      if (info[node] && nSheep <= nWolf + 1) {
        continue;
      }

      const nIsVisited = [...isVisited];
      nIsVisited[node] = true;

      const nCanVisit = nNodes.filter((v) => v !== node);

      queue.push([node, nIsVisited, nCanVisit, nSheep, nWolf]);
    }
  }

  return answer;
}
