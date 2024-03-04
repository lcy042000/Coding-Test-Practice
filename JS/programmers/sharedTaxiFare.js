function solution(n, s, a, b, fares) {
  var answer = Infinity;

  const graph = Array.from(Array(n), () => Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    graph[i][i] = -1;
  }

  fares.forEach((v) => {
    const [n1, n2, value] = v;

    graph[n1 - 1][n2 - 1] = value;
    graph[n2 - 1][n1 - 1] = value;
  });

  const start = s - 1;
  const [end1, end2] = [a - 1, b - 1];

  graph.forEach((row, idx) => {
    const queue = [];
    let index = 0;

    for (let i = 0; i < n; i++) {
      if (i === idx || row[i] === Infinity) continue;

      queue.push([i, row[i]]);
    }

    while (queue.length > index) {
      const [cur, value] = queue[index++];

      if (graph[idx][cur] < value) continue;

      const nextes = graph[cur];

      for (let i = idx + 1; i < n; i++) {
        if (i === idx || i === cur || value + nextes[i] >= graph[idx][i])
          continue;

        graph[idx][i] = value + nextes[i];
        graph[i][idx] = value + nextes[i];

        queue.push([i, value + nextes[i]]);
      }
    }
  });

  for (let i = 0; i < n; i++) {
    if (i === start) continue;

    let [mid, r1, r2] = [graph[start][i], graph[i][end1], graph[i][end2]];

    if (i === end1) r1 = 0;
    if (i === end2) r2 = 0;

    if (mid === Infinity || r1 === Infinity || r2 === Infinity) continue;

    answer = Math.min(answer, mid + r1 + r2);
  }

  answer = Math.min(answer, graph[start][end1] + graph[start][end2]);

  return answer;
}
