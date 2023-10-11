function solution(s) {
  var answer = true;

  const queue = s.split("");
  const stack = [];
  let i = 0;

  while (i < queue.length) {
    const v = queue[i++];

    if (v === "(") {
      stack.push(v);
    } else {
      const left = stack.pop();

      if (left !== "(") {
        answer = false;
        break;
      }
    }
  }

  if (stack.length > 0) answer = false;

  return answer;
}
