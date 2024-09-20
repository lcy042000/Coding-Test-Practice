function solution(begin, end) {
  var answer = [];

  function findNum(num) {
    if (num === 1) return 0;

    const arr = [];

    for (let i = 2; i < Math.sqrt(num) + 1; i++) {
      if (num % i === 0) {
        arr.push(i);

        if (num / i <= 1e7) return Math.round(num / i);
      }
    }

    if (arr.length) return arr[arr.length - 1];

    return 1;
  }

  for (let i = begin; i <= end; i++) {
    answer.push(findNum(i));
  }

  return answer;
}
