function solution(prices) {
  var answer = Array(prices.length);

  const stack = [[0, prices[0]]];
  let peek = 0;

  for (let i = 1; i < prices.length; i++) {
    const cur = prices[i];

    while (peek > -1 && stack[peek][1] > cur) {
      const [idx, value] = stack.pop();
      answer[idx] = i - idx;
      peek--;
    }

    stack.push([i, cur]);
    peek++;
  }

  while (stack.length) {
    const [idx, value] = stack.pop();
    answer[idx] = prices.length - 1 - idx;
  }

  return answer;
}
