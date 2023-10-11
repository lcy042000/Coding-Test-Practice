function solution(A, B) {
  var answer = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => b - a);

  answer = A.reduce((sum, v, i) => (sum = sum + v * B[i]), 0);

  return answer;
}
