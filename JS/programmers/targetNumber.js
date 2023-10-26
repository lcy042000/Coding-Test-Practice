function solution(numbers, target) {
  var answer = 0;

  const queue = [
    [numbers[0], 1],
    [-numbers[0], 1],
  ];
  let index = 0;
  while (queue.length > index) {
    const [cur, idx] = queue[index++];

    if (idx === numbers.length) {
      if (target === cur) {
        answer++;
        continue;
      } else {
        continue;
      }
    }

    queue.push([cur + numbers[idx], idx + 1]);
    queue.push([cur - numbers[idx], idx + 1]);
  }

  return answer;
}
