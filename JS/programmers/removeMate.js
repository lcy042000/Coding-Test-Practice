function solution(s) {
  var answer = -1;
  const queue = s.split("");
  const stack = [];
  let cur = -1;
  let queueCur = 0;

  while (queue.length !== queueCur) {
    const a = queue[queueCur++];

    if (cur > -1) {
      if (stack[cur] === a) {
        stack.pop();
        cur--;
      } else {
        stack.push(a);
        cur++;
      }
    } else {
      stack.push(a);
      cur++;
    }
  }

  answer = stack.length > 0 ? 0 : 1;
  return answer;
}
