function solution(n) {
  var answer = 0;

  function isPossible(list, num) {
    const x = list.length;

    for (let i = 0; i < x; i++) {
      if (i - x === list[i] - num) return false;
      if (i - x === -(list[i] - num)) return false;
    }

    return true;
  }

  const stack = [[]];

  while (stack.length) {
    const list = stack.pop();

    if (list.length === n) {
      answer++;
      continue;
    }

    for (let i = 0; i < n; i++) {
      if (list.includes(i)) continue;

      if (!isPossible(list, i)) continue;

      stack.push([...list, i]);
    }
  }

  return answer;
}
