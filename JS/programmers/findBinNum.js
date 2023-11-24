function solution(numbers) {
  var answer = Array(numbers.length);

  const stack = [[0, numbers[0]]];
  let peek = 0;

  for (let i = 1; i < numbers.length; i++) {
    const cur = numbers[i];

    while (peek >= 0 && stack[peek][1] < cur) {
      const [idx, value] = stack.pop();
      answer[idx] = cur;
      peek--;
    }

    stack.push([i, cur]);
    peek++;
  }

  while (stack.length) {
    const [idx, value] = stack.pop();

    answer[idx] = -1;
  }

  return answer;
}
