function solution(priorities, location) {
  var answer = 0;

  const process = priorities.map((v, i) => [v, i]);
  let max = Math.max(...priorities);

  while (process.length) {
    const [processValue, index] = process.shift();

    if (processValue < max) {
      process.push([processValue, index]);
      continue;
    } else {
      answer++;

      if (index === location) break;

      max = Math.max(...process.map((v) => v[0]));
    }
  }

  return answer;
}
