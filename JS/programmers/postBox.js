function solution(order) {
  var answer = 0;

  const n = order.length;
  let num = 1;
  const stack = [];
  const isVisited = Array(n + 1).fill(false);

  for (let i = 0; i < order.length; i++) {
    const box = order[i];

    while (num < box) {
      if (isVisited[num]) {
        num++;
      } else {
        stack.push(num);
        isVisited[num] = true;
        num++;
      }
    }

    if (num > box) {
      if (stack.pop() !== box) break;
    }

    answer++;
    isVisited[box] = true;
  }

  return answer;
}
