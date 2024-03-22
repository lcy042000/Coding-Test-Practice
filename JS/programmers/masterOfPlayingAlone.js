function solution(cards) {
  var answer = 0;

  const boxes = [0, ...cards];

  const queue = [];
  let idx = 0;

  for (let i = 1; i < boxes.length; i++) {
    const isVisited = Array(boxes.length).fill(false);

    isVisited[0] = true;
    isVisited[i] = true;

    const result = [[boxes[i]]];

    queue.push([isVisited, result]);
  }

  while (queue.length > idx) {
    const [isVisited, result] = queue[idx++];

    const nextIndex =
      result[result.length - 1][result[result.length - 1].length - 1];

    if (isVisited[nextIndex]) {
      if (result.length === 2) {
        answer = Math.max(answer, result[0].length * result[1].length);
      } else {
        for (let i = 1; i < boxes.length; i++) {
          if (isVisited[i]) continue;

          const newVisited = isVisited.slice();
          newVisited[i] = true;

          const newResult = result.map((v) => v.slice());
          newResult.push([boxes[i]]);

          queue.push([newVisited, newResult]);
        }
      }
    } else {
      isVisited[nextIndex] = true;
      result[result.length - 1].push(boxes[nextIndex]);
      queue.push([isVisited, result]);
    }
  }

  return answer;
}
