let cnt = 1;

function bfs(start, graph, isVisited) {
  const queue = [];

  graph[start].forEach((v, i) => {
    if (v === 1 && isVisited[i] === 0) {
      queue.push(i);
      isVisited[i] = cnt;
    }
  });

  while (queue.length) {
    const node = queue.shift();

    graph[node].forEach((v, i) => {
      if (node !== i && v === 1 && isVisited[i] === 0) {
        queue.push(i);
        isVisited[i] = cnt;
      }
    });
  }

  cnt++;
}

function solution(n, computers) {
  var answer = 0;

  const isVisited = Array(n).fill(0);

  while (isVisited.includes(0)) {
    const start = isVisited.findIndex((v) => v === 0);

    bfs(start, computers, isVisited);
  }

  answer = Math.max(...isVisited);
  return answer;
}
