function solution(N, number) {
  var answer = -1;

  const list = Array.from(Array(9), () => new Set());

  list[1].add(N);

  for (let i = 1; i < 9; i++) {
    list[i].add(Number(String(N).repeat(i)));

    for (let j = 1; j < i; j++) {
      for (const num1 of list[j]) {
        for (const num2 of list[i - j]) {
          list[i].add(num1 + num2);
          list[i].add(num1 - num2);
          list[i].add(num1 * num2);
          list[i].add(parseInt(num1 / num2));
        }
      }
    }

    if (list[i].has(number)) {
      return i;
    }
  }

  return answer;
}
