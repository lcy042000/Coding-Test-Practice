function cntIsland(array) {
  const n = array.length;
  const isVisited = Array(n).fill(0);
  let i = 0;

  while (isVisited.includes(0)) {
    i++;
    const start = isVisited.findIndex((value) => value === 0);
    const queue = [];

    for (let j = 0; j < n; j++) {
      if (!array[start][j]) continue;

      queue.push([j, true]);
    }

    isVisited[start] = i;
    let idx = 0;

    while (queue.length > idx) {
      const [index, value] = queue[idx++];

      if (isVisited[index] > 0) continue;

      isVisited[index] = i;

      const next = array[index];

      for (let j = 0; j < next.length; j++) {
        if (next[j] && isVisited[j] === 0) {
          queue.push([j, next[j]]);
        }
      }
    }
  }

  return Math.abs(
    isVisited.filter((v) => v === 1).length -
      isVisited.filter((v) => v === 2).length
  );
}

function solution(n, wires) {
  var answer = -1;

  const array = Array.from(Array(n), () => Array(n).fill(false));

  wires.forEach((v) => {
    const [a, b] = v;

    array[a - 1][b - 1] = true;
    array[b - 1][a - 1] = true;
  });

  let minIsland = Infinity;
  const isVisited = Array.from(Array(n), () => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!array[i][j] || isVisited[i][j]) continue;

      isVisited[i][j] = true;
      isVisited[j][i] = true;

      const newArray = array.map((v) => [...v]);

      newArray[i][j] = false;
      newArray[j][i] = false;

      minIsland = Math.min(minIsland, cntIsland(newArray));
    }
  }

  answer = minIsland;
  return answer;
}
