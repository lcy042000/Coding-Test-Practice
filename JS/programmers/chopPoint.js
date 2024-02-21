function solution(k, d) {
  var answer = 0;

  for (let i = 0; i <= d; i += k) {
    const y = parseInt(Math.sqrt(d ** 2 - i ** 2));

    answer += parseInt(y / k) + 1;
  }

  return answer;
}
