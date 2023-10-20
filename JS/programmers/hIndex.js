function solution(citations) {
  var answer = 0;

  let max = Math.max(...citations);
  let min = 0;

  while (min <= max) {
    const mid = parseInt((max + min) / 2);

    let up = 0;
    let down = 0;

    citations.forEach((v) => (v >= mid ? up++ : down++));

    if (up >= mid) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }

  answer = max;
  return answer;
}
