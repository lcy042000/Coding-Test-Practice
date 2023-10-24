function solution(k, dungeons) {
  var answer = -1;

  const queue = [[k, Array(dungeons.length).fill(false), 0]];

  while (queue.length) {
    const [curK, isVisited, cnt] = queue.shift();

    if (curK < 0) continue;

    answer = Math.max(answer, cnt);

    isVisited.forEach((v, i) => {
      if (!v && curK >= dungeons[i][0]) {
        isVisited[i] = true;

        queue.push([curK - dungeons[i][1], [...isVisited], cnt + 1]);

        isVisited[i] = false;
      }
    });
  }

  return answer;
}
